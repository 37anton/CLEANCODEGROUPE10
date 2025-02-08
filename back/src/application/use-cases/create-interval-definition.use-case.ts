import { Injectable, Inject } from '@nestjs/common';
import { IntervalDefinition } from '../../domain/entities/interval-definition.entity';
import { INTERVAL_DEFINITION_REPOSITORY, IntervalDefinitionRepository } from '../../infrastructure/repositories/interval-definition.repository';
import * as crypto from 'crypto';

@Injectable()
export class CreateIntervalDefinitionUseCase {
  constructor(
    @Inject(INTERVAL_DEFINITION_REPOSITORY)
    private readonly repository: IntervalDefinitionRepository,
  ) {}

  async execute(model: string, km: number, timeInYears: number): Promise<IntervalDefinition> {
    const definition = new IntervalDefinition();
    definition.id = crypto.randomUUID();
    definition.model = model;
    definition.km = km;
    definition.timeInYears = timeInYears;
    return this.repository.create(definition);
  }
}
