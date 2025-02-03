import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Part } from "../../domain/entities/part.entity";
import { CreatePartDto } from "../../application/dto/create-part.dto";

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>
  ) {}

  async create(createPartDto: CreatePartDto): Promise<Part> {
    const newPart = this.partRepository.create(createPartDto);
    return await this.partRepository.save(newPart);
  }

  async findAll(): Promise<Part[]> {
    return await this.partRepository.find();
  }
}