import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  async createUser(email: string, password: string, role: string, isAdmin: boolean): Promise<User> {
    const user = new User();
    user.id = Math.random().toString(36).substring(7);
    user.email = email;
    user.password = password;
    user.role = role;
    user.isAdmin = isAdmin;
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
}
