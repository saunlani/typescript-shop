import express from 'express';
import { validateSchema } from '../middlewares/validateSchema';
import { createProductSchema } from '../validations/createProductSchema';
import { errorHandler } from './controllers/Error';
import { createProduct } from '../services/Product';

const router = express.Router();

router.post("/api/product", validateSchema(createProductSchema), errorHandler(async (req, res, next) => {

    const { title, description, photo, price } = req.body;
    const product = await createProduct(title, description, photo, price);

    return res.status(201).json({ msg: "Product successfully created: ", product });
}))

export { router as createProductRouter };