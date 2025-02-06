import { Injectable } from '@nestjs/common';
import { Part } from '../../../domain/entities/part.entity';
import { PartRepository } from '../part.repository';

@Injectable()
export class PartInMemoryRepository implements PartRepository {
  private parts: Part[] = [];

  async create(name: string): Promise<Part> {
    const part = new Part();
    part.id = Math.random().toString(36).substring(7);
    part.name = name;
    this.parts.push(part);
    return part;
  }

  async findAll(): Promise<Part[]> {
    return this.parts;
  }
}