"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateSchema_1 = require("../middlewares/validateSchema");
const createProductSchema_1 = require("../validations/createProductSchema");
const Error_1 = require("./controllers/Error");
const Product_1 = require("../services/Product");
const router = express_1.default.Router();
exports.createProductRouter = router;
router.post("/api/product", (0, validateSchema_1.validateSchema)(createProductSchema_1.createProductSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { title, description, photo, price } = req.body;
    const product = await (0, Product_1.createProduct)(title, description, photo, price);
    return res.status(201).json({ msg: "Product successfully created: ", product });
}));
//# sourceMappingURL=create_product.js.map