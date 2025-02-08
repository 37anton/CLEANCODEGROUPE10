import { Injectable, Inject } from '@nestjs/common';
import { Motorcycle } from '../../domain/entities/motorcycle.entity';
import { Interval } from '../../domain/entities/interval.entity';
import { IntervalRepository } from '../../infrastructure/repositories/interval.repository';
import { IntervalDefinitionRepository } from '../../infrastructure/repositories/interval-definition.repository';
import { MotorcycleRepository } from '../../infrastructure/repositories/motorcycle.repository';
import * as crypto from 'crypto';

@Injectable()
export class SetMotorcycleIntervalUseCase {
  constructor(
    @Inject('CustomMotorcycleRepository')
    private readonly motorcycleRepository: MotorcycleRepository,
    @Inject('CustomIntervalRepository')
    private readonly intervalRepository: IntervalRepository,
    @Inject('CustomIntervalDefinitionRepository')
    private readonly intervalDefinitionRepository: IntervalDefinitionRepository,
  ) {}

  async execute(motorcycleId: string): Promise<Interval> {
    const motorcycle: Motorcycle = await this.motorcycleRepository.findById(motorcycleId);
    
    const definition = await this.intervalDefinitionRepository.findByModel(motorcycle.model);
    if (!definition) {
      throw new Error(`Aucune définition d'intervalle trouvée pour le modèle ${motorcycle.model}`);
    }

    const interval = new Interval();
    interval.id = crypto.randomUUID();
    interval.km = definition.km;
    interval.timeInYears = definition.timeInYears;
    interval.motorcycle = motorcycle;

    return this.intervalRepository.create(interval);
  }
}
