import { NestFactory } from "@nestjs/core";
import * as faker from 'faker'
import { OrderService } from "../order/order.service";
import { AppModule } from "../app.module";
import { OrderItemService } from "../order/orderItem.service";
import {randomInt} from "crypto";



(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const orderService = app.get(OrderService)
    const orderItemService = app.get(OrderItemService)

    for (let i = 0; i < 30; i++) {
        const order = await orderService.save({
            user_id: Math.floor(Math.random() * 29) + 1,
            code: faker.lorem.slug(2),
            ambassador_email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            complete: true
        })
        for (let j = 0; j < Math.floor(Math.random() * 4) + 1; j++) {
            await orderItemService.save({
                order,
                productTitle: faker.lorem.words(2),
                price: Math.floor(Math.random() * 90) + 10,
                quantity: Math.floor(Math.random() * 4) + 1,
                adminRevene: Math.floor(Math.random() * 90) + 10,
                ambassadorRevene: Math.floor(Math.random() * 9) + 1,
            })
        }
    }

    process.exit()
  })();