import { INestApplication } from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { hash } from 'bcryptjs';
import { Company } from 'src/domain/entities/company.entity';
import { Concession } from 'src/domain/entities/concession.entity';

import { SupplierService } from 'src/application/services/supplier.service';
import { PartService } from 'src/application/services/part.service';
import { CompanyService } from 'src/application/services/company.service';
import { ConcessionService } from '../application/services/concession.service';

export async function loadFixtures(app?: INestApplication): Promise<void> {
  // Si une instance d'app est passée, on l'utilise, sinon on crée un contexte autonome
  const application = app || await (await import('@nestjs/core')).NestFactory.createApplicationContext(require('../../app.module').AppModule);

  const userService = application.get(UserService);
  const passwordHash = await hash("password123", 10);
  const partService = application.get(PartService);
  const supplierService = application.get(SupplierService);
  const companyService = application.get(CompanyService);
  const concessionService = application.get(ConcessionService);

  console.log("Chargement des companies...");

  const company1 = new Company();
  company1.name = "Company 1";
  const savedCompany1 = await companyService.createCompany(company1);
  console.log("Company 1 créée :", savedCompany1);

  const company2 = new Company();
  company2.name = "Company 2";  
  const savedCompany2 = await companyService.createCompany(company2);
  console.log("Company 2 créée :", savedCompany2);

  console.log("Chargement des concessions...");

  const concession1 = new Concession();
  concession1.name = "Concession 1";
  const savedConcession1 = await concessionService.createConcession(concession1);
  console.log("Concession 1 créée :", savedConcession1);

  const concession2 = new Concession();
  concession2.name = "Concession 2";
  const savedConcession2 = await concessionService.createConcession(concession2);
  console.log("Concession 2 créée :", savedConcession2);
  
  console.log("Chargement des utilisateurs..."); 
  
  const usersData = [
    { email: "user1@company1.com", password: passwordHash, isAdmin: false, associations: { companyId: savedCompany1.id } },
    { email: "user2@company1.com", password: passwordHash, isAdmin: false, associations: { companyId: savedCompany1.id } },
    { email: "user1@company2.com", password: passwordHash, isAdmin: false, associations: { companyId: savedCompany2.id } },
    { email: "user2@company2.com", password: passwordHash, isAdmin: false, associations: { companyId: savedCompany2.id } },
    { email: "user1@concession1.com", password: passwordHash, isAdmin: false, associations: { concessionId: savedConcession1.id } },
    { email: "user2@concession1.com", password: passwordHash, isAdmin: false, associations: { concessionId: savedConcession1.id } },
    { email: "user1@concession2.com", password: passwordHash, isAdmin: false, associations: { concessionId: savedConcession2.id } },
    { email: "user2@concession2.com", password: passwordHash, isAdmin: false, associations: { concessionId: savedConcession2.id } },
  ];

  for (const userData of usersData) {
    await userService.create(userData.email, userData.password, 'role_test', userData.isAdmin, userData.associations);
    console.log(`Utilisateur ${userData.email} créé !`);
  }

  // Création des Parts
  const partsData = [
    { name: "Filtre à huile" },
    { name: "Plaquette de frein" },
    { name: "Pneu" },
    { name: "Bougie d'allumage" },
    { name: "Batterie" },
    { name: "Chaîne de transmission" },
    { name: "Kit de frein arrière" },
    { name: "Amortisseur avant" },
    { name: "Amortisseur arrière" },
    { name: "Disque de frein" },
    { name: "Échappement" },
    { name: "Guidon" },
    { name: "Rétroviseur" },
    { name: "Phare avant" },
    { name: "Clignotant" }
  ];

  for (const { name } of partsData) {
    const part = await partService.create(name);
    console.log(`Part '${part.name}' created`);
  } 

  // Création des suppliers
  const suppliersData = [
    { name: "Supplier A", phone: "0123456789", deliveryTime: 1, city: "Paris" },
    { name: "Supplier B", phone: "0987654321", deliveryTime: 2, city: "Lyon" }
  ];
  
  for (const supplierData of suppliersData) {
    await supplierService.createSupplier(supplierData);
    console.log(`Supplier ${supplierData.name} created!`);
  }  

  if (!app) {
    await application.close();
  }
}