// src/interfaces/controllers/warranty.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReportWarrantyUseCase } from '../../application/use-cases/report-warranty.use-case';
import { GetWarrantyHistoryUseCase } from '../../application/use-cases/get-warranty-history.use-case';
import { Warranty } from '../../domain/entities/warranty.entity';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';

@Controller('warranty')
export class WarrantyController {
  constructor(
    private readonly reportWarrantyUseCase: ReportWarrantyUseCase,
    private readonly getWarrantyHistoryUseCase: GetWarrantyHistoryUseCase,
  ) {}

  @Post('report')
  async reportWarranty(
    @Body() body: { motorcycle: Motorcycle; startDate: string; endDate: string }
  ): Promise<Warranty> {
    return await this.reportWarrantyUseCase.execute(
      body.motorcycle,
      new Date(body.startDate),
      new Date(body.endDate)
    );
  }

  @Get('history/:vehicleId')
  async getWarrantyHistory(@Param('vehicleId') vehicleId: string): Promise<Warranty[]> {
    return await this.getWarrantyHistoryUseCase.execute(vehicleId);
  }
}
