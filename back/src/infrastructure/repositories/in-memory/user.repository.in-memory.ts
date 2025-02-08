import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { Company } from 'src/domain/entities/company.entity';
import { Concession } from 'src/domain/entities/concession.entity';
import { Client } from 'src/domain/entities/client.entity';

@Injectable()
export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  async createUser(
    email: string, 
    password: string, 
    role: string, 
    isAdmin: boolean,
    associations?: { companyId?: string; concessionId?: string; clientId?: string }
  ): Promise<User> {
    const user = new User();
    user.id = Math.random().toString(36).substring(7);
    user.email = email;
    user.password = password;
    user.role = role;
    user.isAdmin = isAdmin;
    if (associations) {
      if (associations.companyId) {
        user.company = { id: associations.companyId } as Company;
      }
      if (associations.concessionId) {
        user.concession = { id: associations.concessionId } as Concession;
      }
      if (associations.clientId) {
        user.client = { id: associations.clientId } as Client;
      }
    }
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async findById(id: string, relations?: string[]): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByEntity(entityId: string): Promise<User[]> {
    return this.users.filter(
      (user) =>
        user.company?.id === entityId ||
        user.concession?.id === entityId ||
        user.client?.id === entityId
    );
  }

  async find(options: any): Promise<User[]> {
    if (options?.where?.company?.id) {
      return this.users.filter(user => user.company && user.company.id === options.where.company.id);
    }
    if (options?.where?.client?.id) {
      return this.users.filter(user => user.client && user.client.id === options.where.client.id);
    }
    return [];
  }
}
