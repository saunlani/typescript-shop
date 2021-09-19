import express from 'express';
import { ProductList } from '../entities/ProductList'
import { Customer } from '../entities/Customer';

const router = express.Router();

router.post('/api/cart/', async (req, res) => {

    // With the request body parameter of customerId: attempt to find a valid customer.
    // This customerId is subsequently used to identify an existing ProductList (cart).
    // If an existing ProductList (cart) does not exist, we will create one.
    const { customerId } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!customerId) {
            return res.json({ msg: "Valid parameters not provided." });
        }
        else {

            // Check for existing customer.
            const customer = await Customer.findOne(parseInt(customerId));

            // Check for existing ProductList (cart).
            const existingCart = await ProductList.createQueryBuilder("ProductList")
                .where("ProductList.customerId = :customerId", { customerId: customerId })
                .andWhere("ProductList.type = :type", { type: "cart" })
                .getOne();

            // If customer does not exist, notify frontend.
            if (!customer) {
                return res.json({
                    msg: "Customer not found."
                })
            }

            else if (customer.active === false) {
                return res.json({
                    msg: "Customer is inactive."
                })
            }
            
            // If ProductList (cart) exists, notify frontend.
            else if (existingCart) {
                return res.json({
                    msg: "Cart already exists for this customer."
                })
            }

            // Create ProductList (cart) for this customer.
            else if (!existingCart) {
                const cart = ProductList.create({

                    productListProduct: [],
                    type: 'cart',
                    customer: customer,
                    cardNumber: ''
                });

                await cart.save();

                return res.json({ msg: "Cart successfully created.", cart })
            }

            // If error occurs.
            else {
                return res.json({
                    msg: "Error occurred."
                })
            }
        }
    }

    // Catch any other errors and return it to the frontend.
    catch (error) {
        return res.json({ msg: 'Problem encountered while creating cart: ', error });
    }

});

export {
    router as createCartRouter
}