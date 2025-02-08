import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { email: string, password: string, role: string, isAdmin: boolean }) {
    return this.userService.create(body.email, body.password, body.role, body.isAdmin);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}