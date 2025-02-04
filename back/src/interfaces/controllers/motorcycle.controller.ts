// src/interfaces/controllers/motorcycle.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { CreateMotorcycleUseCase } from '../../application/use-cases/create-motorcycle.use-case';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ListMotorcyclesUseCase } from '../../application/use-cases/list-motorcycles.use-case';
import { RolesGuard } from '../../auth/roles.guard';
import { Request } from 'express';
import { UpdateMotorcycleUseCase } from '../../application/use-cases/update-motorcycle.use-case';

@Controller('motorcycle')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MotorcycleController {
  constructor(
    private readonly createMotorcycleUseCase: CreateMotorcycleUseCase,
    private readonly listMotorcyclesUseCase: ListMotorcyclesUseCase,
    private readonly updateMotorcycleUseCase: UpdateMotorcycleUseCase, // ADDED
  ) {}

  @Post('create')
  async createMotorcycle(
    @Body() motorcycleData: Omit<Motorcycle, 'id'>,
    @Req() req: Request,
  ): Promise<Motorcycle> {
    const user = req.user as any;
    return this.createMotorcycleUseCase.execute(motorcycleData, user);
  }

  @Get('all')
  async getMotorcycles(@Req() req: Request): Promise<Motorcycle[]> {
    const user = req.user as any;
    return this.listMotorcyclesUseCase.execute(user);
  }

  // ADDED
  @Patch(':id')
  async updateMotorcycle(
    @Param('id') motorcycleId: string,
    @Body() updateData: Partial<Motorcycle>,
    @Req() req: Request,
  ): Promise<Motorcycle> {
    const user = req.user as any;
    return this.updateMotorcycleUseCase.execute(user, motorcycleId, updateData);
  }
}
