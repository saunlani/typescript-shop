import express from 'express';
import { updateCustomer } from '../services/Customer';
import { errorHandler } from './controllers/Error';
import { validateSchema } from '../middlewares/validateSchema';
import { updateCustomerSchema } from '../validations/updateCustomerSchema';

const router = express.Router();

router.put('/api/customer/update', validateSchema(updateCustomerSchema), errorHandler(async (req, res, next) => {

    const { customerId, active, firstName, lastName, email, cardNumber } = req.body;

    const customer = await updateCustomer(customerId,active,firstName,lastName, email, cardNumber);

    return res.status(200).json({ msg: "Customer updated", customer });

}));

export { router as updateCustomerRouter }