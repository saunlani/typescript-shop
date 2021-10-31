"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const Product_1 = require("../services/Product");
const Customer_1 = require("../services/Customer");
const ProductList_1 = require("../services/ProductList");
const validateSchema_1 = require("../middlewares/validateSchema");
const removeFromCartSchema_1 = require("../validations/removeFromCartSchema");
const Error_1 = require("./controllers/Error");
const router = express_1.default.Router();
exports.removeFromCartRouter = router;
router.post('/api/cart/remove/', (0, validateSchema_1.validateSchema)(removeFromCartSchema_1.removeFromCartSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { customerId, productId, quantity } = req.body;
    let product = await (0, Product_1.findProductById)(productId);
    let customer = await (0, Customer_1.findCustomer)(customerId);
    let cart = await (0, ProductList_1.findCart)(customer.id);
    let updatedCart = await (0, ProductList_1.removeProductFromCart)(cart, product, quantity);
    if (updatedCart) {
        return res.status(200).json({ msg: 'Product(s) removed from cart.', cart });
    }
    else {
        return res.status(404).json({ msg: 'Product does not exist in cart.', cart });
    }
}));
//# sourceMappingURL=remove_from_cart.js.map