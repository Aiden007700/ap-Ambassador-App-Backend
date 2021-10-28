import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register(body: RegisterDto) {
        const {passwordConfirm, ...data} = body
        if(data.password !== passwordConfirm) {
          throw new BadRequestException('Passwords do not match!')
        }
        const hash = await bcrypt.hash(data.password, 12)
        
        return await this.userService.save({
            ...data,
          password: hash,
          isAmbassador: false
        })
      }

      async login(
        email: string,
        password: string,
        response: Response
      ) {
        const user = await this.userService.findOne({email})
        if (!user) {
          throw new NotFoundException('user not found')
        }
    
        if (! await bcrypt.compare(password, user.password)) {
          throw new BadRequestException('Invalid Credentials')
        }
    
        const jwt = await this.jwtService.signAsync({
          id: user.id,
    
        })
    
        response.cookie('jwt', jwt, {httpOnly: true})
    
        return {
          message: 'sucsess'
        }
      }

      async user(request: Request) {
        const cookie = request.cookies['jwt']
    
        const {id} = await this.jwtService.verifyAsync(cookie)
        const user = await this.userService.findOne({id})
    
        return user
      }
    
      async updateInfo(
        request: Request,
        firstName: string,
        lastName: string,
        email: string,
        ) {
        return await this.updateInfo(request, firstName, lastName,email)
      }
}
