// sql-clien-moto.repo.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientMotorcycle } from '../../../domain/entities/client-motorcycle.entity';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';

@Injectable()
export class SQLClientMotorcycleRepository {
  constructor(
    @InjectRepository(ClientMotorcycle)
    private readonly repository: Repository<ClientMotorcycle>,
  ) {}

  async create(cm: ClientMotorcycle): Promise<ClientMotorcycle> {
    return this.repository.save(cm);
  }

  async findAllByClientId(clientId: string): Promise<Motorcycle[]> {
    const clientMotorcycles = await this.repository.find({
      where: { client: { id: clientId } },
      relations: ['motorcycle'],
    });
    return clientMotorcycles.map(cm => cm.motorcycle);
  }

  // company-motorcycle.repository.ts (SQL)
async findOneByMotorcycleAndCompany(motorcycleId: string, clientId: string): Promise<ClientMotorcycle | null> {
  return this.repository.findOne({
    where: {
      motorcycle: { id: motorcycleId },
      client: { id: clientId },
    },
    relations: ['motorcycle', 'company'],
  });
}
}
