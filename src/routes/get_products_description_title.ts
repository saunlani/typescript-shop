import express from 'express';
import { getProductsWithDescriptionAndTitle } from '../services/Product';
import { errorHandler } from './controllers/Error';
import { validateSchema } from '../middlewares/validateSchema';
import { getProductsWithDescriptionAndTitleSchema } from '../validations/getProductsWithDescriptionAndTitleSchema';

const router = express.Router();

router.get('/api/products/description_title/', validateSchema(getProductsWithDescriptionAndTitleSchema), errorHandler(async (req, res, next) => {

    const { description, title } = req.body;

    let products = await getProductsWithDescriptionAndTitle(description,title);
    return res.status(200).json(products);

}))

export { router as getProductWithDescriptionAndTitleRouter };
