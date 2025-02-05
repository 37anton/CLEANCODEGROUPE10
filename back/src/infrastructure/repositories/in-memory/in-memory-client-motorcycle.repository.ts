import { Injectable } from '@nestjs/common';
import { ClientMotorcycle } from '../../../domain/entities/client-motorcycle.entity';
import { Motorcycle } from '../../../domain/entities/motorcycle.entity';

@Injectable()
export class InMemoryClientMotorcycleRepository {
  private clientMotorcycles: ClientMotorcycle[] = [];

  async create(cm: ClientMotorcycle): Promise<ClientMotorcycle> {
    this.clientMotorcycles.push(cm);
    return cm;
  }

  async findAllByClientId(clientId: string): Promise<Motorcycle[]> {
    const records = this.clientMotorcycles.filter(cm => cm.client.id === clientId);
    return records.map(cm => cm.motorcycle);
  }

  async findOneByMotorcycleAndClient(motorcycleId: string, clientId: string): Promise<ClientMotorcycle | null> {
    const record = this.clientMotorcycles.find(cm => cm.motorcycle.id === motorcycleId && cm.client.id === clientId);
    return record || null;
  }
}
