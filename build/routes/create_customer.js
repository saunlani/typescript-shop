"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateSchema_1 = require("../middlewares/validateSchema");
const createCustomerSchema_1 = require("../validations/createCustomerSchema");
const Error_1 = require("./controllers/Error");
const Customer_1 = require("../services/Customer");
const router = express_1.default.Router();
exports.createCustomerRouter = router;
router.post('/api/customer', (0, validateSchema_1.validateSchema)(createCustomerSchema_1.createCustomerSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { firstName, lastName, email, cardNumber } = req.body;
    const customer = await (0, Customer_1.createCustomer)(firstName, lastName, email, cardNumber);
    return res.status(201).json({ msg: "Customer created successfully.", customer });
}));
//# sourceMappingURL=create_customer.js.map