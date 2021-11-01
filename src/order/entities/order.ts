import { Exclude, Expose } from "class-transformer";
import { link } from "fs";
import { Link } from "src/link/entites/link";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    transaction_id: string

    @Column()
    user_id: number

    @Column()
    code: string

    @ManyToOne(() => Link, link => link.order, {
        createForeignKeyConstraints: false
    })
    @JoinColumn({
        referencedColumnName: 'code', name: 'code'
    })
    link: Link

    @Column()
    ambassador_email: string

    @Exclude()
    @Column()
    firstName: string

    @Exclude()
    @Column()
    lastName: string

    @Column()
    email: string

    @Column({nullable: true})
    address: string

    @Column({nullable: true})
    country: string

    @Column({nullable: true})
    city: string

    @Column({nullable: true})
    zip: string

    @Exclude()
    @Column({default: false})
    complete: boolean

    @OneToMany(() => OrderItem, orderItem=> orderItem.order)
    orderItem: OrderItem[]

    @Expose()
    get name() {
        return `${this.firstName} ${this.lastName}`
    } 

    @Expose()
    get total() {
        return this.orderItem.reduce((acc, item) => acc + item.adminRevene, 0)
    }
}