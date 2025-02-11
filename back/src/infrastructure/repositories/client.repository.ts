import { Client } from "src/domain/entities/client.entity";

export const CLIENT_REPOSITORY = "CLIENT_REPOSITORY";

export interface ClientRepository {
  findOne(id: string): Promise<any>;
  createClient(client: Client): Promise<Client>;
}