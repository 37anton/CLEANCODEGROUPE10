export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  createUser(email: string, password: string, role: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
  findById(id: string, relations?: string[]): Promise<any>;
}
