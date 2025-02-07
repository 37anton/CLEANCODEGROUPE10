import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntervalDefinition } from '../../../domain/entities/interval-definition.entity';
import { IntervalDefinitionRepository } from '../interval-definition.repository';

@Injectable()
export class SQLIntervalDefinitionRepository implements IntervalDefinitionRepository {
  constructor(
    @InjectRepository(IntervalDefinition)
    private readonly ormRepository: Repository<IntervalDefinition>,
  ) {}

  async create(intervalDefinition: IntervalDefinition): Promise<IntervalDefinition> {
    return this.ormRepository.save(intervalDefinition);
  }

  async update(intervalDefinition: IntervalDefinition): Promise<IntervalDefinition> {
    return this.ormRepository.save(intervalDefinition);
  }

  async findById(id: string): Promise<IntervalDefinition> {
    const definition = await this.ormRepository.findOne({ where: { id } });
    if (!definition) throw new Error('Interval definition not found');
    return definition;
  }

  async findByModel(model: string): Promise<IntervalDefinition | null> {
    return this.ormRepository.findOne({ where: { model } });
  }

  async findAll(): Promise<IntervalDefinition[]> {
    return this.ormRepository.find();
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
