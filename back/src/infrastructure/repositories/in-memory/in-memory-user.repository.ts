// src/infrastructure/repositories/in-memory/in-memory-user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import * as crypto from 'crypto'; // pour randomUUID

@Injectable()
export class InMemoryUserRepository {
  private users: User[] = [];

  async create(userData: Partial<User>): Promise<User> {
    const newUser = new User();
    newUser.id = crypto.randomUUID();

    // Gérer les champs obligatoires
    newUser.email = userData.email ?? '';  // ou lancer une erreur si email manquant
    newUser.password = userData.password ?? '';
    newUser.role = userData.role ?? 'client';
    newUser.isAdmin = userData.isAdmin ?? false;
    // On peut stocker directement l'objet Company/Client/Concession
    newUser.company = userData.company ?? null;
    newUser.client = userData.client ?? null;
    newUser.concession = userData.concession ?? null;

    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async findAllByCompanyId(companyId: string): Promise<User[]> {
    return this.users.filter(u => 
      // Vérifier que u.company existe et a un .id = companyId
      u.company && u.company.id === companyId
    );
  }

  async findAllByClientId(clientId: string): Promise<User[]> {
    return this.users.filter(u => 
      u.client && u.client.id === clientId
    );
  }

  async findAllByConcessionId(concessionId: string): Promise<User[]> {
    return this.users.filter(u => 
      u.concession && u.concession.id === concessionId
    );
  }
}
