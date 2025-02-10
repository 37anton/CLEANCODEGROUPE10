import { Controller, Get, Request, UseGuards, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { UserService } from 'src/application/services/user.service';


@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService
  ) {}

  @Get()
  async getOrders(@Request() req) {
    console.log("ID utilisateur reçu dans la requête :", req.user.id);
    const user = await this.userService.findById(req.user.id, ['company', 'concession', 'client']);
    return this.orderService.findOrders(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Request() req, @Body() createOrderDto: any) {
    return this.orderService.createOrder(req.user, createOrderDto);
  }
}
