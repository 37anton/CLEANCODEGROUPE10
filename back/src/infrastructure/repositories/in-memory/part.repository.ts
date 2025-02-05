import { Injectable } from "@nestjs/common";
import { PartRepository } from "../../../infrastructure/repositories/part.repository";
import { Part } from "../../../domain/entities/part.entity";

@Injectable()
export class InMemoryPartRepository implements PartRepository {
  private parts: Part[] = [];

  async create(part: Partial<Part>): Promise<Part> {
    const newPart = new Part();
    Object.assign(newPart, part);
    newPart.id = (Math.random() * 1000000).toFixed(0); // ID fictif pour in-memory
    this.parts.push(newPart);
    return newPart;
  }

  async findAll(): Promise<Part[]> {
    return this.parts;
  }
}