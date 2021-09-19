import express from 'express';
import { ProductList } from '../entities/ProductList'
import { Customer } from '../entities/Customer';

const router = express.Router();

router.post('/api/cart/checkout/', async (req, res) => {

    // With the request body parameter of customerId: attempt to find a valid customer.
    // This customerId is subsequently used to identify an existing ProductList (cart) for the checkout process.
    const { customerId } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!customerId) {
            return res.json({ msg: "Valid parameters not provided." });
        }
        else {

            const customer = await Customer.findOne(parseInt(customerId));

            // If customer doesn't exist, notify frontend.
            if (!customer){

                return res.json({
                    msg: "Customer does not exist."
                })
            }

            else if (customer.active === false) {
                return res.json({
                    msg: "Customer is inactive."
                })
            }

            // Verify ProductList (cart) exists for customer.
            const cart = await ProductList.createQueryBuilder("ProductList")
                .where("ProductList.customerId = :customerId", { customerId: customer.id })
                .andWhere("ProductList.type = :type", { type: "cart" })
                .getOne();

            // If ProductList (cart) doesn't exist, notify frontend.
            if (!cart) {

                return res.json({
                    msg: "Cart for this customer not found."
                })
            }

            else if (cart.total === null || Number(cart.total) === 0) {
                return res.json({
                    msg: "Cart is empty for this customer."
                })
            }

            // At this point, the customer and ProductList (cart) must both exist.
            // Let's assign the ProductList (cart) a cardNumber.
            // Then we will change the ProductList's type from "cart" to "order".
            // This ProductList will now no longer exist as a cart, but rather as an order.

            else {
                // Use current cardNumber on file.
                cart.cardNumber = customer.cardNumber;


                // Change ProductList.type to "order".
                cart.type = 'order';

                // Save the ProductList.
                await ProductList.save(cart);

                return res.json({ msg: 'Successfully processed order.', cart });
            }

        }
    }

    // Catch any other errors and return it to the frontend.
    catch (error) {
        return res.json({ msg: 'Problem encountered while checking out cart:', error });
    }
});

export {
    router as checkoutCartRouter
}