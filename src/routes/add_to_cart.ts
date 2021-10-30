import express from 'express';
import { findProductById } from  '../services/Product';
import { findCustomer } from '../services/Customer';
import { findProductList, addToCart } from '../services/ProductList';
import { validateSchema } from '../middlewares/validateSchema';
import { addToCartSchema } from '../validations/addToCartSchema';
import { errorHandler } from './controllers/Error';

const router = express.Router();

router.post('/api/cart/add/', validateSchema(addToCartSchema), errorHandler(async (req, res, next) => {

    const { customerId, productId, quantity } = req.body;

    let customer = await findCustomer(customerId);
    let product = await findProductById(productId);
    let cart = await findProductList(customer.id, 'cart');

    await addToCart(cart, product, quantity);

    return res.status(201).json({ msg: "Successfully added product(s) to cart: ", cart });
}))

export { router as addToCartRouter }