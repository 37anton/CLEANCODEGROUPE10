import { DataSource } from "typeorm";
import { User } from "../../domain/entities/user.entity";
import { Supplier } from "../../domain/entities/supplier.entity";
import { PartSupplier } from "../../domain/entities/part-supplier.entity";
import { Order, OrderStatus } from "../../domain/entities/order.entity";
import { OrderItem } from "../../domain/entities/order-item.entity";
import { Company } from "../../domain/entities/company.entity";
import { Driver } from "../../domain/entities/driver.entity";
import { Concession } from "../../domain/entities/concession.entity";
import { Part } from "../../domain/entities/part.entity"; 
import * as bcrypt from 'bcryptjs';

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "clean_code",
  entities: ["src/domain/entities/*.ts"],
  synchronize: true, 
});

async function seedDatabase() {
  await dataSource.initialize();

  console.log("Connexion à la base de données");

  const company1 = new Company();
  company1.name = "Company 1";
  await dataSource.manager.save(company1);

  const company2 = new Company();
  company2.name = "Company 2";
  await dataSource.manager.save(company2);

  const concession1 = new Concession();
  concession1.name = "Concession 1";
  await dataSource.manager.save(concession1);

  const concession2 = new Concession();
  concession2.name = "Concession 2";
  await dataSource.manager.save(concession2);

  const passwordHash = await bcrypt.hash("password123", 10);

  const user1 = new User();
  user1.email = "user1@company1.com";
  user1.password = passwordHash;
  user1.isAdmin = false;
  user1.company = company1;
  await dataSource.manager.save(user1);

  const user2 = new User();
  user2.email = "user2@company1.com";
  user2.password = passwordHash;
  user2.isAdmin = true;
  user2.company = company1;
  await dataSource.manager.save(user2);

  const user3 = new User();
  user3.email = "user1@company2.com";
  user3.password = passwordHash;
  user3.isAdmin = false;
  user3.company = company2;
  await dataSource.manager.save(user3);

  const user4 = new User();
  user4.email = "user2@company2.com";
  user4.password = passwordHash;
  user4.isAdmin = true;
  user4.company = company2;
  await dataSource.manager.save(user4);

  const user5 = new User();
  user5.email = "user1@concession1.com";
  user5.password = passwordHash;
  user5.isAdmin = false;
  user5.concession = concession1;
  await dataSource.manager.save(user5);

  const user6 = new User();
  user6.email = "user2@concession1.com";
  user6.password = passwordHash;
  user6.isAdmin = true;
  user6.concession = concession1;
  await dataSource.manager.save(user6);

  const user7 = new User();
  user7.email = "user1@concession2.com";
  user7.password = passwordHash;
  user7.isAdmin = false;
  user7.concession = concession2;
  await dataSource.manager.save(user7);

  const user8 = new User();
  user8.email = "user2@concession2.com";
  user8.password = passwordHash;
  user8.isAdmin = true;
  user8.concession = concession2;
  await dataSource.manager.save(user8);

  const parts = [
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

  for (const partData of parts) {
    const part = new Part();
    part.name = partData.name;
    await dataSource.manager.save(part);
  }

  const supplier1 = new Supplier();
  supplier1.name = "Supplier A";
  supplier1.phone = "0123456789";
  supplier1.deliveryTime = 5;
  supplier1.city = "Paris";
  await dataSource.manager.save(supplier1);

  const supplier2 = new Supplier();
  supplier2.name = "Supplier B";
  supplier2.phone = "0987654321";
  supplier2.deliveryTime = 7;
  supplier2.city = "Lyon";
  await dataSource.manager.save(supplier2);

  const order1 = new Order();
  order1.supplier = supplier1;
  order1.company = company1;
  order1.status = OrderStatus.PENDING;
  order1.expectedDeliveryDate = new Date();
  order1.expectedDeliveryDate.setDate(order1.expectedDeliveryDate.getDate() + supplier1.deliveryTime);
  order1.totalPrice = 0; 
  await dataSource.manager.save(order1);

  const partFilter = await dataSource.manager.findOneBy(Part, { name: "Filtre à huile" });
  const partBrakeDisc = await dataSource.manager.findOneBy(Part, { name: "Disque de frein" });

  if (partFilter && partBrakeDisc) {
    const partSupplier1 = new PartSupplier();
    partSupplier1.part = partFilter;
    partSupplier1.supplier = supplier1;
    partSupplier1.price = 10;
    await dataSource.manager.save(partSupplier1);

    const partSupplier2 = new PartSupplier();
    partSupplier2.part = partFilter;
    partSupplier2.supplier = supplier2;
    partSupplier2.price = 15;
    await dataSource.manager.save(partSupplier2);

    const partSupplier3 = new PartSupplier();
    partSupplier3.part = partBrakeDisc;
    partSupplier3.supplier = supplier1;
    partSupplier3.price = 25;
    await dataSource.manager.save(partSupplier3);

    const partSupplier4 = new PartSupplier();
    partSupplier4.part = partBrakeDisc;
    partSupplier4.supplier = supplier2;
    partSupplier4.price = 30;
    await dataSource.manager.save(partSupplier4);
  } else {
    console.error("Les pièces n'ont pas été trouvées en base.");
  }

  if (!partFilter || !partBrakeDisc) {
    throw new Error("Les pièces 'Filtre à huile' ou 'Disque de frein' sont introuvables.");
  }

  const partSupplierFilterA = await dataSource.manager.findOne(PartSupplier, {
    where: { part: { id: partFilter.id }, supplier: { id: supplier1.id } }
  });

  const partSupplierBrakeDiscA = await dataSource.manager.findOne(PartSupplier, {
    where: { part: { id: partBrakeDisc.id }, supplier: { id: supplier1.id } }
  });

  if (!partSupplierFilterA || !partSupplierBrakeDiscA) {
    throw new Error("Impossible de trouver les relations PartSupplier pour Supplier A.");
  }

  const orderItem1 = new OrderItem();
  orderItem1.order = order1;
  orderItem1.partSupplier = partSupplierFilterA;
  orderItem1.quantity = 3;
  orderItem1.price = partSupplierFilterA.price; 
  await dataSource.manager.save(orderItem1);

  const orderItem2 = new OrderItem();
  orderItem2.order = order1;
  orderItem2.partSupplier = partSupplierBrakeDiscA;
  orderItem2.quantity = 2;
  orderItem2.price = partSupplierBrakeDiscA.price; 
  await dataSource.manager.save(orderItem2);

  order1.totalPrice = (orderItem1.quantity * orderItem1.price) + (orderItem2.quantity * orderItem2.price);
  await dataSource.manager.save(order1);

  const driver1 = new Driver();
  driver1.name = "Jean Dupont";
  driver1.license = "A2";
  driver1.experience = 3; 
  driver1.company = company1;
  await dataSource.manager.save(driver1);

  const driver2 = new Driver();
  driver2.name = "Sophie Martin";
  driver2.license = "A";
  driver2.experience = 5; 
  driver2.company = company1;
  await dataSource.manager.save(driver2);

  console.log("Fixtures ajoutées avec succès");
  await dataSource.destroy();
}

seedDatabase().catch((error) => console.error("Erreur lors du chargement des fixtures :", error));