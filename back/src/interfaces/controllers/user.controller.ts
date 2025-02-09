import { Controller, Post, Body, Get, Put, UseGuards, Param } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { FindUsersUseCase } from '../../application/use-cases/find-users.use-case';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly findUsersUseCase: FindUsersUseCase
  ) {}
  @Post()
  async create(@Body() body: { email: string, password: string, role: string, isAdmin: boolean }) {
    return this.userService.create(body.email, body.password, body.role, body.isAdmin);
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAllUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: { email: string; role: string; isAdmin: boolean }
  ) {
    return this.userService.update(id, updateUserDto);
}
  
}