import express from 'express';
import { Product } from "../entities/Product";

const router = express.Router();

router.get('/api/products/title/', async (req, res) => {

    // With the request body parameter productTitle: attempt to get all matching products.
    const { productTitle } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!productTitle) {
            return res.status(400).json({ msg: "Valid parameters not provided." });
        }

        else {

            const products = await Product.createQueryBuilder()
                .select('product')
                .from(Product, 'product')
                .where('LOWER(product.title) like LOWER(:productTitle)', { productTitle: `%${productTitle}%` })
                .getMany();

            // If no matching products are found, notify frontend.
            if (products.length === 0) {
                return res.status(404).json({ msg: 'No products exist with this title.' });
            }

            // Otherwise return all matching products.
            else {
                return res.status(200).json(products);
            }

        }
    }
    // Catch any other errors and return it to the frontend.
    catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Problem encountered while getting products: ', error });
    }
})

export { router as getProductWithTitleRouter };
