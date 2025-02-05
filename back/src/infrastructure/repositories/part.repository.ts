export const PART_REPOSITORY = "PART_REPOSITORY";

import { Part } from "../../domain/entities/part.entity";

export interface PartRepository {
  create(part: Partial<Part>): Promise<Part>;
  findAll(): Promise<Part[]>;
}
