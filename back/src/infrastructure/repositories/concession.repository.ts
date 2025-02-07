export const CONCESSION_REPOSITORY = "CONCESSION_REPOSITORY";

export interface ConcessionRepository {
  findOne(id: string): Promise<any>;
}