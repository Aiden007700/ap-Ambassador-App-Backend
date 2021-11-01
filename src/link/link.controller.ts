import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { LinkService } from './link.service';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('admin/users/:id/links')
  @UseGuards(AuthGuard)
  async all(@Param('id') id: number) {
    return await this.linkService.find({user: id, relations: ['order']})
  }
}
