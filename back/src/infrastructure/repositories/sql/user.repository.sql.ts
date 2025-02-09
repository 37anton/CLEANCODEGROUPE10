import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { Company } from 'src/domain/entities/company.entity';
import { Concession } from 'src/domain/entities/concession.entity';
import { Client } from 'src/domain/entities/client.entity';

@Injectable()
export class UserSqlRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    email: string, 
    password: string, 
    role: string, 
    isAdmin: boolean,
    associations?: { companyId?: string; concessionId?: string; clientId?: string }
  ): Promise<User> {
    const user = this.userRepository.create({ email, password, role, isAdmin });
    // Affecter les associations si présentes
    if (associations) {
      if (associations.companyId) {
        // Ici on peut créer un objet partiel Company
        user.company = { id: associations.companyId } as Company;
      }
      if (associations.concessionId) {
        user.concession = { id: associations.concessionId } as Concession;
      }
      if (associations.clientId) {
        user.client = { id: associations.clientId } as Client;
      }
    }
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string, relations?: string[]): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id }, relations });
  }

  async findByEntity(entityId: string): Promise<User[]> {
    return this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.company", "company")
      .leftJoinAndSelect("user.concession", "concession")
      .leftJoinAndSelect("user.client", "client")
      .where("company.id = :entityId OR concession.id = :entityId OR client.id = :entityId", { entityId })
      .getMany();
  }

  async findOneBy(options: any): Promise<User[]> {
    return await this.userRepository.find(options);
  }
  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
