import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { ProductList } from "./ProductList";
import { Product } from "./Product";

@Entity('productlistProducts')
export class ProductListProduct extends BaseEntity {

    // ID
    @PrimaryGeneratedColumn()
    id: number

    // Quantity
    @Column()
    quantity: number;

    // Unit Price
    @Column()
    unitPrice: number;

    // Product
    @Column('int') productId: number;
    @ManyToOne(type => Product, product => product.productListProducts, { primary: true })
    product: Product;

    // ProductList: cart or order
    @Column('int') productListId: number;
    @ManyToOne(type => ProductList, productList => productList.productListProduct, { primary: true })
    productList: ProductList;

    // Create Date
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    // Update Date
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}
