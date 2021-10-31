"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithTitleRouter = void 0;
const express_1 = __importDefault(require("express"));
const Product_1 = require("../services/Product");
const Error_1 = require("./controllers/Error");
const validateSchema_1 = require("../middlewares/validateSchema");
const getProductsWithTitleSchema_1 = require("../validations/getProductsWithTitleSchema");
const router = express_1.default.Router();
exports.getProductsWithTitleRouter = router;
router.get('/api/products/title/', (0, validateSchema_1.validateSchema)(getProductsWithTitleSchema_1.getProductsWithTitleSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { title } = req.body;
    let product = await (0, Product_1.getProductsWithTitle)(title);
    return res.status(200).json(product);
}));
//# sourceMappingURL=get_products_title.js.map