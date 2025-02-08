// src/infrastructure/interfaces/controllers/warranty.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { CreateWarrantyUseCase } from 'src/application/use-cases/create-warranty.use-case';
import { GetWarrantyHistoryUseCase } from 'src/application/use-cases/get-warranty-history.use-case';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateWarrantyDto } from 'src/application/dto/create-warranty.dto';

@Controller('warranties')
@UseGuards(JwtAuthGuard)
export class WarrantyController {
  constructor(
    private readonly createWarrantyUseCase: CreateWarrantyUseCase,
    private readonly getWarrantyHistoryUseCase: GetWarrantyHistoryUseCase,
  ) {}

  @Post()
  async create(@Request() req, @Body() data: CreateWarrantyDto) {
    return this.createWarrantyUseCase.execute(data);
  }

  @Get('vehicle/:vehicleId')
  async getHistory(@Param('vehicleId') vehicleId: string) {
    return this.getWarrantyHistoryUseCase.execute(vehicleId);
  }
}
