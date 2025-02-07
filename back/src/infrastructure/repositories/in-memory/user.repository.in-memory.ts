import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  async createUser(email: string, password: string, role: string): Promise<User> {
    const user = new User();
    user.id = Math.random().toString(36).substring(7);
    user.email = email;
    user.password = password;
    user.role = role;
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async findById(id: string, relations?: string[]): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
}
