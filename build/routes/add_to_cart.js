"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductList_1 = require("../services/ProductList");
const validateSchema_1 = require("../middlewares/validateSchema");
const addToCartSchema_1 = require("../validations/addToCartSchema");
const Error_1 = require("./controllers/Error");
const router = express_1.default.Router();
exports.addToCartRouter = router;
router.post('/api/cart/add/', (0, validateSchema_1.validateSchema)(addToCartSchema_1.addToCartSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { customerId, productId, quantity } = req.body;
    let updatedCart = await (0, ProductList_1.addToCart)(customerId, productId, quantity);
    return res.status(201).json({ msg: "Successfully added product(s) to cart: ", updatedCart });
}));
//# sourceMappingURL=add_to_cart.js.map