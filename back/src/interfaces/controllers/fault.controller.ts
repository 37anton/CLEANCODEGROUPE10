// src/interfaces/controllers/fault.controller.ts
import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ReportFaultUseCase } from '../../application/use-cases/report-fault.use-case';
import { UpdateFaultRepairUseCase } from '../../application/use-cases/update-fault-repair.use-case';
import { GetFaultHistoryUseCase } from '../../application/use-cases/get-fault-history.use-case';
import { Fault } from '../../domain/entities/fault.entity';

@Controller('fault')
export class FaultController {
  constructor(
    private readonly reportFaultUseCase: ReportFaultUseCase,
    private readonly updateFaultRepairUseCase: UpdateFaultRepairUseCase,
    private readonly getFaultHistoryUseCase: GetFaultHistoryUseCase,
  ) {}

  // Endpoint pour signaler (report) une panne ou un problème de garantie
  @Post('report')
  async reportFault(@Body() faultData: Partial<Fault>): Promise<Fault> {
    return await this.reportFaultUseCase.execute(faultData);
  }

  // Endpoint pour mettre à jour les détails de réparation d'une panne
  @Put('update/:id')
  async updateFault(@Param('id') id: string, @Body() updateData: Partial<Fault>): Promise<Fault> {
    return await this.updateFaultRepairUseCase.execute(id, updateData);
  }

  // Endpoint pour récupérer l'historique des pannes/garanties pour un véhicule
  @Get('history/:vehicleId')
  async getFaultHistory(@Param('vehicleId') vehicleId: string): Promise<Fault[]> {
    return await this.getFaultHistoryUseCase.execute(vehicleId);
  }
}
