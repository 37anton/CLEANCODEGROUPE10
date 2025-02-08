import { IntervalDefinition } from '../../domain/entities/interval-definition.entity';

export const INTERVAL_DEFINITION_REPOSITORY = 'INTERVAL_DEFINITION_REPOSITORY'

export interface IntervalDefinitionRepository {
  create(intervalDefinition: IntervalDefinition): Promise<IntervalDefinition>;
  update(intervalDefinition: IntervalDefinition): Promise<IntervalDefinition>;
  findById(id: string): Promise<IntervalDefinition>;
  findByModel(model: string): Promise<IntervalDefinition | null>;
  findAll(): Promise<IntervalDefinition[]>;
  delete(id: string): Promise<void>;
}
