import express from 'express';
import { Customer } from '../entities/Customer'

const router = express.Router();

router.post('/api/customer', async (req, res) => {

    // With the request body parameters: attempt to create a new customer.
    const { firstName, lastName, email, cardNumber } = req.body;

    try {

        // Verify all valid parameters are received.

        if (!firstName || !lastName || !email || !cardNumber) {
            return res.status(400).json({ msg: "All valid parameters not provided" });
        }

        else {


            const customer = Customer.create({ firstName: firstName, lastName: lastName, email, cardNumber, });
            await customer.save();

            return res.status(201).json({ msg: "Customer created successfully.", customer });
        }
    }

    // Catch any errors and return it to the frontend.
    catch (error:any) {


        // In the event the customer already exists, notify the frontend.
        if (error.toString().includes('duplicate key value violates unique constraint')) {
            return res.status(404).json({ msg: "Customer already exists." })
        }

        // Catch any other errors and return it to the frontend.
        else {
            console.error(error)
            return res.status(500).json({ msg: 'Problem encountered while creating customer: ', error });
        }
    }
});

export {
    router as createCustomerRouter
}