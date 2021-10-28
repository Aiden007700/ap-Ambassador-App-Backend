import { NestFactory } from "@nestjs/core";
import * as faker from 'faker'
import * as bcrypt from 'bcryptjs'
import { UserService } from "../user/user.service";
import { AppModule } from "../app.module";



(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService = app.get(UserService)

    const password = await bcrypt.hash("1234", 12)

    for (let i = 0; i < 30; i++) {
        await userService.save({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            isAmbassador: true,
            password,
        })
    }

    process.exit()
  })();