import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { CreateIncidentUseCase } from 'src/application/use-cases/create-incident.use-case';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { CreateIncidentDto } from 'src/application/dto/create-incident.dto';
import { GetIncidentHistoryUseCase } from 'src/application/use-cases/get-incident-history.use-case';

@Controller('incidents')
@UseGuards(JwtAuthGuard)
export class IncidentController {
  constructor(
    private readonly createIncidentUseCase: CreateIncidentUseCase,
    private readonly getIncidentHistoryUseCase: GetIncidentHistoryUseCase,

  ) {}

  @Post()
  async create(@Request() req, @Body() data: CreateIncidentDto) {
    return this.createIncidentUseCase.execute(data);
  }

  @Get('vehicle/:vehicleId')
  async getHistory(@Param('vehicleId') vehicleId: string) {
    return this.getIncidentHistoryUseCase.execute(vehicleId);
  }
}
