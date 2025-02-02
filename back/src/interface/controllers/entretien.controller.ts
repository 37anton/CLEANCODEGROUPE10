import { Controller, Post, Body } from '@nestjs/common';
import { PlanifierEntretienUseCase } from '../../application/use-cases/planifier-entretien.use-case';
import { Moto } from '../../domain/entities/moto.entity';

@Controller('entretiens')
export class EntretienController {
  constructor(
    private readonly planifierEntretienUseCase: PlanifierEntretienUseCase,
  ) {}

  @Post('planifier')
  planifierEntretien(@Body() moto: Moto) {
    return this.planifierEntretienUseCase.execute(moto);
  }
}
