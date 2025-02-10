import { Injectable } from '@nestjs/common';
import { Client } from '../../../domain/entities/client.entity';
import { ClientRepository } from '../client.repository';

@Injectable()
export class ClientInMemoryRepository implements ClientRepository {
  private clients: Client[] = [];

  async findOne(id: string): Promise<Client | null> {
    return this.clients.find(client => client.id === id) || null;
  }

  async create(client: Client): Promise<Client> {
    this.clients.push(client);
    return client;
  }

}