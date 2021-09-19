import express from 'express';
import { ProductList } from '../entities/ProductList'
import { Customer } from '../entities/Customer';
import { Product } from '../entities/Product';
import { ProductListProduct } from "../entities/ProductListProduct";
import { ProductListUtility } from '../entities/module/ProductListUtility';

const router = express.Router();

router.post('/api/cart/remove/', async (req, res) => {

    // With the request body parameters: attempt to remove a product from the customer's ProductList (cart).

    const { customerId, productId } = req.body;
    var { quantity } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!customerId || !productId) {
            return res.json({ msg: "Valid parameters not provided." });
        }

        else {

            // Quantity is an optional parameter, so default it's value to 1 if one is not provided.
            if (!quantity) {
                quantity = 1;
            }

            // Verify product, customer and ProductList (cart) are all existing in the database.
            const product = await Product.findOne(parseInt(productId));
            const customer = await Customer.findOne(parseInt(customerId));
            const cart = await ProductList.createQueryBuilder("ProductList")
                .where("ProductList.customerId = :customerId", { customerId: customerId })
                .andWhere("ProductList.type = :type", { type: "cart" })
                .getOne();

            if (!cart) {
                return res.json({
                    msg: "Cart not found."
                })
            }

            else if (!product) {
                return res.json({
                    msg: "Product not found."
                })
            }

            else if (!customer) {
                return res.json({
                    msg: "Customer not found."
                })
            }

            else if (customer.active === false) {
                return res.json({
                    msg: "Customer is inactive."
                })
            }

            else {

                // Find ProductListProduct - product in ProductList (cart).
                const cartProduct = await ProductListProduct.findOne({
                    where: { productList: cart, product: product },
                    relations: ['product'],
                })

                if (!cartProduct) {
                    return res.json('Product does not exist in cart.');
                }

                else {

                    // If the quantity of existing product in ProductList (cart) is 1 or if it is equal to the argument quantity, then remove the entry from ProductList (cart).
                    if (cartProduct.quantity === 1 || cartProduct.quantity <= quantity) {
                        cartProduct.remove();
                        cart.total = Number(await ProductListUtility.totalPrices(cart))
                        await ProductList.save(cart);
                        return res.json('product(s) removed from cart');
                    }


                    // If the quantity of existing product in ProductList (cart) is larger than one, subtract from the quantity.
                    else {

                        cartProduct.quantity = Number(cartProduct.quantity) - Number(quantity);
                        await ProductListProduct.save(cartProduct);
                        cart.total = Number(await ProductListUtility.totalPrices(cart))
                        await ProductList.save(cart);

                        return res.json('product(s) removed from cart');
                    }
                }
            }

        }
    }
    // Catch any other errors and return it to the frontend.
    catch (error) {
        console.error(error)
        return res.json({ msg: 'Problem encountered while getting products: ', error });
    }
});

export {
    router as removeFromCartRouter
}