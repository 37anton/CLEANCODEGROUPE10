import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PartRepository } from "../../repositories/part.repository";
import { Part } from "../../../domain/entities/part.entity";

@Injectable()
export class SqlPartRepository implements PartRepository {
  constructor(
    @InjectRepository(Part)
    private readonly repository: Repository<Part>,
  ) {}

  async create(part: Partial<Part>): Promise<Part> {
    const newPart = this.repository.create(part);
    return this.repository.save(newPart);
  }

  async findAll(): Promise<Part[]> {
    return this.repository.find();
  }
}
