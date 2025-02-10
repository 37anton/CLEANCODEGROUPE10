import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { CreateRepairUseCase } from '../../application/use-cases/create-repair.use-case';
import { GetRepairHistoryUseCase } from '../../application/use-cases/get-repair-history.use-case';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateRepairDto } from '../../application/dto/create-repair.dto';

@Controller('repairs')
@UseGuards(JwtAuthGuard)
export class RepairController {
  constructor(
    private readonly createRepairUseCase: CreateRepairUseCase,
    private readonly getRepairHistoryUseCase: GetRepairHistoryUseCase,
  ) {}

  @Post()
  async create(@Request() req, @Body() data: CreateRepairDto) {
    console.log('RepairController - données reçues:', data);
    data.userId = req.user.id;
    return this.createRepairUseCase.execute(data);
  }

  @Get('vehicle/:vehicleId')
  async getHistory(@Param('vehicleId') vehicleId: string) {
    return this.getRepairHistoryUseCase.execute(vehicleId);
  }
}
