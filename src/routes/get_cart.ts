import express from 'express';
import { validateSchema } from '../middlewares/validateSchema';
import { getCartSchema } from '../validations/getCartSchema';
import { errorHandler } from './controllers/Error';
import { findCart, getCartItems } from '../services/ProductList';

const router = express.Router();

router.post('/api/cart/get', validateSchema(getCartSchema), errorHandler(async (req, res, next) => {

    const { customerId } = req.body;
    const cart = await findCart(customerId);
        const cartItems = await getCartItems(cart)
        return res.status(200).json({ cart, cartItems });
    
}))

export { router as getCartRouter }