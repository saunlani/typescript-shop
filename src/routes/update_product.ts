import express from 'express';
import { updateProduct } from '../services/Product';
import { validateSchema } from '../middlewares/validateSchema';
import { updateProductSchema } from '../validations/updateProductSchema';
import { errorHandler } from './controllers/Error';

const router = express.Router();

router.put('/api/product/update', validateSchema(updateProductSchema), errorHandler(async (req, res, next) => {

    const { id, title, description, photo, price } = req.body;

    const product = await updateProduct(id, title, description, photo, price);
    return res.status(200).json({ msg: "Update processed.", product });

}))

export { router as updateProductRouter }