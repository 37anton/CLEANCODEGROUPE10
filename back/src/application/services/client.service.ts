import { Injectable } from '@nestjs/common';
import { CreateClientUseCase } from '../use-cases/create-client.use-case';
import { Client } from 'src/domain/entities/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly createClientUseCalse: CreateClientUseCase) {}

  async createClient(clientData: { name: string }): Promise<Client> {
    return await this.createClientUseCalse.execute(clientData);
  }
}