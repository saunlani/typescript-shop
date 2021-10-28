import express from 'express';
import { ProductListProduct } from "../entities/ProductListProduct";
import { ProductList } from "../entities/ProductList";
import { Customer } from '../entities/Customer';

const router = express.Router();

router.post('/api/cart/get', async (req, res) => {

    // With the request body parameter of customerId: attempt to get an existing ProductList (cart) for this customer.
    const { customerId } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!customerId) {
            return res.status(400).json({ msg: "Valid parameters not provided." });
        }


        else {

            const customer = await Customer.findOne(parseInt(customerId));

            if (!customer) {
                return res.status(404).json({ msg: 'This customer does not exist.' });
            }

            else if (customer.active === false) {
                return res.status(404).json({ msg: "Customer is inactive." })
            }

            else {

                const cart = await ProductList.createQueryBuilder("ProductList")
                    .where("ProductList.customerId = :customerId", { customerId: customerId })
                    .andWhere("ProductList.type = :type", { type: "cart" })
                    .getOne();

                // If ProductList (cart) doesn't exist, notify the frontend.
                if (!cart) {
                    return res.status(404).json({ msg: 'A cart does not exist for this customer.' });
                }

                // Existing ProductList (cart) must exist, so return it to frontend.
                else {

                    const cartProducts = await ProductListProduct.find({ where: { productList: cart } })
                    return res.status(200).json({ cart, cartProducts });
                }

            }
        }

    }
    // Catch any other errors and return it to the frontend.
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: 'Problem encountered while getting cart:', e });
    }

});

export {
    router as getCartRouter
}