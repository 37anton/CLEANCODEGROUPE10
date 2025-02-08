import { Injectable, Inject } from '@nestjs/common';
import { IntervalDefinition } from '../../domain/entities/interval-definition.entity';
import { INTERVAL_DEFINITION_REPOSITORY, IntervalDefinitionRepository } from '../../infrastructure/repositories/interval-definition.repository';

@Injectable()
export class ListIntervalDefinitionsUseCase {
  constructor(
    @Inject(INTERVAL_DEFINITION_REPOSITORY)
    private readonly repository: IntervalDefinitionRepository,
  ) {}

  async execute(): Promise<IntervalDefinition[]> {
    return this.repository.findAll();
  }
}
