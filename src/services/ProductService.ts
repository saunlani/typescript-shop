import { Product } from '../entities/Product'

export class ProductService {

    // Finds products.
    public async findProduct(productId: string): Promise<Product> {
        let foundProduct = await Product.findOneOrFail(parseInt(productId));
        return foundProduct;
    }

    // Updates products.productId,title,description,photo,price
    public async updateProduct(productId: string, title?: string, description?: string, photo?: string, price?: Number): Promise<Product | undefined> {

        try {
            let productToUpdate = await Product.findOneOrFail(parseInt(productId));

            // If product valid, make necessary updates
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
            }
            return productToUpdate;

        }
        catch (error) {
            return undefined;
        }

    }

}