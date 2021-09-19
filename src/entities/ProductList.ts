import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ProductListProduct } from "./ProductListProduct";
import { Customer } from "./Customer";


@Entity('productList')
export class ProductList extends BaseEntity {

    // ID
    @PrimaryGeneratedColumn()
    id: number

    // Type: cart or order.
    @Column()
    type: string

    // Customer
    @Column('integer') customerId: number;
    @Column({ nullable: true }) cardNumber: string;
    @ManyToOne(() => Customer, customer => customer.productList)
    customer: Customer;

    // Products
    @OneToMany(type => ProductListProduct, productListProduct => productListProduct.productList)
    productListProduct: ProductListProduct[];

    // Total Price
    @Column({ nullable: true }) 
    total: number;

    // Create Date
    @CreateDateColumn()
    createdAt: Date;

    // Update Date
    @UpdateDateColumn()
    updatedAt: Date;
}