import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Entretien } from '../../domain/entities/entretien.entity';

@Injectable()
export class SqlEntretienRepository {
  constructor(
    @InjectRepository(Entretien)
    private readonly entretienRepository: Repository<Entretien>,
  ) {}

  async save(entretien: Entretien): Promise<Entretien> {
    return this.entretienRepository.save(entretien);
  }

  async findByMotoId(motoId: string): Promise<Entretien[]> {
    return this.entretienRepository.find({ where: { motoId } });
  }
}
