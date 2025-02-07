import { Controller, Post, Put, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CreateIntervalDefinitionUseCase } from 'src/application/use-cases/create-interval-definition.use-case';
import { UpdateIntervalDefinitionUseCase } from 'src/application/use-cases/update-interval-definition.use-case';
import { ListIntervalDefinitionsUseCase } from 'src/application/use-cases/list-interval-definitions.use-case';
import { DeleteIntervalDefinitionUseCase } from 'src/application/use-cases/delete-interval-definition.use-case';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('interval-definitions')
@UseGuards(JwtAuthGuard)
export class IntervalDefinitionController {
  constructor(
    private readonly createIntervalDefinitionUseCase: CreateIntervalDefinitionUseCase,
    private readonly updateIntervalDefinitionUseCase: UpdateIntervalDefinitionUseCase,
    private readonly listIntervalDefinitionsUseCase: ListIntervalDefinitionsUseCase,
    private readonly deleteIntervalDefinitionUseCase: DeleteIntervalDefinitionUseCase,
  ) {}

  @Post()
  async create(@Body() body: { model: string; km: number; timeInYears: number }) {
    return this.createIntervalDefinitionUseCase.execute(body.model, body.km, body.timeInYears);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { km: number; timeInYears: number }
  ) {
    return this.updateIntervalDefinitionUseCase.execute(id, body.km, body.timeInYears);
  }

  @Get()
  async list() {
    return this.listIntervalDefinitionsUseCase.execute();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteIntervalDefinitionUseCase.execute(id);
  }
}
