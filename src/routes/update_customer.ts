import express from 'express';
import { Customer } from '../entities/Customer'

const router = express.Router();

router.put('/api/customer/update', async (req, res) => {

    // With the request body parameters: attempt to find and update a customer.
    const { customerId, firstName, lastName, email, cardNumber } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!customerId) {
            return res.json({ msg: "All valid parameters not provided." });
        }
        else {

            const customer = await Customer.findOne(parseInt(customerId));

            // This variable will be updated to true if an update has been made to the customer
            // It's used to provide feedback to the frontend.
            var updateMade: boolean = false;

            // If customer does not exist, notify the frontend.
            if (!customer) {
                return res.json({
                    msg: "Customer does not exist."
                })
            }

            // Customer exists
            else {

                // Iterate through req.body and search for a matching key which is common in both req.body and customer: i.e. "firstName"
                // For all matches: update the customer, save the update and finally provide feedback to frontend.

                for (const key of Object.keys(req.body)) {

                    if (key in customer) {

                        if (key === 'firstName') {
                            customer.firstName = req.body[key];
                            updateMade = true;
                        }
                        if (key === 'lastName') {
                            customer.lastName = req.body[key];
                            updateMade = true;
                        }
                        if (key === 'email') {
                            customer.email = req.body[key];
                            updateMade = true;
                        }
                        if (key === 'cardNumber') {
                            customer.cardNumber = req.body[key];
                            updateMade = true;
                        }
                        if (key === 'active') {
                            customer.active = req.body[key];
                            updateMade = true;
                        }
                    }
                }
                // Either way, provide feedback to frontend.
                if (updateMade) {
                    await customer.save();
                    return res.json({ msg: "Customer updated", customer });
                }
                else {
                    return res.json({ msg: "Customer not updated", customer });
                }

            }
        }
    }

    // Catch any errors and return it to the frontend.
    catch (error) {
        console.error(error)
        return res.json({ msg: 'Problem encountered while updating customer: ', error });

    }
});

export {
    router as updateCustomerRouter
}