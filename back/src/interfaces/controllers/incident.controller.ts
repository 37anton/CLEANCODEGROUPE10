// src/infrastructure/interfaces/controllers/incident.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateIncidentUseCase } from 'src/application/use-cases/create-incident.use-case';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateIncidentDto } from 'src/application/dto/create-incident.dto';

@Controller('incidents')
@UseGuards(JwtAuthGuard)
export class IncidentController {
  constructor(
    private readonly createIncidentUseCase: CreateIncidentUseCase,
  ) {}

  @Post()
  async create(@Request() req, @Body() data: CreateIncidentDto) {
    return this.createIncidentUseCase.execute(data);
  }
}
