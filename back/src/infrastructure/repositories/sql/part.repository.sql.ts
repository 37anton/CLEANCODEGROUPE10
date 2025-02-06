import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from '../../../domain/entities/part.entity';
import { Injectable } from '@nestjs/common';
import { PartRepository } from '../part.repository';

@Injectable()
export class PartSqlRepository implements PartRepository {
  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
  ) {}

  async create(name: string): Promise<Part> {
    const newPart = this.partRepository.create({ name });
    return await this.partRepository.save(newPart);
  }

  async findAll(): Promise<Part[]> {
    return await this.partRepository.find();
  }
}