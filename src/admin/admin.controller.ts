import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AdminService } from './admin.service';
import { RegisterDto } from './dto/register.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService
    ) {}

  @Post('/register')
  register(@Body() body: RegisterDto) {
    if(body.password !== body.passwordConfirm) {
      throw new BadRequestException('Passwords do not match!')
    }
    return body
  }
}
