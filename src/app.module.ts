import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order';
import { OrderItem } from './order/entities/order-item';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db',
      entities: [User, Product, Order, OrderItem],
      synchronize: true
    }),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule
  ],
})
export class AppModule {}
