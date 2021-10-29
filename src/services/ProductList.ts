import { Product } from 'src/entities/Product';
import { ProductList } from '../entities/ProductList'
import { ProductListProduct } from '../entities/ProductListProduct'
import { ProductListUtility } from '../entities/module/ProductListUtility';


// Used to find a cart or an order.
export async function findProductList(customerId: string): Promise<ProductList | undefined> {

    const foundProductList = await ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customerId })
        .andWhere("ProductList.type = :type", { type: "cart" })
        .getOne();

        if (!foundProductList) {
            return undefined
        }
        else {
            return foundProductList;
        }
}

// Used to find an existing product in a cart.
export async function findProductListProduct(productList: ProductList, product: Product): Promise<ProductListProduct | undefined> {

    const foundCartProduct = await ProductListProduct.findOneOrFail({
        where: { productList: productList, product: product },
        relations: ['product'],
    })
    return foundCartProduct;
}

// Used to add products to a cart.
export async function addToProductList(productList: ProductList, product: Product, quantity: Number): Promise<ProductList | undefined> {

    // First look for an existing product with an existing quantity in cart (ProductList).
    // We want to always update an existing quantity (if one exist) for a product in the cart, instead of creating duplicate entries.
    let existingProductInCart: ProductListProduct | undefined;
    
    existingProductInCart = await findProductListProduct(productList, product);

    console.log('test')
    // If product exists in cart already, just add to the existing quantity and save.
    if (existingProductInCart) {

        existingProductInCart.quantity = Number(existingProductInCart.quantity) + Number(quantity);
        await ProductListProduct.save(existingProductInCart);

        if (productList) {

            // Generate a total cart price with the ProductListUtility module.
            productList.total = Number(await ProductListUtility.totalPrices(productList))

            // Update the ProductList (cart).
            await ProductList.save(productList);
        }
    }
    else {

        // This cart must not currently contain this product, so create a ProductListProduct (cart item), give it a quantity,
        // save it to the ProductList (cart), then update the total for the ProductList and save it

        await ProductListProduct.create({ productList: productList, product: product, unitPrice: product.price, quantity: Number(quantity) }).save();

        // Generate a total cart price with the ProductListUtility module.
        productList.total = Number(await ProductListUtility.totalPrices(productList))

        // Save the updated ProductList (cart).
        await ProductList.save(productList);

        // Verify ProductList (cart) has updated and return it to the frontend.
        const updatedCart = await ProductList.findOne(productList.id, { relations: ["productListProduct"] });
        return updatedCart;
    }
    return productList;
}

// Used to remove products from cart.
export async function removeProductFromProductList(productList: ProductList, product: Product, quantity: Number): Promise<ProductList | undefined> {

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

        // Product does not exist in cart.
        else {
            // what should be passed back to the api layer here to indicate that a product does not exist in the cart?
            return undefined;
        }
    }

    catch (error) {
        // error occurred
    }
    return productList;
}