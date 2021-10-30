import express from 'express';
import { getCustomers } from '../services/Customer';
import { errorHandler } from './controllers/Error';

const router = express.Router();

router.get('/api/customers', errorHandler(async (req, res, next) => {
        
        const customers = await getCustomers()
        return res.status(200).json(customers)

}))

export { router as getCustomersRouter };
