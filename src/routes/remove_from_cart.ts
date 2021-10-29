import express from 'express';
import { findProduct } from '../services/Product';
import { findCustomer } from '../services/Customer';
import { findProductList, removeProductFromProductList } from '../services/ProductList';
import { validateSchema } from '../middlewares/validateSchema';
import { removeFromCartSchema } from '../validations/removeFromCartSchema';
import { errorHandler } from './controllers/Error';

const router = express.Router();

router.post('/api/cart/remove/', validateSchema(removeFromCartSchema), errorHandler(async (req, res, next) => {

    // With the request body parameters: attempt to remove a product from the customer's ProductList (cart).

    const { customerId, productId, quantity } = req.body;

    // Verify product, customer and ProductList (cart) are all existing in the database.
    let product = await findProduct(productId);
    let customer = await findCustomer(customerId);
    let cart = await findProductList(customerId);

    if (!cart || !product) {
        // cart does not exist
    } else {

        let updatedCart = await removeProductFromProductList(cart, product, quantity);

        if (updatedCart) {
            return res.status(200).json({ msg: 'Product(s) removed from cart.', cart });
        }
        else {
            return res.status(404).json({ msg: 'Product does not exist in cart.', cart });
        }
    }
}))

export { router as removeFromCartRouter }