import { DataSource } from "typeorm";
import { User } from "../../domain/entities/user.entity";
import { Company } from "../../domain/entities/company.entity";
import { Concession } from "../../domain/entities/concession.entity";
import * as bcrypt from 'bcryptjs';

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "clean_code",
  entities: ["src/domain/entities/*.ts"],
  synchronize: true, // Activer uniquement pour les tests
});

async function seedDatabase() {
  await dataSource.initialize();

  console.log("Connexion à la base de données");

  // Création de 2 companies
  const company1 = new Company();
  company1.name = "Company 1";
  await dataSource.manager.save(company1);

  const company2 = new Company();
  company2.name = "Company 2";
  await dataSource.manager.save(company2);

  // Création de 2 concessions
  const concession1 = new Concession();
  concession1.name = "Concession 1";
  await dataSource.manager.save(concession1);

  const concession2 = new Concession();
  concession2.name = "Concession 2";
  await dataSource.manager.save(concession2);

  // Création du hash pour les mots de passe
  const passwordHash = await bcrypt.hash("password123", 10);

  // Création de 2 users pour chaque company
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

  // Création de 2 users pour chaque concession
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

  console.log("Fixtures ajoutées avec succès");
  await dataSource.destroy();
}

seedDatabase().catch((error) => console.error("Erreur lors du chargement des fixtures :", error));
