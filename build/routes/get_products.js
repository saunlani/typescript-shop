"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const Product_1 = require("../services/Product");
const Error_1 = require("./controllers/Error");
const router = express_1.default.Router();
exports.getProductsRouter = router;
router.get('/api/products', (0, Error_1.errorHandler)(async (req, res, next) => {
    let allProducts = await (0, Product_1.getAllProducts)();
    return res.status(200).json({ allProducts });
}));
//# sourceMappingURL=get_products.js.map