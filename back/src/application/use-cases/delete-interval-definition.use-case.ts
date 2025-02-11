import { Injectable, Inject } from '@nestjs/common';
import { INTERVAL_DEFINITION_REPOSITORY, IntervalDefinitionRepository } from '../../infrastructure/repositories/interval-definition.repository';

@Injectable()
export class DeleteIntervalDefinitionUseCase {
  constructor(
    @Inject(INTERVAL_DEFINITION_REPOSITORY)
    private readonly repository: IntervalDefinitionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
