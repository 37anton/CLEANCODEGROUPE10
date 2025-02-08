import { Concession } from "../../domain/entities/concession.entity";

export const CONCESSION_REPOSITORY = "CONCESSION_REPOSITORY";

export interface ConcessionRepository {
  findOne(id: string): Promise<any>;
  createConcession(concession: Concession): Promise<Concession>;
}