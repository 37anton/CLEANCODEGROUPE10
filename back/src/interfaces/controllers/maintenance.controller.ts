import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { PlanMaintenanceUseCase } from '../../application/use-cases/plan-maintenance.use-case';
import { GetMaintenanceHistoryUseCase } from '../../application/use-cases/get-maintenance-history.use-case';
import { GetDueMaintenanceUseCase } from '../../application/use-cases/get-due-maintenance.use-case';
import { Maintenance } from '../../domain/entities/maintenance.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';

@Controller('maintenance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaintenanceController {
  constructor(
    private readonly planMaintenanceUseCase: PlanMaintenanceUseCase,
    private readonly getMaintenanceHistoryUseCase: GetMaintenanceHistoryUseCase,
    private readonly getDueMaintenanceUseCase: GetDueMaintenanceUseCase,
  ) {}

  @Post('plan')
  async planMaintenance(@Body() motorcycleData: Motorcycle): Promise<Maintenance> {
    return await this.planMaintenanceUseCase.execute(motorcycleData);
  }

  @Get('history/:vehicleId')
  async getMaintenanceHistory(@Param('vehicleId') vehicleId: string): Promise<Maintenance[]> {
    return await this.getMaintenanceHistoryUseCase.execute(vehicleId);
  }

  @Get('due/:vehicleId')
  async getDueMaintenance(@Param('vehicleId') vehicleId: string): Promise<Maintenance[]> {
    return await this.getDueMaintenanceUseCase.execute(vehicleId);
  }
}
