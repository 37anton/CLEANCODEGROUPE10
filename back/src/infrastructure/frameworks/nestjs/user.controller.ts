import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../../../application/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { email: string, password: string, role: string }) {
    return this.userService.create(body.email, body.password, body.role);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}