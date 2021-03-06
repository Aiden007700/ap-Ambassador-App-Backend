import { NestFactory } from "@nestjs/core";
import {randomInt} from "crypto";
import * as faker from 'faker'
import { AppModule } from "../app.module";
import { ProductService } from "../product/product.service";



(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productService = app.get(ProductService)

    for (let i = 0; i < 30; i++) {
        await productService.save({
            title: faker.lorem.words(2),
            description: faker.lorem.words(10),
            image: faker.image.imageUrl(200, 200, '', true),
            price: Math.floor(Math.random() * 90) + 10
        })
    }

    process.exit()
  })();