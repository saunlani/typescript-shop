import express from 'express';
import { validateSchema } from '../middlewares/validateSchema';
import { createCartSchema } from '../validations/createCartSchema';
import { errorHandler } from './controllers/Error';
import { createCart } from '../services/ProductList';

const router = express.Router();

router.post('/api/cart/', validateSchema(createCartSchema), errorHandler(async (req, res, next) => {

    const { customerId } = req.body;

    const cart = await createCart(customerId);
    return res.status(201).json({ msg: "Cart successfully created.", cart })

}));

export { router as createCartRouter }