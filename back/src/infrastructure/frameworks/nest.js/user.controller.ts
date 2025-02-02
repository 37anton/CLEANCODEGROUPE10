import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../../../../src/application/services/user.service';
import { RegisterDto } from '../../../modules/auth/dto/register.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}