import { Injectable, Inject } from '@nestjs/common';
import { IntervalDefinitionRepository } from '../../infrastructure/repositories/interval-definition.repository';

@Injectable()
export class DeleteIntervalDefinitionUseCase {
  constructor(
    @Inject('CustomIntervalDefinitionRepository')
    private readonly repository: IntervalDefinitionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
