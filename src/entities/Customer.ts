import { Entity, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { Person } from "./model/Person";
import { ProductList } from "./ProductList";

@Entity('customer')

export class Customer extends Person {

    // ProductList (cart or order)

    @OneToOne(() => ProductList, productList => productList.customer)
    @JoinColumn()
    productList: ProductList;

    // Create Date
    @CreateDateColumn()
    createdAt:Date;

    // Update Date
    @UpdateDateColumn()
    updatedAt:Date;
}