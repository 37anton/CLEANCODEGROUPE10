// src/infrastructure/interfaces/controllers/maintenance.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { CreateMaintenanceUseCase } from 'src/application/use-cases/create-maintenance.use-case';
import { GetMaintenanceHistoryUseCase } from 'src/application/use-cases/get-maintenance-history.use-case';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateMaintenanceDto } from 'src/application/dto/create-maintenance.dto';

@Controller('maintenances')
export class MaintenanceController {
  constructor(
    private readonly createMaintenanceUseCase: CreateMaintenanceUseCase,
    private readonly getMaintenanceHistoryUseCase: GetMaintenanceHistoryUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() maintenanceData: CreateMaintenanceDto) {
    // Injecter l'ID de l'utilisateur connecté dans le DTO
    maintenanceData.userId = req.user.id;
    return this.createMaintenanceUseCase.execute(maintenanceData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('vehicle/:vehicleId')
  async getHistory(@Param('vehicleId') vehicleId: string) {
    return this.getMaintenanceHistoryUseCase.execute(vehicleId);
  }
}
