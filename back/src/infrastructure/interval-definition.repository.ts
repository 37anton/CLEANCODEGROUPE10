import { IntervalDefinition } from "src/domain/entities/interval-definition.entity";

export interface IntervalDefinitionRepository {
  create(intervalDefinition: IntervalDefinition): Promise<IntervalDefinition>;
  update(intervalDefinition: IntervalDefinition): Promise<IntervalDefinition>;
  findById(id: string): Promise<IntervalDefinition>;
  findByModel(model: string): Promise<IntervalDefinition | null>;
  findAll(): Promise<IntervalDefinition[]>;
  delete(id: string): Promise<void>;
}
