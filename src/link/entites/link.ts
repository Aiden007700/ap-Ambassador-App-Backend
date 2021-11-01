import { userInfo } from "os";
import { Order } from "src/order/entities/order";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Code, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    code: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'linkProducts',
        joinColumn: {name: 'linkId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'productId', referencedColumnName: 'id'}
    })
    products: Product[]

    @OneToMany(() => Order, order => order.link, {
        createForeignKeyConstraints: false
    })
    @JoinColumn({
        referencedColumnName: 'code', name: 'code'
    })
    order: Order[];
}