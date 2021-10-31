"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateSchema_1 = require("../middlewares/validateSchema");
const checkoutCartSchema_1 = require("../validations/checkoutCartSchema");
const Error_1 = require("./controllers/Error");
const ProductList_1 = require("../services/ProductList");
const router = express_1.default.Router();
exports.checkoutCartRouter = router;
router.post('/api/cart/checkout/', (0, validateSchema_1.validateSchema)(checkoutCartSchema_1.checkoutCartSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { customerId } = req.body;
    const cart = await (0, ProductList_1.createOrder)(customerId);
    return res.status(200).json({ msg: 'Successfully processed order.', cart });
}));
//# sourceMappingURL=checkout_cart.js.map