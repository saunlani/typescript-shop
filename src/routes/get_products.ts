import express from 'express';
import { getAllProducts } from '../services/Product';
import { errorHandler } from './controllers/Error';
//
const router = express.Router();

router.get('/api/products', errorHandler(async (req, res, next) => {

        let allProducts = await getAllProducts();
        return res.status(200).json({ allProducts});

}))

export { router as getProductsRouter };
