// src/infrastructure/repositories/sql/sql-user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class SQLUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    // Crée une instance de User
    const user = this.userRepository.create({
      email: userData.email ?? '',       // ou gérez les champs obligatoires
      password: userData.password ?? '',
      role: userData.role ?? 'client',
      isAdmin: userData.isAdmin ?? false,
      company: userData.company,         // on stocke l'objet Company si vous l'avez
      client: userData.client,
      concession: userData.concession,
    });
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ 
      where: { email },
      relations: ['company', 'client', 'concession'], // si vous avez besoin
    });
  }

  // Trouver tous les users d’une company
  async findAllByCompanyId(companyId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { company: { id: companyId } },
      relations: ['company', 'client', 'concession'],
    });
  }

  // Trouver tous les users d’un client
  async findAllByClientId(clientId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { client: { id: clientId } },
      relations: ['company', 'client', 'concession'],
    });
  }

  // Trouver tous les users d’une concession
  async findAllByConcessionId(concessionId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { concession: { id: concessionId } },
      relations: ['company', 'client', 'concession'],
    });
  }
}
