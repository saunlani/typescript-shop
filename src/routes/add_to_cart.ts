import express from 'express';
import { findProduct } from  '../services/Product';
import { findCustomer } from '../services/Customer';
import { findProductList, addToProductList } from '../services/ProductList';
import { validateSchema } from '../middlewares/validateSchema';
import { addToCartSchema } from '../validations/addToCartSchema';
import { errorHandler } from './controllers/Error';

const router = express.Router();

router.post('/api/cart/add/', validateSchema(addToCartSchema), errorHandler(async (req, res, next) => {

    // With the request body parameters: attempt to find a valid product, customer and ProductList (cart).
    // If one does not exist, return a message to the frontend.

    const { customerId, productId, quantity } = req.body;

    const product = await findProduct(productId);
    const customer = await findCustomer(customerId);
    const cart = await findProductList(customerId);

    if (!cart || !product || !cart) {
        throw Error('Resource not available')
        // handle undefined case, possibly throw an error
    } else {
        await addToProductList(cart, product, quantity);
    }
    return res.status(201).json({ msg: "Successfully added product(s) to cart: ", cart });

}))

export {
    router as addToCartRouter
}