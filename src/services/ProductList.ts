import { Product } from 'src/entities/Product';
import { ProductList } from '../entities/ProductList'
import { ProductListProduct } from '../entities/ProductListProduct'
import { ProductListUtility } from '../entities/module/ProductListUtility';
import { findCustomer } from './Customer';
import { Customer } from '../entities/Customer';
import { findProductById } from '../services/Product';

// Create a cart.
export async function createCart(customerId: number): Promise<ProductList> {

    let customer = await findCustomer(customerId);

    // Check for existing cart.
    const existingCart = await ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customer.id })
        .andWhere("ProductList.type = :type", { type: 'cart' })
        .getOne();

    if (existingCart) {
        throw Error('Cart already exists for this customer')
    }

    else {
        const cart = ProductList.create({
            productListProduct: [],
            type: 'cart',
            customer: customer
        });
        await cart.save();
        return cart;
    }
}

// Find a cart by ID
export async function findCartByCustomerId(customerId: number): Promise<ProductList> {

    const foundCart = await ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customerId })
        .andWhere("ProductList.type = :type", { type: 'cart' })
        .getOne();
    if (foundCart) {
        return foundCart;
    }
    else {
        throw Error('Cart not found for this customer.')
    }
}

// Find a cart or an order.
export async function findProductList(customerId: number, cartOrOrder: string): Promise<ProductList> {

    const foundProductList = await ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customerId })
        .andWhere("ProductList.type = :type", { type: cartOrOrder })
        .getOne();
    if (foundProductList) {
        return foundProductList;
    }
    else {
        if (cartOrOrder === 'cart') {
            throw Error('Cart not found for this customer.')
        }
        else {
            throw Error('Order not found for this customer.')
        }
    }
}

export async function findCart(customerId: number): Promise<ProductList> {

    const foundCart = await ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customerId })
        .andWhere("ProductList.type = :type", { type: 'cart' })
        .getOne();

    if (foundCart) {
        return foundCart;
    }
    else {
        throw Error('Cart not found for this customer.')
    }
}

// Gets items in cart or oder.
export async function getCartItems(productList: ProductList): Promise<ProductListProduct[]> {

    let cartProducts: ProductListProduct[];
    cartProducts = await ProductListProduct.find({ where: { productList: productList } });
    return cartProducts;
}

// Find an existing product in a cart.
export async function findProductListProduct(productList: ProductList, product: Product): Promise<ProductListProduct | null> {

    try {
        const foundCartProduct = await ProductListProduct.findOneOrFail({
            where: { productList: productList, product: product },
            relations: ['product'],
        })
        return foundCartProduct;
    }
    catch {
        return null;
    }
}

// Add products to a cart.
export async function addToCart(customerId: number, productId: number, quantity: number): Promise<ProductList> {

    let customer = await findCustomer(customerId);
    let product = await findProductById(productId);
    let cart = await findCartByCustomerId(customer.id);

    // First look for an existing product with an existing quantity in cart (ProductList).
    // We want to always update an existing quantity (if one exist) for a product in the cart, instead of creating duplicate entries.

    let existingProductInCart: ProductListProduct | null;

    existingProductInCart = await findProductListProduct(cart, product);
    console.log(existingProductInCart);

    // If product exists in cart already, just add to the existing quantity and save.
    if (existingProductInCart) {

        existingProductInCart.quantity = existingProductInCart.quantity + quantity;
        await ProductListProduct.save(existingProductInCart);

        if (cart) {

            // Generate a total cart price with the ProductListUtility module.
            cart.total = Number(await ProductListUtility.totalPrices(cart))

            // Update the ProductList (cart).
            await ProductList.save(cart);
        }
    }
    else {
        // This cart must not currently contain this product, so create a ProductListProduct (cart item), give it a quantity,
        // save it to the ProductList (cart), then update the total for the ProductList and save it

        await ProductListProduct.create({ productList: cart, product: product, unitPrice: product.price, quantity: Number(quantity) }).save();

        // Generate a total cart price with the ProductListUtility module.
        cart.total = Number(await ProductListUtility.totalPrices(cart))

        // Save the updated ProductList (cart).
        await ProductList.save(cart);

        // Verify ProductList (cart) has updated and return it to the frontend.
        const updatedCart = await findProductList(cart.id, 'cart');
        return updatedCart;
    }
    return cart;
}

// Remove products from cart.
export async function removeProductFromCart(productList: ProductList, product: Product, quantity: number): Promise<ProductList> {

    try {
        // Find ProductListProduct - product in ProductList (cart).
        let cartProduct = await ProductListProduct.findOne({
            where: { productList: productList, product: product },
            relations: ['product'],
        })

        if (cartProduct) {

            // If the quantity of existing product in ProductList (cart) is 1 or if it is equal to the argument quantity, then remove the entry from ProductList (cart).
            if (cartProduct.quantity === 1 || cartProduct.quantity <= quantity) {
                await cartProduct.remove();
                productList.total = Number(await ProductListUtility.totalPrices(productList))
                await ProductList.save(productList);

            }

            // If the quantity of existing product in ProductList (cart) is larger than one, subtract from the quantity.
            else {

                cartProduct.quantity = Number(cartProduct.quantity) - Number(quantity);
                await ProductListProduct.save(cartProduct);
                productList.total = Number(await ProductListUtility.totalPrices(productList))
                await ProductList.save(productList);
            }
        }

        else {
            throw Error('Product does not exist in cart.')
        }
    }

    catch (error) {
        throw Error('Problem removing product from cart.')
    }
    return productList;
}

// Create order with existing cart. (updates the ProductList.type from "cart" to "order")
export async function createOrder(customerId: number): Promise<ProductList> {

    try {
        let customer = await findCustomer(customerId);
        let cart = await findCart(customer.id)
        cart.cardNumber = customer.cardNumber;
        cart.type = 'order';
        await ProductList.save(cart);
        return cart;
    }
    catch {
        throw Error('Cart with items not found for this customer.')
    }
}