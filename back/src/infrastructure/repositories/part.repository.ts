export const PART_REPOSITORY = 'PART_REPOSITORY';

export interface PartRepository {
  create(name: string): Promise<any>;
  findAll(): Promise<any>;
}