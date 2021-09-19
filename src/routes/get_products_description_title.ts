import express from 'express';
import { Product } from "../entities/Product";

const router = express.Router();

router.get('/api/products/description_title/', async (req, res) => {

    // With the request body parameters productDescription and productTitle: attempt to get all matching products.
    const { productDescription, productTitle } = req.body;

    try {

        // Verify all valid parameters are received.
        if (!productDescription || !productTitle) {
            return res.json({ msg: "Valid parameters not provided." });
        }

        else {


            const products = await Product.createQueryBuilder()
                .select('product')
                .from(Product, 'product')
                .where('LOWER(product.description) like LOWER(:productDescription) AND LOWER(product.title) like LOWER(:productTitle)', { productDescription: `%${productDescription}%`, productTitle: `%${productTitle}%` })
                .getMany();

            // If no matching products are found, notify frontend.
            if (products.length === 0) {
                return res.json({ msg: 'No products exist with this description and title.' });
            }

            // Otherwise return all matching products.
            else {
                return res.json(products);
            }
        }
    }
    // Catch any other errors and return it to the frontend.
    catch (error) {
        console.error(error)
        return res.json({ msg: 'Problem encountered while getting products: ', error });
    }

})

export { router as getProductWithDescriptionAndTitleRouter };
