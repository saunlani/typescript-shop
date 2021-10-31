import express from 'express';
import { findProductById } from '../services/Product';
import { findCustomer } from '../services/Customer';
import { findCart, removeProductFromCart } from '../services/ProductList';
import { validateSchema } from '../middlewares/validateSchema';
import { removeFromCartSchema } from '../validations/removeFromCartSchema';
import { errorHandler } from './controllers/Error';

const router = express.Router();

router.post('/api/cart/remove/', validateSchema(removeFromCartSchema), errorHandler(async (req, res, next) => {
    
    const { customerId, productId, quantity } = req.body;

    let product = await findProductById(productId);
    let customer = await findCustomer(customerId);
    let cart = await findCart(customer.id);

    let updatedCart = await removeProductFromCart(cart, product, quantity);

    if (updatedCart) {
        return res.status(200).json({ msg: 'Product(s) removed from cart.', cart });
    }
    else {
        return res.status(404).json({ msg: 'Product does not exist in cart.', cart });
        
    }
}))

export { router as removeFromCartRouter }