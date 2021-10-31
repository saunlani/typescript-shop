"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithDescriptionRouter = void 0;
const express_1 = __importDefault(require("express"));
const Product_1 = require("../services/Product");
const Error_1 = require("./controllers/Error");
const validateSchema_1 = require("../middlewares/validateSchema");
const getProductsWithDescriptionSchema_1 = require("../validations/getProductsWithDescriptionSchema");
const router = express_1.default.Router();
exports.getProductsWithDescriptionRouter = router;
router.get('/api/products/description/', (0, validateSchema_1.validateSchema)(getProductsWithDescriptionSchema_1.getProductsWithDescriptionSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { description } = req.body;
    let product = await (0, Product_1.getProductsWithDescription)(description);
    return res.status(200).json(product);
}));
//# sourceMappingURL=get_products_description.js.map