"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateSchema_1 = require("../middlewares/validateSchema");
const getCartSchema_1 = require("../validations/getCartSchema");
const Error_1 = require("./controllers/Error");
const ProductList_1 = require("../services/ProductList");
const router = express_1.default.Router();
exports.getCartRouter = router;
router.post('/api/cart/get', (0, validateSchema_1.validateSchema)(getCartSchema_1.getCartSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { customerId } = req.body;
    const cart = await (0, ProductList_1.findCart)(customerId);
    const cartItems = await (0, ProductList_1.getCartItems)(cart);
    return res.status(200).json({ cart, cartItems });
}));
//# sourceMappingURL=get_cart.js.map