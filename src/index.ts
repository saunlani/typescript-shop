import { createConnection } from "typeorm";
import { config } from "dotenv";
import express from "express"
import { Customer } from "./entities/Customer";
import { Product } from "./entities/Product";
import { ProductList } from "./entities/ProductList";
import { ProductListProduct } from "./entities/ProductListProduct";
import { createCustomerRouter } from "./routes/create_customer";
import { getCustomersRouter } from "./routes/get_customers";
import { getProductsRouter } from "./routes/get_products";
import { createProductRouter } from "./routes/create_product";
import { getProductsWithTitleRouter } from "./routes/get_products_title";
import { getProductsWithDescriptionRouter } from "./routes/get_products_description";
import { getProductWithDescriptionAndTitleRouter } from "./routes/get_products_description_title";
import { createCartRouter } from "./routes/create_cart";
import { addToCartRouter } from "./routes/add_to_cart";
import { removeFromCartRouter } from "./routes/remove_from_cart";
import { checkoutCartRouter } from "./routes/checkout_cart";
import { getCartRouter } from "./routes/get_cart";
import { updateCustomerRouter } from "./routes/update_customer";
import { updateProductRouter } from "./routes/update_product";

config();

const app = express();

const main = async () => {

    try {

        await createConnection({
            type: "postgres",
            host: process.env.DBHOST,
            port: Number(process.env.PGPORT),
            username: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DB,
            entities: [Customer, Product, ProductList, ProductListProduct],
            synchronize: true
        })
        console.log('successful connection to database')
    }

    catch (e) {
        console.error(e, 'database connection failure')
    }


    try {
        app.use(express.json())
        app.use(createCustomerRouter)
        app.use(getCustomersRouter);
        app.use(createProductRouter);
        app.use(getProductsRouter);
        app.use(getProductsWithTitleRouter);
        app.use(getProductsWithDescriptionRouter);
        app.use(getProductWithDescriptionAndTitleRouter);
        app.use(createCartRouter);
        app.use(addToCartRouter);
        app.use(removeFromCartRouter);
        app.use(checkoutCartRouter);
        app.use(getCartRouter);
        app.use(updateCustomerRouter);
        app.use(updateProductRouter);
        app.listen(process.env.SERVERPORT, () => {
            console.log("server now running on port:", process.env.SERVERPORT)
        })
        app.use(function (err, req, res, next) {
            res.status(500).json({ 'msg': err.message })
        });
    }

    catch (error) {

        console.log("failed to create server: ", error)
    }

}
main();