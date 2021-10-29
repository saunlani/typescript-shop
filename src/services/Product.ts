import { Product } from '../entities/Product'

// Find product
export async function findProduct(productId: string): Promise<Product | undefined> {
    let foundProduct = await Product.findOneOrFail(parseInt(productId));
    return foundProduct;
}

// Updates product.
export async function updateProduct(productId: string, title?: string, description?: string, photo?: string, price?: Number): Promise<Product | undefined> {

    let productToUpdate = await Product.findOneOrFail(parseInt(productId));
    
    //  If product valid, make necessary updates.
    if (productToUpdate) {
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
            productToUpdate.price = Number(price);
        }
        await productToUpdate.save();
        return productToUpdate
    }
    else {
        throw Error('Product not found.')
    }
}
