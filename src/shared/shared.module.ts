import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
        secret: '123456789StoreMeInAEnv',
        signOptions: {expiresIn: '1d'}
      }),],
      exports: [JwtModule]
})
export class SharedModule {}
