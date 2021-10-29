import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderItemService } from './orderItem.service';

@Controller('/admin/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService
    ) {}

  @Get()
  async all() {
    return await this.orderService.find()
  }
}
