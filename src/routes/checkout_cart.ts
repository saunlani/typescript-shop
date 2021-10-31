import express from 'express';
import { validateSchema } from '../middlewares/validateSchema';
import { checkoutCartSchema } from '../validations/checkoutCartSchema';
import { errorHandler } from './controllers/Error';
import { createOrder } from '../services/ProductList';

const router = express.Router();

router.post('/api/cart/checkout/', validateSchema(checkoutCartSchema), errorHandler(async (req, res, next) => {

    const { customerId } = req.body;
    const cart = await createOrder(customerId);
    return res.status(200).json({ msg: 'Successfully processed order.', cart });

}));

export { router as checkoutCartRouter }