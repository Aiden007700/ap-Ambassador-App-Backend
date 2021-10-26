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

  @Post('/admin/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
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

  @Get('/admin/user') 
  @UseGuards(AuthGuard)
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt']

    const {id} = await this.jwtService.verifyAsync(cookie)
    const user = await this.userService.findOne({id})

    return user
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
    const cookie = request.cookies['jwt']
    const {id} = await this.jwtService.verifyAsync(cookie)

    await this.userService.update(id, {firstName, lastName, email})
    return await this.userService.findOne(id)
  }

  @Put('/admin/user/info')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('passwordConfirm') passwordConfirm: string,
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
