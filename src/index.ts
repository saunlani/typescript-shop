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
import { getProductWithTitleRouter } from "./routes/get_products_title";
import { getProductWithDescriptionRouter } from "./routes/get_products_description";
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
        type:"postgres",
        host:process.env.dbHost,
        port: Number(process.env.dbPort),
        username:process.env.dbUsername,
        password:process.env.dbPassword,
        database: process.env.dbDatabaseName,
        entities: [Customer, Product, ProductList, ProductListProduct],
        synchronize:true
    }) 
    console.log('successful connection to database')
}

    catch (e) {
        console.error(e,'database connection failure')
    }

    try {
        app.use(express.json())
        app.use(createCustomerRouter)
        app.use(getCustomersRouter);
        app.use(createProductRouter);
        app.use(getProductsRouter);
        app.use(getProductWithTitleRouter);
        app.use(getProductWithDescriptionRouter);
        app.use(getProductWithDescriptionAndTitleRouter);
        app.use(createCartRouter);
        app.use(addToCartRouter);
        app.use(removeFromCartRouter);
        app.use(checkoutCartRouter);
        app.use(getCartRouter);
        app.use(updateCustomerRouter);
        app.use(updateProductRouter);
        app.listen(process.env.serverPort, () => {
            console.log("server now running on port:",process.env.serverPort)
        })
    }
    catch (e) {
        console.error(e,'server creation failure')
    }

}

main();