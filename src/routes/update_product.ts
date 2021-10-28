import express from 'express';
import { Product } from '../entities/Product'

const router = express.Router();

router.put('/api/product/update', async (req, res) => {

    // With the request body parameters: attempt to find and update a product.
    const { productId, title, description, photo, price } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!productId) {
            return res.status(400).json({ msg: "All valid parameters not provided." });
        }
        else {

            const product = await Product.findOne(parseInt(productId));

            // This variable will be updated to true if an update has been made to the product
            // It's used to provide feedback to the frontend.
            var updateMade: boolean = false;

            // If product does not exist, notify the frontend.
            if (!product) {
                return res.status(404).json({ msg: "Product does not exist." })
            }

            // Product exists
            else {

                // Iterate through req.body and search for a matching key which is common in both req.body and product: i.e. "title"
                // For all matches: update the product, save the update and finally provide feedback to frontend.

                for (const key of Object.keys(req.body)) {

                    if (key in product) {

                        // console.log('key', key);
                        // console.log('value', req.body[key])

                        if (key === 'title') {
                            product.title = req.body[key];
                            updateMade = true;
                        }
                        if (key === 'description') {
                            product.description = req.body[key];
                            updateMade = true;
                        }
                        if (key === 'photo') {
                            product.photo = req.body[key];
                            updateMade = true;
                        }
                        if (key === 'price') {
                            product.price = req.body[key];
                            updateMade = true;
                        }
                    }
                }
                // Either way, provide feedback to frontend.
                if (updateMade) {
                    await product.save();
                    return res.status(200).json({ msg: "Product updated.", product });
                }
                else {
                    return res.status(404).json({ msg: "Product not updated.", product });
                }

            }
        }
    }

    // Catch any errors and return it to the frontend.
    catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Problem encountered while updating product: ', error });

    }
});

export {
    router as updateProductRouter
}