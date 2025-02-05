import { Injectable } from '@nestjs/common';
import { IntervalDefinition } from '../../../domain/entities/interval-definition.entity';
import { IntervalDefinitionRepository } from '../interval-definition.repository';

@Injectable()
export class InMemoryIntervalDefinitionRepository implements IntervalDefinitionRepository {
  private definitions: IntervalDefinition[] = [];

  async create(intervalDefinition: IntervalDefinition): Promise<IntervalDefinition> {
    this.definitions.push(intervalDefinition);
    return intervalDefinition;
  }

  async update(intervalDefinition: IntervalDefinition): Promise<IntervalDefinition> {
    const index = this.definitions.findIndex(def => def.id === intervalDefinition.id);
    if (index === -1) throw new Error('Interval definition not found');
    this.definitions[index] = intervalDefinition;
    return intervalDefinition;
  }

  async findById(id: string): Promise<IntervalDefinition> {
    const definition = this.definitions.find(def => def.id === id);
    if (!definition) throw new Error('Interval definition not found');
    return definition;
  }

  async findByModel(model: string): Promise<IntervalDefinition | null> {
    const definition = this.definitions.find(def => def.model === model);
    return definition || null;
  }

  async findAll(): Promise<IntervalDefinition[]> {
    return this.definitions;
  }

  async delete(id: string): Promise<void> {
    this.definitions = this.definitions.filter(def => def.id !== id);
  }
}
