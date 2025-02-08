import { INestApplication } from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { hash } from 'bcryptjs';
import { Company } from 'src/domain/entities/company.entity';
import { Concession } from 'src/domain/entities/concession.entity';

import { COMPANY_REPOSITORY } from 'src/infrastructure/repositories/company.repository';
import { CONCESSION_REPOSITORY } from 'src/infrastructure/repositories/concession.repository';

export async function loadFixtures(app?: INestApplication): Promise<void> {
  // Si une instance d'app est passée, on l'utilise, sinon on crée un contexte autonome
  const application = app || await (await import('@nestjs/core')).NestFactory.createApplicationContext(require('../../app.module').AppModule);

  const companyRepository = application.get(COMPANY_REPOSITORY);
  console.log("Chargement des companies...");

  const company1 = new Company();
  company1.name = "Company 1";
  const savedCompany1 = await companyRepository.createCompany(company1);
  console.log("Company 1 créée :", savedCompany1);

  const company2 = new Company();
  company2.name = "Company 2";
  const savedCompany2 = await companyRepository.createCompany(company2);
  console.log("Company 2 créée :", savedCompany2);

  // Récupérer le repository pour Concession et créer deux concessions
  const concessionRepository = application.get(CONCESSION_REPOSITORY);
  console.log("Chargement des concessions...");

  const concession1 = new Concession();
  concession1.name = "Concession 1";
  const savedConcession1 = await concessionRepository.createConcession(concession1);
  console.log("Concession 1 créée :", savedConcession1);

  const concession2 = new Concession();
  concession2.name = "Concession 2";
  const savedConcession2 = await concessionRepository.createConcession(concession2);
  console.log("Concession 2 créée :", savedConcession2);
  
  // Création des utilisateurs
  const userService = application.get(UserService);
  console.log("Chargement des utilisateurs...");
  
  const passwordHash = await hash("password123", 10);
  const usersData = [
    { email: "user1@company1.com", password: passwordHash, isAdmin: false, associations: { companyId: company1.id } },
    { email: "user2@company1.com", password: passwordHash, isAdmin: false, associations: { companyId: company1.id } },
    { email: "user1@company2.com", password: passwordHash, isAdmin: false, associations: { companyId: company2.id } },
    { email: "user2@company2.com", password: passwordHash, isAdmin: false, associations: { companyId: company2.id } },
    { email: "user1@concession1.com", password: passwordHash, isAdmin: false, associations: { concessionId: concession1.id } },
    { email: "user2@concession1.com", password: passwordHash, isAdmin: false, associations: { concessionId: concession1.id } },
    { email: "user1@concession2.com", password: passwordHash, isAdmin: false, associations: { concessionId: concession2.id } },
    { email: "user2@concession2.com", password: passwordHash, isAdmin: false, associations: { concessionId: concession2.id } },
  ];

  for (const userData of usersData) {
    await userService.create(userData.email, userData.password, 'role_test', userData.isAdmin, userData.associations);
    console.log(`Utilisateur ${userData.email} créé !`);
  }

  console.log("Toutes les companies, concessions et utilisateurs ont été créés avec succès !");

  if (!app) {
    await application.close();
  }
}