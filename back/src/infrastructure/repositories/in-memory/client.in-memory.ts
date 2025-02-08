import { Injectable } from '@nestjs/common';
import { Client } from '../../../domain/entities/client.entity';
import { ClientRepository } from '../client.repository';

@Injectable()
export class ClientInMemoryRepository implements ClientRepository {
  private clients: Client[] = [];

  async findOne(id: string): Promise<Client | null> {
    return this.clients.find(client => client.id === id) || null;
  }

  // Exemple de méthode pour ajouter un client en mémoire (selon vos besoins)
  async create(client: Client): Promise<Client> {
    // Vous pouvez générer un identifiant ou vous appuyer sur celui fourni par le client
    this.clients.push(client);
    return client;
  }

}