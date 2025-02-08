import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserSqlRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string, role: string, isAdmin: boolean): Promise<User> {
    const user = this.userRepository.create({ email, password, role, isAdmin });
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
  
}
