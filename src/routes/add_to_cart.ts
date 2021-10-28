import express from 'express';
import { ProductListProduct } from "../entities/ProductListProduct";
import { ProductList } from '../entities/ProductList'
import { Product } from '../entities/Product';
import { Customer } from '../entities/Customer';
import { ProductListUtility } from '../entities/module/ProductListUtility';

const router = express.Router();

router.post('/api/cart/add/', async (req, res) => {

    // With the request body parameters: attempt to find a valid product, customer and ProductList (cart).
    // If one does not exist, return a message to the frontend.
    const { customerId, productId, quantity } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!customerId) {
            return res.status(400).json({ msg: "Valid parameters not provided." });
        }

        else {
            const product = await Product.findOne(parseInt(productId));
            const customer = await Customer.findOne(parseInt(customerId));
            const cart = await ProductList.createQueryBuilder("ProductList")
                .where("ProductList.customerId = :customerId", { customerId: customerId })
                .andWhere("ProductList.type = :type", { type: "cart" })
                .getOne();

            if (!cart) {
                return res.status(404).json({ msg: "Cart does not exist for this customer." })
            }

            else if (!product) {
                return res.status(404).json({ msg: "Product does not exist." })
            }

            else if (!customer) {
                return res.status(404).json({ msg: "Customer does not exist." })
            }

            else if (customer.active === false) {
                return res.status(404).json({ msg: "Customer is inactive." })
            }

            else {

                // We want to always update an existing quantity (if one exist) for a product in the product list, instead of creating duplicate entries.

                // First look for an existing product entry with an existing quantity in cart (ProductList).
                const cartProduct = await ProductListProduct.findOne({
                    where: { productList: cart, product: product },
                    relations: ['product'],
                })

                // If product exists in cart already, just add to the existing quantity.
                if (cartProduct) {

                    cartProduct.quantity = Number(cartProduct.quantity) + Number(quantity);
                    await ProductListProduct.save(cartProduct);

                    // Generate a total cart price with the ProductListUtility module.
                    cart.total = Number(await ProductListUtility.totalPrices(cart))

                    // Update the ProductList (cart).
                    await ProductList.save(cart);
                    return res.status(201).json({ msg: 'Successfully added product(s) to cart.', cart });

                }

                // ProductList (cart) must not currently contain this product, so create a ProductListProduct (cart item), give it a quantity,
                // save it to the ProductList (cart), then update the total for the ProductList and save it.
                else {

                    await ProductListProduct.create({ productList: cart, product: product, quantity: quantity, unitPrice: product.price }).save();

                    // Generate a total cart price with the ProductListUtility module.
                    cart.total = Number(await ProductListUtility.totalPrices(cart))

                    // Save the updated ProductList (cart).
                    await ProductList.save(cart);

                    // Verify ProductList (cart) has updated and return it to the frontend.
                    const updatedCart = await ProductList.findOne(cart.id, { relations: ["productListProduct"] });
                    return res.status(201).json({ msg: 'Successfully added product(s) to cart: ', updatedCart });
                }
            }
        }
    }

    // Catch any other errors and return it to the frontend.
    catch (error) {
        return res.status(500).json({ msg: 'Problem encountered while adding to cart:', error });
    }
});

export {
    router as addToCartRouter
}
