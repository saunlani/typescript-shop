import express from 'express';
import { getProductsWithTitle } from '../services/Product';
import { errorHandler } from './controllers/Error';
import { validateSchema } from '../middlewares/validateSchema';
import { getProductsWithTitleSchema } from '../validations/getProductsWithTitleSchema';

const router = express.Router();

router.get('/api/products/title/', validateSchema(getProductsWithTitleSchema), errorHandler(async (req, res, next) => {

    const { title } = req.body;

    let product = await getProductsWithTitle(title);
    return res.status(200).json(product);
}))

export { router as getProductsWithTitleRouter };
