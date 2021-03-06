import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin/ambassadors')
  @UseInterceptors(ClassSerializerInterceptor)
  async ambassadors() {
    return await this.userService.find({isAmbassador: true})
  }

}
