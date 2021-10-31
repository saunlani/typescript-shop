"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateSchema_1 = require("../middlewares/validateSchema");
const createCartSchema_1 = require("../validations/createCartSchema");
const Error_1 = require("./controllers/Error");
const ProductList_1 = require("../services/ProductList");
const router = express_1.default.Router();
exports.createCartRouter = router;
router.post('/api/cart/', (0, validateSchema_1.validateSchema)(createCartSchema_1.createCartSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { customerId } = req.body;
    const cart = await (0, ProductList_1.createCart)(customerId);
    return res.status(201).json({ msg: "Cart successfully created.", cart });
}));
//# sourceMappingURL=create_cart.js.map