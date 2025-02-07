import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(@Request() req) {
    return this.orderService.getOrdersByUser(req.user.id);
  }
}
