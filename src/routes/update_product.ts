import express from 'express';
import { updateProduct } from '../services/Product';
import { validateSchema } from '../middlewares/validateSchema';
import { updateProductSchema } from '../validations/updateProductSchema';
import { errorHandler } from './controllers/Error';

const router = express.Router();

router.put('/api/product/update', validateSchema(updateProductSchema), errorHandler(async (req, res, next) => {

    // With the request body parameters: attempt to find and update a product.
    const { productId, title, description, photo, price } = req.body;

    const product = await updateProduct(productId, title, description, photo, price);

    // If product does not exist, notify the frontend.
    if (!product) {
        return res.status(404).json({ msg: "Product does not exist." })
    }

    // Product exists
    else {
        return res.status(200).json({ msg: "Update processed.", product });
    }
}))

export {
    router as updateProductRouter
}