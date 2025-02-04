// src/interfaces/controllers/incident.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReportIncidentUseCase } from '../../application/use-cases/report-incident.use-case';
import { GetIncidentHistoryUseCase } from '../../application/use-cases/get-incident-history.use-case';
import { Incident } from '../../domain/entities/incident.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Controller('incident')
export class IncidentController {
  constructor(
    private readonly reportIncidentUseCase: ReportIncidentUseCase,
    private readonly getIncidentHistoryUseCase: GetIncidentHistoryUseCase,
  ) {}

  @Post('report')
  async reportIncident(
    @Body() body: { motorcycle: Motorcycle; description: string }
  ): Promise<Incident> {
    return await this.reportIncidentUseCase.execute(body.motorcycle, body.description);
  }

  @Get('history/:vehicleId')
  async getIncidentHistory(@Param('vehicleId') vehicleId: string): Promise<Incident[]> {
    return await this.getIncidentHistoryUseCase.execute(vehicleId);
  }
}
