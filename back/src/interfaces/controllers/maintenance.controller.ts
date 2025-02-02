// src/interfaces/controllers/maintenance.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { PlanMaintenanceUseCase } from '../../application/use-cases/plan-maintenance.use-case';
import { GetMaintenanceHistoryUseCase } from '../../application/use-cases/get-maintenance-history.use-case';
import { Maintenance } from '../../domain/entities/maintenance.entity';

@Controller('maintenance')
export class MaintenanceController {
  constructor(
    private readonly planMaintenanceUseCase: PlanMaintenanceUseCase,
    private readonly getMaintenanceHistoryUseCase: GetMaintenanceHistoryUseCase,
  ) {}

  // Endpoint pour planifier une maintenance
  @Post('plan')
  async planMaintenance(@Body() motorcycleData: Motorcycle): Promise<Maintenance> {
    return await this.planMaintenanceUseCase.execute(motorcycleData);
  }

  // Endpoint pour récupérer l'historique des maintenances réalisées (status COMPLETED)
  @Get('history/:vehicleId')
  async getMaintenanceHistory(@Param('vehicleId') vehicleId: string): Promise<Maintenance[]> {
    return await this.getMaintenanceHistoryUseCase.execute(vehicleId);
  }
}
