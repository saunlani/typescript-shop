"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.updateProduct = exports.getProductsWithDescriptionAndTitle = exports.getProductsWithDescription = exports.getProductsWithTitle = exports.getAllProducts = exports.findProductById = exports.findProduct = void 0;
const Product_1 = require("../entities/Product");
async function findProduct(id, title, description, photo, price) {
    try {
        let foundProduct = await Product_1.Product.findOneOrFail(id);
        return foundProduct;
    }
    catch {
        throw Error('Product not found');
    }
}
exports.findProduct = findProduct;
async function findProductById(id) {
    try {
        let foundProduct = await Product_1.Product.findOneOrFail(id);
        return foundProduct;
    }
    catch {
        throw Error('Product not found');
    }
}
exports.findProductById = findProductById;
async function getAllProducts() {
    let products = await Product_1.Product.createQueryBuilder()
        .select('product')
        .from(Product_1.Product, 'product')
        .getMany();
    if (products.length === 0) {
        throw Error('No products found.');
    }
    return products;
}
exports.getAllProducts = getAllProducts;
async function getProductsWithTitle(title) {
    const foundProducts = await Product_1.Product.createQueryBuilder()
        .select('product')
        .from(Product_1.Product, 'product')
        .where('LOWER(product.title) like LOWER(:title)', { title: `%${title}%` })
        .getMany();
    if (foundProducts.length === 0) {
        throw Error('No matching products found.');
    }
    else {
        return foundProducts;
    }
}
exports.getProductsWithTitle = getProductsWithTitle;
async function getProductsWithDescription(description) {
    const foundProducts = await Product_1.Product.createQueryBuilder()
        .select('product')
        .from(Product_1.Product, 'product')
        .where('LOWER(product.description) like LOWER(:description)', { description: `%${description}%` })
        .getMany();
    if (foundProducts.length === 0) {
        throw Error('No matching products found.');
    }
    else {
        return foundProducts;
    }
}
exports.getProductsWithDescription = getProductsWithDescription;
async function getProductsWithDescriptionAndTitle(description, title) {
    const foundProducts = await Product_1.Product.createQueryBuilder()
        .select('product')
        .from(Product_1.Product, 'product')
        .where('LOWER(product.description) like LOWER(:description) AND LOWER(product.title) like LOWER(:title)', { description: `%${description}%`, title: `%${title}%` })
        .getMany();
    if (foundProducts.length === 0) {
        throw Error('No matching products found.');
    }
    else {
        return foundProducts;
    }
}
exports.getProductsWithDescriptionAndTitle = getProductsWithDescriptionAndTitle;
async function updateProduct(id, title, description, photo, price) {
    let productToUpdate;
    try {
        productToUpdate = await Product_1.Product.findOneOrFail(id);
    }
    catch (error) {
        throw Error('Product not found.');
    }
    if (title) {
        productToUpdate.title = title;
    }
    if (description) {
        productToUpdate.description = description;
    }
    if (photo) {
        productToUpdate.photo = photo;
    }
    if (price) {
        productToUpdate.price = price;
    }
    await productToUpdate.save();
    return productToUpdate;
}
exports.updateProduct = updateProduct;
async function createProduct(title, description, photo, price) {
    try {
        const product = Product_1.Product.create({ title, description, photo, price });
        await product.save();
        return product;
    }
    catch {
        throw Error('Problem creating product.');
    }
}
exports.createProduct = createProduct;
//# sourceMappingURL=Product.js.map