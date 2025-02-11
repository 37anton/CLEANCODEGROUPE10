import { INestApplication } from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { hash } from 'bcryptjs';
import { Company } from 'src/domain/entities/company.entity';
import { Concession } from 'src/domain/entities/concession.entity';
import { SupplierService } from 'src/application/services/supplier.service';
import { PartService } from 'src/application/services/part.service';
import { CompanyService } from 'src/application/services/company.service';
import { ConcessionService } from 'src/application/services/concession.service';
import { DriverService } from 'src/application/services/driver.service';
import { PartSupplierService } from 'src/application/services/part-supplier.service';
import { Supplier } from 'src/domain/entities/supplier.entity';
import { OrderService } from 'src/application/services/order.service';
import { User } from 'src/domain/entities/user.entity';


export async function loadFixtures(app?: INestApplication): Promise<void> {
  // Si une instance d'app est passée, on l'utilise, sinon on crée un contexte autonome
  const application = app || await (await import('@nestjs/core')).NestFactory.createApplicationContext(require('../../app.module').AppModule);
  const usersMap: { [email: string]: User } = {}; // Pour stocker les users


  const userService = application.get(UserService);
  const passwordHash = await hash("password123", 10);
  const partService = application.get(PartService);
  const supplierService = application.get(SupplierService);
  const companyService = application.get(CompanyService);
  const concessionService = application.get(ConcessionService);
  const driverService = application.get(DriverService);
  const partSupplierService = application.get(PartSupplierService);
  const orderService = application.get(OrderService);

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
    { email: "user1@company1.com", password: passwordHash, role: 'role_admin', isAdmin: true, associations: { companyId: savedCompany1.id } },
    { email: "user2@company1.com", password: passwordHash, role: 'role_test', isAdmin: false, associations: { companyId: savedCompany1.id } },
    { email: "user1@company2.com", password: passwordHash, role: 'role_test', isAdmin: false, associations: { companyId: savedCompany2.id } },
    { email: "user2@company2.com", password: passwordHash, role: 'role_test', isAdmin: false, associations: { companyId: savedCompany2.id } },
    { email: "user1@concession1.com", password: passwordHash, role: 'role_test', isAdmin: false, associations: { concessionId: savedConcession1.id } },
    { email: "user2@concession1.com", password: passwordHash, role: 'role_test', isAdmin: false, associations: { concessionId: savedConcession1.id } },
    { email: "user1@concession2.com", password: passwordHash, role: 'role_test', isAdmin: false, associations: { concessionId: savedConcession2.id } },
    { email: "user2@concession2.com", password: passwordHash, role: 'role_test', isAdmin: false, associations: { concessionId: savedConcession2.id } },
  ];

  for (const userData of usersData) {
    const createdUser = await userService.create(userData.email, userData.password, userData.role, userData.isAdmin, userData.associations);
    usersMap[userData.email] = createdUser;
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
  // On stocke les parts créées dans une map pour pouvoir les retrouver par nom
  const partsMap: { [key: string]: any } = {};
  for (const { name } of partsData) {
    const part = await partService.create(name);
    partsMap[name] = part;
    console.log(`Part '${part.name}' created`);
  }

  // Création des suppliers
  const suppliersData = [
    { name: "Supplier A", phone: "0123456789", deliveryTime: 1, city: "Paris" },
    { name: "Supplier B", phone: "0987654321", deliveryTime: 2, city: "Lyon" }
  ];

  
  const savedSuppliers: Supplier[] = [];
  for (const supplierData of suppliersData) {
    const supplier = await supplierService.createSupplier(supplierData);
    savedSuppliers.push(supplier);
    console.log(`Supplier ${supplier.name} created!`);
  }
  const supplierA = savedSuppliers[0];
  const supplierB = savedSuppliers[1];

  // Création de 2 drivers qu'on lie à companu 1 et 2
  const driversDataForCompany1 = [
    { name: "Jean Dupont", license: "A2", experience: 3 },
    { name: "Sophie Martin", license: "A", experience: 5 },
  ];
  
  const driversDataForCompany2 = [
    { name: "Alice Durand", license: "B", experience: 2 },
    { name: "Marc Lefevre", license: "B1", experience: 4 },
  ];

  for (const driverData of driversDataForCompany1) {
    const driver = await driverService.create(savedCompany1.id, driverData.name, driverData.license, driverData.experience);
    console.log(`Driver '${driver.name}' créé pour Company 1:`, driver);
  }
  
  for (const driverData of driversDataForCompany2) {
    const driver = await driverService.create(savedCompany2.id, driverData.name, driverData.license, driverData.experience);
    console.log(`Driver '${driver.name}' créé pour Company 2:`, driver);
  }

  // Création des PartSupplier
  // Supplier A: "Filtre à huile" à 10€ et "Plaquette de frein" à 15€
  // Supplier B: "Filtre à huile" à 12€ et "Plaquette de frein" à 18€
  // Création des PartSupplier et stockage dans une map
  const partSupplierData = [
    { supplier: supplierA, partName: "Filtre à huile", price: 10 },
    { supplier: supplierA, partName: "Plaquette de frein", price: 15 },
    { supplier: supplierB, partName: "Filtre à huile", price: 12 },
    { supplier: supplierB, partName: "Plaquette de frein", price: 18 }
  ];

  // Création d'une map pour stocker les PartSupplier créés par clé (par exemple "Supplier A-Filtre à huile")
  const partSuppliersMap: { [key: string]: any } = {};

  for (const data of partSupplierData) {
    const partSupplier = await partSupplierService.createPartSupplier({
      supplierId: data.supplier.id,
      partId: partsMap[data.partName].id,
      price: data.price
    });
    const key = `${data.supplier.name}-${data.partName}`;
    partSuppliersMap[key] = partSupplier;
    console.log(`PartSupplier created: ${data.supplier.name} - ${data.partName} at ${data.price} euros`);
  }

  const createOrderDto = {
    supplierId: supplierA.id,
    items: [
      { partSupplierId: partSuppliersMap["Supplier A-Filtre à huile"].id, quantity: 2 },
      { partSupplierId: partSuppliersMap["Supplier A-Plaquette de frein"].id, quantity: 1 },
    ]  
  };
  
  const createdOrder = await orderService.createOrder(usersMap["user1@company1.com"], createOrderDto);
  console.log("Commande créée :", createdOrder); 

  if (!app) {
    await application.close();
  }
}