import { Injectable } from '@nestjs/common';
import { CreatePartUseCase } from '../use-cases/create-part.use-case';
import { FindPartsUseCase } from '../use-cases/find-parts.use-case';

@Injectable()
export class PartService {
  constructor(
    private readonly createPartUseCase: CreatePartUseCase,
    private readonly findPartsUseCase: FindPartsUseCase,
  ) {}

  async create(name: string) {
    return await this.createPartUseCase.execute(name);
  }

  async findAll() {
    return await this.findPartsUseCase.execute();
  }
}