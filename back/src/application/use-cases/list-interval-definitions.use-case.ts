import { Injectable, Inject } from '@nestjs/common';
import { IntervalDefinition } from '../../domain/entities/interval-definition.entity';
import { IntervalDefinitionRepository } from '../../infrastructure/repositories/interval-definition.repository';

@Injectable()
export class ListIntervalDefinitionsUseCase {
  constructor(
    @Inject('CustomIntervalDefinitionRepository')
    private readonly repository: IntervalDefinitionRepository,
  ) {}

  async execute(): Promise<IntervalDefinition[]> {
    return this.repository.findAll();
  }
}
