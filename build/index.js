"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const Customer_1 = require("./entities/Customer");
const Product_1 = require("./entities/Product");
const ProductList_1 = require("./entities/ProductList");
const ProductListProduct_1 = require("./entities/ProductListProduct");
const create_customer_1 = require("./routes/create_customer");
const get_customers_1 = require("./routes/get_customers");
const get_products_1 = require("./routes/get_products");
const create_product_1 = require("./routes/create_product");
const get_products_title_1 = require("./routes/get_products_title");
const get_products_description_1 = require("./routes/get_products_description");
const get_products_description_title_1 = require("./routes/get_products_description_title");
const create_cart_1 = require("./routes/create_cart");
const add_to_cart_1 = require("./routes/add_to_cart");
const remove_from_cart_1 = require("./routes/remove_from_cart");
const checkout_cart_1 = require("./routes/checkout_cart");
const get_cart_1 = require("./routes/get_cart");
const update_customer_1 = require("./routes/update_customer");
const update_product_1 = require("./routes/update_product");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const main = async () => {
    try {
        await (0, typeorm_1.createConnection)({
            type: "postgres",
            host: process.env.dbHost,
            port: Number(process.env.dbPort),
            username: process.env.dbUsername,
            password: process.env.dbPassword,
            database: process.env.dbDatabaseName,
            entities: [Customer_1.Customer, Product_1.Product, ProductList_1.ProductList, ProductListProduct_1.ProductListProduct],
            synchronize: true
        });
        console.log('successful connection to database');
    }
    catch (e) {
        console.error(e, 'database connection failure');
    }
    try {
        app.use(express_1.default.json());
        app.use(create_customer_1.createCustomerRouter);
        app.use(get_customers_1.getCustomersRouter);
        app.use(create_product_1.createProductRouter);
        app.use(get_products_1.getProductsRouter);
        app.use(get_products_title_1.getProductsWithTitleRouter);
        app.use(get_products_description_1.getProductsWithDescriptionRouter);
        app.use(get_products_description_title_1.getProductWithDescriptionAndTitleRouter);
        app.use(create_cart_1.createCartRouter);
        app.use(add_to_cart_1.addToCartRouter);
        app.use(remove_from_cart_1.removeFromCartRouter);
        app.use(checkout_cart_1.checkoutCartRouter);
        app.use(get_cart_1.getCartRouter);
        app.use(update_customer_1.updateCustomerRouter);
        app.use(update_product_1.updateProductRouter);
        app.listen(process.env.serverPort, () => {
            console.log("server now running on port:", process.env.serverPort);
        });
        app.use(function (err, req, res, next) {
            res.status(500).json({ 'msg': err.message });
        });
    }
    catch (error) {
        console.log("failed to create server:", error);
    }
};
main();
//# sourceMappingURL=index.js.map