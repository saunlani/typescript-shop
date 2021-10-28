import { Product } from 'src/entities/Product';
import { ProductList } from '../entities/ProductList'
import { ProductListProduct } from '../entities/ProductListProduct'

export class ProductListService {

    public async findProductList(customerId: string) : Promise<ProductList|undefined> {

        const foundProductList = await ProductList.createQueryBuilder("ProductList")
        .where("ProductList.customerId = :customerId", { customerId: customerId })
        .andWhere("ProductList.type = :type", { type: "cart" })
        .getOne();

        return foundProductList;
      }

      public async findProductListProduct(productList: ProductList, product: Product) : Promise<ProductListProduct|undefined> {

        const foundCartProduct = await ProductListProduct.findOneOrFail({
            where: { productList: productList, product: product },
            relations: ['product'],
        })
        
        return foundCartProduct;
      }
      
    }