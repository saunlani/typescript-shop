import express from 'express';
import { ProductService } from '../services/ProductService';
import { CustomerService } from '../services/CustomerService';
import { ProductListService } from '../services/ProductListService';
import { validateSchema } from '../middlewares/validateSchema';
import { addToCartSchema } from '../validations/addToCartSchema';
import { Controller } from './controllers/Controller';

const router = express.Router();

router.post('/api/cart/add/', validateSchema(addToCartSchema), Controller.errorHandler(async (req, res, next) => {

    // With the request body parameters: attempt to find a valid product, customer and ProductList (cart).
    // If one does not exist, return a message to the frontend.

    const { customerId, productId, quantity } = req.body;

    const productService = new ProductService();
    const customerService = new CustomerService();
    const productListService = new ProductListService();

    const product = await productService.findProduct(productId);
    const customer = await customerService.findCustomer(customerId);
    const cart = await productListService.findProductList(customerId);

    if (!cart) {
        // handle undefined case, possibly throw an error
    } else {
        await productListService.addToProductList(cart, product, quantity);
    }
    return res.status(201).json({ msg: "Successfully added product(s) to cart: ", cart });
    
}))

export {
    router as addToCartRouter
}