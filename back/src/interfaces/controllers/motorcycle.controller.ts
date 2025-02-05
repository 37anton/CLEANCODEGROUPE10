import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CreateMotorcycleUseCase } from '../../application/use-cases/create-motorcycle.use-case';
import { GetMotorcyclesUseCase } from '../../application/use-cases/get-motorcycles.use-case';
import { UpdateMotorcycleUseCase } from '../../application/use-cases/update-motorcycle.use-case';
import { DeleteMotorcycleUseCase } from '../../application/use-cases/delete-motorcycle.use-case';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('motorcycles')
export class MotorcycleController {
  constructor(
    private readonly createMotorcycleUseCase: CreateMotorcycleUseCase,
    private readonly getMotorcyclesUseCase: GetMotorcyclesUseCase,
    private readonly updateMotorcycleUseCase: UpdateMotorcycleUseCase,
    private readonly deleteMotorcycleUseCase: DeleteMotorcycleUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createMotorcycle(
    @Body() motorcycleData: Omit<Motorcycle, 'id'>,
    @Req() req: Request,
  ): Promise<Motorcycle> {
    const user = req.user as any;
    return this.createMotorcycleUseCase.execute(motorcycleData, user);
  }    

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMotorcycles(@Req() req: Request) {
    const user = req.user;
    return this.getMotorcyclesUseCase.execute(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateMotorcycle(
    @Param('id') id: string,
    @Body() updateData: Partial<Omit<Motorcycle, 'id'>>,
    @Req() req: Request,
  ): Promise<Motorcycle> {
    const user = req.user as any;
    return this.updateMotorcycleUseCase.execute(id, updateData, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMotorcycle(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    const user = req.user as any;
    await this.deleteMotorcycleUseCase.execute(id, user);
    return { message: 'Motorcycle deleted successfully' };
  }
}
