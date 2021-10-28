import { Product } from '../entities/Product'

export class ProductService {

    public async findProduct(productId: string) : Promise<Product> {
        let foundProduct = await Product.findOneOrFail(parseInt(productId));
        return foundProduct;
      }

    }