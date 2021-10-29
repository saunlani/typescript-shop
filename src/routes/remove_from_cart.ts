import express from 'express';
import { ProductService } from '../services/ProductService';
import { CustomerService } from '../services/CustomerService';
import { ProductListService } from '../services/ProductListService';
import { validateSchema } from '../middlewares/validateSchema';
import { removeFromCartSchema } from '../validations/removeFromCartSchema';
import { Controller } from './controllers/Controller';

const router = express.Router();

router.post('/api/cart/remove/', validateSchema(removeFromCartSchema), Controller.errorHandler(async (req, res, next) => {

    // With the request body parameters: attempt to remove a product from the customer's ProductList (cart).

    const { customerId, productId, quantity } = req.body;

    // Verify product, customer and ProductList (cart) are all existing in the database.
    let product = await new ProductService().findProduct(productId);
    let customer = await new CustomerService().findCustomer(customerId);
    let cart = await new ProductListService().findProductList(customerId);

    if (!cart) {
        // cart does not exist
    } else {

        let updatedCart = await new ProductListService().removeProductFromProductList(cart, product, quantity);

        if (updatedCart) {
            return res.status(200).json({ msg: 'Product(s) removed from cart.', cart });
        }
        else {
            return res.status(404).json({ msg: 'Product does not exist in cart.', cart });
        }
    }
}))

export { router as removeFromCartRouter }