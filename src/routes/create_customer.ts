import express from 'express';
import { Customer } from '../entities/Customer'
import { validateSchema } from '../middlewares/validateSchema';
import { createCustomerSchema } from '../validations/createCustomerSchema';
import { errorHandler } from './controllers/Error';
import { createCustomer } from '../services/Customer';

const router = express.Router();

router.post('/api/customer', validateSchema(createCustomerSchema), errorHandler(async (req, res, next) => {

    const { firstName, lastName, email, cardNumber } = req.body;
    const customer = await createCustomer(firstName, lastName, email, cardNumber)
    return res.status(201).json({ msg: "Customer created successfully.", customer });

}))

export { router as createCustomerRouter }