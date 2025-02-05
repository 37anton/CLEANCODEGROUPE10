// src/infrastructure/interfaces/controllers/motorcycle.controller.ts
import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { CreateMotorcycleUseCase } from 'src/application/use-cases/create-motorcycle.use-case';
import { GetMotorcyclesUseCase } from 'src/application/use-cases/get-motorcycles.use-case';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('motorcycles')
export class MotorcycleController {
  constructor(
    private readonly createMotorcycleUseCase: CreateMotorcycleUseCase,
    private readonly getMotorcyclesUseCase: GetMotorcyclesUseCase,
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
  async getMotorcycles(@Req() req) {
    const user = req.user;
    return this.getMotorcyclesUseCase.execute(user);
  }
}
