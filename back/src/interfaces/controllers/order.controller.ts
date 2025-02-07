import { Controller, Get, Request, UseGuards, Post, Body } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Request() req, @Body() createOrderDto: any) {
    return this.orderService.createOrder(req.user, createOrderDto);
  }
}
