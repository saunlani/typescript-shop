"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.removeProductFromCart = exports.addToCart = exports.findCartItem = exports.getCartItems = exports.findCart = exports.findCartByCustomerId = exports.createCart = void 0;
const ProductList_1 = require("../entities/ProductList");
const ProductListProduct_1 = require("../entities/ProductListProduct");
const ProductListUtility_1 = require("../entities/module/ProductListUtility");
const Customer_1 = require("./Customer");
const Product_1 = require("../services/Product");
async function createCart(customerId) {
    let customer = await (0, Customer_1.findCustomer)(customerId);
    const existingCart = await ProductList_1.ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customer.id })
        .andWhere("ProductList.type = :type", { type: 'cart' })
        .getOne();
    if (existingCart) {
        throw Error('Cart already exists for this customer');
    }
    else {
        const cart = ProductList_1.ProductList.create({
            productListProduct: [],
            type: 'cart',
            customer: customer
        });
        await cart.save();
        return cart;
    }
}
exports.createCart = createCart;
async function findCartByCustomerId(customerId) {
    const foundCart = await ProductList_1.ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customerId })
        .andWhere("ProductList.type = :type", { type: 'cart' })
        .getOne();
    if (foundCart) {
        return foundCart;
    }
    else {
        throw Error('Cart not found for this customer.');
    }
}
exports.findCartByCustomerId = findCartByCustomerId;
async function findCart(customerId) {
    const foundCart = await ProductList_1.ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customerId })
        .andWhere("ProductList.type = :type", { type: 'cart' })
        .getOne();
    if (foundCart) {
        return foundCart;
    }
    else {
        throw Error('Cart not found for this customer.');
    }
}
exports.findCart = findCart;
async function getCartItems(productList) {
    let cartProducts;
    cartProducts = await ProductListProduct_1.ProductListProduct.find({ where: { productList: productList } });
    return cartProducts;
}
exports.getCartItems = getCartItems;
async function findCartItem(productList, product) {
    try {
        const foundCartProduct = await ProductListProduct_1.ProductListProduct.findOneOrFail({
            where: { productList: productList, product: product },
            relations: ['product'],
        });
        return foundCartProduct;
    }
    catch {
        return null;
    }
}
exports.findCartItem = findCartItem;
async function addToCart(customerId, productId, quantity) {
    let customer = await (0, Customer_1.findCustomer)(customerId);
    let product = await (0, Product_1.findProductById)(productId);
    let cart = await findCartByCustomerId(customer.id);
    let existingProductInCart;
    existingProductInCart = await findCartItem(cart, product);
    console.log(existingProductInCart);
    if (existingProductInCart) {
        existingProductInCart.quantity = existingProductInCart.quantity + quantity;
        await ProductListProduct_1.ProductListProduct.save(existingProductInCart);
        if (cart) {
            cart.total = Number(await ProductListUtility_1.ProductListUtility.totalPrices(cart));
            await ProductList_1.ProductList.save(cart);
        }
    }
    else {
        await ProductListProduct_1.ProductListProduct.create({ productList: cart, product: product, unitPrice: product.price, quantity: Number(quantity) }).save();
        cart.total = Number(await ProductListUtility_1.ProductListUtility.totalPrices(cart));
        await ProductList_1.ProductList.save(cart);
        const updatedCart = await findCart(cart.id);
        return updatedCart;
    }
    return cart;
}
exports.addToCart = addToCart;
async function removeProductFromCart(productList, product, quantity) {
    try {
        let cartProduct = await ProductListProduct_1.ProductListProduct.findOne({
            where: { productList: productList, product: product },
            relations: ['product'],
        });
        if (cartProduct) {
            if (cartProduct.quantity === 1 || cartProduct.quantity <= quantity) {
                await cartProduct.remove();
                productList.total = Number(await ProductListUtility_1.ProductListUtility.totalPrices(productList));
                await ProductList_1.ProductList.save(productList);
            }
            else {
                cartProduct.quantity = Number(cartProduct.quantity) - Number(quantity);
                await ProductListProduct_1.ProductListProduct.save(cartProduct);
                productList.total = Number(await ProductListUtility_1.ProductListUtility.totalPrices(productList));
                await ProductList_1.ProductList.save(productList);
            }
        }
        else {
            throw Error('Product does not exist in cart.');
        }
    }
    catch (error) {
        throw Error('Problem removing product from cart.');
    }
    return productList;
}
exports.removeProductFromCart = removeProductFromCart;
async function createOrder(customerId) {
    try {
        let customer = await (0, Customer_1.findCustomer)(customerId);
        let cart = await findCart(customer.id);
        cart.cardNumber = customer.cardNumber;
        cart.type = 'order';
        await ProductList_1.ProductList.save(cart);
        return cart;
    }
    catch {
        throw Error('Cart with items not found for this customer.');
    }
}
exports.createOrder = createOrder;
//# sourceMappingURL=ProductList.js.map