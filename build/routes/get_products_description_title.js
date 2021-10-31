"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductWithDescriptionAndTitleRouter = void 0;
const express_1 = __importDefault(require("express"));
const Product_1 = require("../services/Product");
const Error_1 = require("./controllers/Error");
const validateSchema_1 = require("../middlewares/validateSchema");
const getProductsWithDescriptionAndTitleSchema_1 = require("../validations/getProductsWithDescriptionAndTitleSchema");
const router = express_1.default.Router();
exports.getProductWithDescriptionAndTitleRouter = router;
router.get('/api/products/description_title/', (0, validateSchema_1.validateSchema)(getProductsWithDescriptionAndTitleSchema_1.getProductsWithDescriptionAndTitleSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { description, title } = req.body;
    let products = await (0, Product_1.getProductsWithDescriptionAndTitle)(description, title);
    return res.status(200).json(products);
}));
//# sourceMappingURL=get_products_description_title.js.map