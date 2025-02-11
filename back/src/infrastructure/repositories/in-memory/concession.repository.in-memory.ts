import { Injectable } from "@nestjs/common";
import { Concession } from "../../../domain/entities/concession.entity";
import { ConcessionRepository } from "../concession.repository";

@Injectable()
export class ConcessionInMemoryRepository implements ConcessionRepository {
  private concessions: Concession[] = [];

  async findOne(id: string): Promise<Concession | null> {
    return this.concessions.find(concession => concession.id === id) || null;
  }

  async addConcession(concession: Concession): Promise<void> {
    this.concessions.push(concession);
  }

  async createConcession(concession: Concession): Promise<Concession> {
    this.concessions.push(concession);
    return concession;
  }
}