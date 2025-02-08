export const CLIENT_REPOSITORY = "CLIENT_REPOSITORY";

export interface ClientRepository {
  findOne(id: string): Promise<any>;
}