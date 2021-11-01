import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderItemService } from './orderItem.service';

@Controller('/admin/order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService
    ) {}

  @Get()
  async all() {
    return await this.orderService.find({
      relations: ['orderItem']
    })
  }
}
