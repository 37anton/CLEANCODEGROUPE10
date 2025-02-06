// src/infrastructure/interfaces/controllers/maintenance.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CreateMaintenanceUseCase } from 'src/application/use-cases/create-maintenance.use-case';
import { GetMaintenanceHistoryUseCase } from 'src/application/use-cases/get-maintenance-history.use-case';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('maintenances')
export class MaintenanceController {
  constructor(
    private readonly createMaintenanceUseCase: CreateMaintenanceUseCase,
    private readonly getMaintenanceHistoryUseCase: GetMaintenanceHistoryUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() maintenanceData: Partial<any>) {
    // Exécutez le use case pour créer un entretien
    return this.createMaintenanceUseCase.execute(maintenanceData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('vehicle/:vehicleId')
  async getHistory(@Param('vehicleId') vehicleId: string) {
    // Exécutez le use case pour récupérer l'historique des maintenances pour un véhicule
    return this.getMaintenanceHistoryUseCase.execute(vehicleId);
  }
}
