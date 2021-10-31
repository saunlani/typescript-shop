import express from 'express';
import { getProductsWithDescription } from '../services/Product';
import { errorHandler } from './controllers/Error';
import { validateSchema } from '../middlewares/validateSchema';
import { getProductsWithDescriptionSchema } from '../validations/getProductsWithDescriptionSchema';

const router = express.Router();

router.get('/api/products/description/', validateSchema(getProductsWithDescriptionSchema), errorHandler(async (req, res, next) => {

    const { description } = req.body;

    let product = await getProductsWithDescription(description);
    return res.status(200).json(product);
}))

export { router as getProductsWithDescriptionRouter };
