import express from 'express';
import { Product } from "../entities/Product";

const router = express.Router();

router.get('/api/products', async (req, res) => {

    try {
        const products = await Product.createQueryBuilder()
            .select('product')
            .from(Product, 'product')
            .getMany();

        // If no matching products are found, notify frontend.
        if (products.length === 0) {
            return res.json({ msg: 'No products exist with this title.' });
        }

        // Otherwise return all matching products.
        else {
            return res.json(products);
        }

    }
    // Catch any other errors and return it to the frontend.
    catch (error) {
        console.error(error)
        return res.json({ msg: 'Problem encountered while getting products: ', error });
    }

})

export { router as getProductsRouter };
