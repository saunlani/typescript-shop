import express from 'express';
import { Customer } from '../entities/Customer'

const router = express.Router();

router.put('/api/customer/update', async (req, res) => {

    // With the request body parameters: attempt to find and update a customer.
    const { customerId, firstName, lastName, email, cardNumber } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!customerId) {
            return res.status(400).json({ msg: "All valid parameters not provided." });
        }
        else {

            const customer = await Customer.findOne(parseInt(customerId));

            // This variable will be updated to true if an update has been made to the customer
            // It's used to provide feedback to the frontend.
            var updateMade: boolean = false;

            // If customer does not exist, notify the frontend.
            if (!customer) {
                return res.status(404).json({ msg: "Customer does not exist." })
            }

            // Customer exists
            else {

                // Email is a unique field, so attempt to find an existing customer with the req.body's email.
                const existingCustomer = await Customer.createQueryBuilder("Customer")
                    .where("Customer.email = :email", { email: email })
                    .getOne();

                // If an email is found, try to match it based on ID's.
                // If a match is not found, inform the frotnend that the email is already being used by another customer.
                if (existingCustomer && existingCustomer?.id !== customer.id) {
                    return res.status(404).json({ msg: "Customer not updated: A customer with this email already exists.", customer });
                }

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
                        return res.status(200).json({ msg: "Customer updated", customer });
                    }
                    else {
                        return res.status(404).json({ msg: "Customer not updated", customer });
                    }

                }
            }
        }
    }

    // Catch any errors and return it to the frontend.
    catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Problem encountered while updating customer: ', error });

    }
});

export {
    router as updateCustomerRouter
}