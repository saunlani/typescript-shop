"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const Product_1 = require("../services/Product");
const validateSchema_1 = require("../middlewares/validateSchema");
const updateProductSchema_1 = require("../validations/updateProductSchema");
const Error_1 = require("./controllers/Error");
const router = express_1.default.Router();
exports.updateProductRouter = router;
router.put('/api/product/update', (0, validateSchema_1.validateSchema)(updateProductSchema_1.updateProductSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { id, title, description, photo, price } = req.body;
    const product = await (0, Product_1.updateProduct)(id, title, description, photo, price);
    return res.status(200).json({ msg: "Update processed.", product });
}));
//# sourceMappingURL=update_product.js.map