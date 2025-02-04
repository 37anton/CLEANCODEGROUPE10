import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { OrderService } from '../../../application/services/order.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Request() req) {
    const user = req.user;
    return this.orderService.getOrdersByUser(req.user);
  }
}
