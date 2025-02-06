import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CreateIncidentUseCase } from 'src/application/use-cases/create-incident.use-case';
import { GetIncidentHistoryUseCase } from 'src/application/use-cases/get-incident-history.use-case';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('incidents')
@UseGuards(JwtAuthGuard)
export class IncidentController {
  constructor(
    private readonly createIncidentUseCase: CreateIncidentUseCase,
    private readonly getIncidentHistoryUseCase: GetIncidentHistoryUseCase,
  ) {}

  @Post()
  async create(@Body() data: any) {
    // On suppose que le corps de la requête contient
    // data.incidentDate, data.description, et data.motorcycle (l'objet moto ou au moins son id)
    return this.createIncidentUseCase.execute(data);
  }

  @Get('vehicle/:vehicleId')
  async getHistory(@Param('vehicleId') vehicleId: string) {
    return this.getIncidentHistoryUseCase.execute(vehicleId);
  }
}
