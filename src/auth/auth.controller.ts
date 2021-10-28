import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, Res, Req, UseInterceptors, ClassSerializerInterceptor, ForbiddenException, UseGuards, Put } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {}

  @Post('/admin/register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body)
  }

  @Post('/admin/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
  ) {
    return await this.authService.login(email, password, response)
  }

  @Get('/admin/user') 
  @UseGuards(AuthGuard)
  async user(@Req() request: Request) {
    return await this.user(request)
  }

  @Post('/admin/logout')
  @UseGuards(AuthGuard)
  async logout (@Res({passthrough: true}) responce: Response) {
    responce.clearCookie('jwt')

    return {
      message: 'sucsess'
    }
  }

  @Put('/admin/user/info')
  @UseGuards(AuthGuard)
  async updateInfo(
    @Req() request: Request,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    ) {
   return await this.authService.updateInfo(request ,firstName, lastName, email)
  }

  async updatePassword(
    request: Request,
    password: string,
    passwordConfirm: string,
    ) {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match!')
    }

    const cookie = request.cookies['jwt']
    const {id} = await this.jwtService.verifyAsync(cookie)
    const hash = await bcrypt.hash(password, 12)

    await this.userService.update(id, {password: hash})
    return await this.userService.findOne(id)
  }
}
