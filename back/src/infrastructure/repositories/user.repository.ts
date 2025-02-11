import { User } from "../../domain/entities/user.entity";

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  createUser(
    email: string, 
    password: string, 
    role: string, 
    isAdmin: boolean,
    associations?: { companyId?: string; concessionId?: string; clientId?: string }
  ): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findById(id: string, relations?: string[]): Promise<any>;
  findByEntity(entityId: string): Promise<any[]>;
  find(options: any): Promise<User[]>;
}