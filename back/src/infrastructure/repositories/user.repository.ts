export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  createUser(email: string, password: string, role: string, isAdmin: boolean): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findById(id: string, relations?: string[]): Promise<any>;
  findByEntity(entityId: string): Promise<any[]>;
}

export interface UserRepository {
  createUser(email: string, password: string, role: string, isAdmin: boolean): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findById(id: string, relations?: string[]): Promise<any>;
}
