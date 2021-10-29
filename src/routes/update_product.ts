import express from 'express';
import { Product } from '../entities/Product'
import { ProductService } from '../services/ProductService';
import { ProductListService } from '../services/ProductListService';
import { validateSchema } from '../middlewares/validateSchema';
import { updateProductSchema } from '../validations/updateProductSchema';
import { Controller } from './controllers/Controller';

const router = express.Router();

router.put('/api/product/update', validateSchema(updateProductSchema), Controller.errorHandler(async (req, res, next) => {

    const productService = new ProductService();

    // With the request body parameters: attempt to find and update a product.
    const { productId, title, description, photo, price } = req.body;

    const product = await productService.updateProduct(productId, title, description, photo, price);

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