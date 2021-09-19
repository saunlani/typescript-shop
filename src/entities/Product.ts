import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, OneToMany } from "typeorm";
import { ProductList } from "./ProductList";

@Entity()
export class Product extends BaseEntity {

    // ID
    @PrimaryGeneratedColumn()
    id: number

    // Title
    @Column()
    title: string;

    // ProductList (cart or order)
    @JoinColumn({
        name: 'productListId'
    })
    productList: ProductList

    // ProductList (cart or order)
    @ManyToMany(type => ProductList, productList => productList.productListProduct)
    productListProducts: ProductList[]

    // ProductListProducts (products incart or order)
    @OneToMany(type => ProductList, productListProduct => productListProduct.productListProduct)
    productListProduct: ProductList[]


    // Description
    @Column()
    description: string;

    // Photo
    @Column()
    photo: string;

    // Price
    @Column()
    price: number;
}