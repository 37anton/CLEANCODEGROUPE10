import { Injectable, Inject } from "@nestjs/common";
import { PART_REPOSITORY, PartRepository } from "../../infrastructure/repositories/part.repository";
import { Part } from "../../domain/entities/part.entity";
import { CreatePartDto } from "../../application/dto/create-part.dto";

@Injectable()
export class PartService {
  constructor(
    @Inject(PART_REPOSITORY) private readonly partRepository: PartRepository
  ) {}

  async create(createPartDto: CreatePartDto): Promise<Part> {
    return this.partRepository.create(createPartDto);
  }

  async findAll(): Promise<Part[]> {
    return this.partRepository.findAll();
  }
}