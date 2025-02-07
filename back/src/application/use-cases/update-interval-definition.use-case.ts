import { Injectable, Inject } from '@nestjs/common';
import { IntervalDefinition } from '../../domain/entities/interval-definition.entity';
import { IntervalDefinitionRepository } from '../../infrastructure/repositories/interval-definition.repository';

@Injectable()
export class UpdateIntervalDefinitionUseCase {
  constructor(
    @Inject('CustomIntervalDefinitionRepository')
    private readonly repository: IntervalDefinitionRepository,
  ) {}

  async execute(id: string, km: number, timeInYears: number): Promise<IntervalDefinition> {
    const definition = await this.repository.findById(id);
    definition.km = km;
    definition.timeInYears = timeInYears;
    return this.repository.update(definition);
  }
}
