import { Injectable, Inject } from '@nestjs/common';
import { Concession } from '../../domain/entities/concession.entity';
import { ConcessionRepository, CONCESSION_REPOSITORY } from '../../infrastructure/repositories/concession.repository';

@Injectable()
export class CreateConcessionUseCase {
  constructor(
    @Inject(CONCESSION_REPOSITORY)
    private readonly concessionRepository: ConcessionRepository,
  ) {}

  async execute(concessionData: { name: string }): Promise<Concession> {
    const concession = new Concession();
    concession.name = concessionData.name;
    return await this.concessionRepository.createConcession(concession);
  }
}