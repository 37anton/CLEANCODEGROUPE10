import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateRepairUseCase } from 'src/application/use-cases/create-repair.use-case';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
@Controller('repairs')
@UseGuards(JwtAuthGuard)
export class RepairController {
  constructor(private readonly createRepairUseCase: CreateRepairUseCase) {}

  @Post()
  async create(@Body() data: any) {
    // On suppose que data contient data.incident (l'objet incident ou au moins son id) et d'autres champs
    return this.createRepairUseCase.execute(data);
  }
}
