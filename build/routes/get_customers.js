"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomersRouter = void 0;
const express_1 = __importDefault(require("express"));
const Customer_1 = require("../services/Customer");
const Error_1 = require("./controllers/Error");
const router = express_1.default.Router();
exports.getCustomersRouter = router;
router.get('/api/customers', (0, Error_1.errorHandler)(async (req, res, next) => {
    const customers = await (0, Customer_1.getCustomers)();
    return res.status(200).json(customers);
}));
//# sourceMappingURL=get_customers.js.map