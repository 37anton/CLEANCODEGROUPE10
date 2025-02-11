import { Injectable } from '@nestjs/common';
import { CreateConcessionUseCase } from '../use-cases/create-concession.use-case';
import { Concession } from '../../domain/entities/concession.entity';

@Injectable()
export class ConcessionService {
  constructor(private readonly createConcessionUseCase: CreateConcessionUseCase) {}

  async createConcession(concessionData: { name: string }): Promise<Concession> {
    return await this.createConcessionUseCase.execute(concessionData);
  }
}