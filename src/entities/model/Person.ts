import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BlockLike } from "typescript";

@Entity()
export class Person extends BaseEntity {

    // ID
    @PrimaryGeneratedColumn()
    id: number

    // First Name
    @Column()
    firstName: string;

    // Last Name
    @Column()
    lastName: string;

    // Email
    @Column({
        unique: true
    })
    email: string;

    // Card Number
    @Column({
        length: 10
    })
    cardNumber: string;

    // Active status
    @Column({default: true})
    active: boolean;
}