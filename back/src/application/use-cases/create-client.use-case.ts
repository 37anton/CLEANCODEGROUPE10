import { Injectable, Inject } from '@nestjs/common';
import { Client } from '../../domain/entities/client.entity';
import { ClientRepository, CLIENT_REPOSITORY } from 'src/infrastructure/repositories/client.repository';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(clientData: { name: string }): Promise<Client> {
    const client = new Client();
    client.name = clientData.name;
    return await this.clientRepository.createClient(client);
  }
}