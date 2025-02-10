import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { CreateMotorcycleUseCase } from '../use-cases/create-motorcycle.use-case';
import { GetMotorcyclesUseCase } from '../use-cases/get-motorcycles.use-case';
import { UpdateMotorcycleUseCase } from '../use-cases/update-motorcycle.use-case';
import { DeleteMotorcycleUseCase } from '../use-cases/delete-motorcycle.use-case';
import { SetMotorcycleIntervalUseCase } from '../use-cases/set-motorcycle-interval.use-case';
import { GetMaintenancePlanUseCase } from '../use-cases/get-maintenance-plan.use-case';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('motorcycles')
export class MotorcycleController {
  constructor(
    private readonly createMotorcycleUseCase: CreateMotorcycleUseCase,
    private readonly getMotorcyclesUseCase: GetMotorcyclesUseCase,
    private readonly updateMotorcycleUseCase: UpdateMotorcycleUseCase,
    private readonly deleteMotorcycleUseCase: DeleteMotorcycleUseCase,
    private readonly setMotorcycleIntervalUseCase: SetMotorcycleIntervalUseCase,
    private readonly getMaintenancePlanUseCase: GetMaintenancePlanUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createMotorcycle(
    @Body() motorcycleData: Omit<Motorcycle, 'id'>,
    @Req() req: Request,
  ): Promise<Motorcycle> {
    const user = req.user as any;
    const motorcycle = await this.createMotorcycleUseCase.execute(motorcycleData, user);

    await this.setMotorcycleIntervalUseCase.execute(motorcycle.id);

    return motorcycle;
  }    

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMotorcycles(@Req() req: Request) {
    const user = req.user;
    return this.getMotorcyclesUseCase.execute(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMotorcycle(@Param('id') id: string): Promise<Motorcycle> {
    const motorcycle = await this.getMotorcyclesUseCase.findById(id);
    
    if (!motorcycle) {
      throw new NotFoundException(`Moto avec l'ID ${id} non trouvée.`);
    }

    return motorcycle;
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
    return { message: 'Moto supprimée avec succès' };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/maintenance-plan')
  async getMaintenancePlan(@Param('id') id: string) {
    return this.getMaintenancePlanUseCase.execute(id);
  }
}
