import express from 'express';
import { Product } from "../entities/Product";
import { getProductsWithDescription } from '../services/Product';
import { errorHandler } from './controllers/Error';
import { validateSchema } from '../middlewares/validateSchema';
import { getProductsWithDescriptionSchema } from '../validations/getProductsWithDescriptionSchema';

const router = express.Router();

router.get('/api/products/description/', validateSchema(getProductsWithDescriptionSchema), errorHandler(async (req, res, next) => {

    const { descriptipn } = req.body;

    let product = await getProductsWithDescription(descriptipn);
    return res.status(200).json(product);
}))

export { router as getProductsWithDescriptionRouter };
