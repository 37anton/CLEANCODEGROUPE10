import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { UserService } from "../application/services/user.service";
import { hash } from "bcryptjs";

async function loadUsersFixtures() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  console.log("Chargement des utilisateurs...");

  // Création du hash pour les mots de passe
  const passwordHash = await hash("password123", 10);

  // Création de 2 users pour chaque company
  const usersData = [
    { email: "test1@fixtures.com", password: passwordHash, isAdmin: false },
    { email: "test2@fixtures.com", password: passwordHash, isAdmin: false },
    { email: "test3@fixtures.com", password: passwordHash, isAdmin: false },
    { email: "test4@fixtures.com", password: passwordHash, isAdmin: false },
  ];

  for (const userData of usersData) {
    await userService.create(userData.email, userData.password, 'role_test', userData.isAdmin);
    console.log(`Utilisateur ${userData.email} créé !`);
  }

  console.log("Tous les utilisateurs ont été créés avec succès !");
  await app.close();
}

loadUsersFixtures().catch((error) => {
  console.error("Erreur lors du chargement des utilisateurs :", error);
});
