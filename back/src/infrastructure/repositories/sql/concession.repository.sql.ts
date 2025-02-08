import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Concession } from "../../../domain/entities/concession.entity";
import { ConcessionRepository } from "../concession.repository";

@Injectable()
export class ConcessionSqlRepository implements ConcessionRepository {
  constructor(
    @InjectRepository(Concession)
    private readonly concessionRepository: Repository<Concession>
  ) {}

  async findOne(id: string): Promise<Concession | null> {
    return this.concessionRepository.findOne({ where: { id } });
  }

  async createConcession(concession: Concession): Promise<Concession> {
    return this.concessionRepository.save(concession);
  }
}