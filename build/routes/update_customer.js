"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerRouter = void 0;
const express_1 = __importDefault(require("express"));
const Customer_1 = require("../services/Customer");
const Error_1 = require("./controllers/Error");
const validateSchema_1 = require("../middlewares/validateSchema");
const updateCustomerSchema_1 = require("../validations/updateCustomerSchema");
const router = express_1.default.Router();
exports.updateCustomerRouter = router;
router.put('/api/customer/update', (0, validateSchema_1.validateSchema)(updateCustomerSchema_1.updateCustomerSchema), (0, Error_1.errorHandler)(async (req, res, next) => {
    const { customerId, active, firstName, lastName, email, cardNumber } = req.body;
    const customer = await (0, Customer_1.updateCustomer)(customerId, active, firstName, lastName, email, cardNumber);
    return res.status(200).json({ msg: "Customer updated", customer });
}));
//# sourceMappingURL=update_customer.js.map