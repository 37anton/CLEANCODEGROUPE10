import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../../../domain/entities/client.entity";
import { ClientRepository } from "../client.repository";

@Injectable()
export class ClientSqlRepository implements ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}

  async findOne(id: string): Promise<Client | null> {
    return this.clientRepository.findOne({ where: { id } });
  }

  async createClient(client: Client): Promise<Client> {
    return this.clientRepository.save(client);
  }
}