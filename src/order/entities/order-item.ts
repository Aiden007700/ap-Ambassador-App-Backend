import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productTitle: string

    @Column()
    price: number

    @Column()
    quantity: number

    @Column()
    adminRevene: number

    @Column()
    ambassadorRevene: number

    @ManyToOne(() => Order, order => order.orderItem)
    @JoinColumn({name: 'orderId'})
    order: Order
}