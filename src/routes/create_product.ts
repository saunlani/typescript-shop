import express from 'express';
import { Product } from "../entities/Product"
import { validateSchema } from '../middlewares/validateSchema';
import { productSchema } from '../validations/productSchema';

const router = express.Router();

router.post("/api/product", validateSchema(productSchema), async (req, res) => {

    // With the request body parameters: attempt to create a new product.
    const { title, description, photo, price } = req.body;

    try {
            const product = Product.create({ title, description, photo, price });
            await product.save();
            return res.status(201).json({ msg: "Product successfully created: ", product });
        }

    // Catch any other errors and return it to the frontend.

     catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Problem encountered while creating product: ', error });
    }
})

export { router as createProductRouter };