import express from 'express';
import { Customer } from "../entities/Customer";

const router = express.Router();

router.get('/api/customers', async (req, res) => {

    // Find and return all existing customers.
    try {

        const customers = await Customer.createQueryBuilder()
            .select('customer')
            .from(Customer, 'customer')
            .getMany()

        return res.json(customers)
    }

    // Catch any other errors and return it to the frontend.
    catch (error) {
        console.error(error)
        return res.json({ msg: 'Problem encountered while getting customers:', error });
    }
})

export { router as getCustomersRouter };
