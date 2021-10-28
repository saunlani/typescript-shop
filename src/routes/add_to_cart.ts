import express from 'express';
import { ProductListProduct } from "../entities/ProductListProduct";
import { ProductList } from '../entities/ProductList'
import { Product } from '../entities/Product';
import { Customer } from '../entities/Customer';
import { ProductListUtility } from '../entities/module/ProductListUtility';
import { ProductService } from '../services/ProductService';
import { CustomerService } from '../services/CustomerService';
import { ProductListService } from '../services/ProductListService';

let product: Product;
let cart: any;
let customer: Customer;
let cartProduct: ProductListProduct | undefined;

const router = express.Router();


router.post('/api/cart/add/', async (req, res) => {

    // With the request body parameters: attempt to find a valid product, customer and ProductList (cart).
    // If one does not exist, return a message to the frontend.
    const { customerId, productId, quantity } = req.body;

    try {

        // Verify all required parameters are received.
        if (!customerId || !productId || !quantity) {
            return res.status(400).json({ msg: "All required parameters not provided." });
        }

        else if (quantity < 1) {
            return res.status(400).json({ msg: "A quantity larger than 0 must be provided." });
        }

        else {

            product = await new ProductService().findProduct(productId);
            customer = await new CustomerService().findCustomer(customerId);
            cart = await new ProductListService().findProductList(customerId);

            // We want to always update an existing quantity (if one exist) for a product in the product list, instead of creating duplicate entries.

            // First look for an existing product entry with an existing quantity in cart (ProductList).
            cartProduct = await new ProductListService().findProductListProduct(cart, product);

            // If product exists in cart already, just add to the existing quantity.
            if (cartProduct) {

                cartProduct.quantity = Number(cartProduct.quantity) + Number(quantity);
                await ProductListProduct.save(cartProduct);

                if (cart) {

                    // Generate a total cart price with the ProductListUtility module.
                    cart.total = Number(await ProductListUtility.totalPrices(cart))

                    // Update the ProductList (cart).
                    await ProductList.save(cart);
                    return res.status(201).json({ msg: 'Successfully added product(s) to cart.', cart });
                }


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

            return res.status(404).json({ msg: 'No update made to cart.' });
        }

    }


    // Catch any errors and return it to the frontend.
    catch (error) {

        let msg: string[] = [];

        if (!customer) {
            msg.push("Customer does not exist.");
        }

        if (!product) {
            msg.push("Product does not exist.");
        }

        if (!cart) {
            msg.push("Cart does not exist for this customer.");
        }

        if (customer && customer.active === false) {
            msg.push("Customer is inactive.");
        }

        if (msg.length > 0) {
            return res.status(404).json({ msg: msg })
        }

        else {
            return res.status(500).json({ msg: 'Problem encountered while adding to cart', error });
        }

    }
});

export {
    router as addToCartRouter
}
