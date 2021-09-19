import e from 'express';
import express from 'express';
import { Product } from "../entities/Product"

const router = express.Router();

router.post("/api/product", async (req, res) => {

    // With the request body parameters: attempt to create a new product.
    const { title, description, photo, price } = req.body;

    try {

        if (!title || !description || !photo || !price) {
            return res.json({ msg: "All valid parameters not provided" });
        }

        else {

            const product = Product.create({ title, description, photo, price });

            await product.save();
            return res.json({ msg: "Product successfully created: ", product });
        }

    // Catch any other errors and return it to the frontend.

    } catch (error) {
        console.error(error)
        return res.json({ msg: 'Problem encountered while creating product: ', error });
    }
})

export { router as createProductRouter };