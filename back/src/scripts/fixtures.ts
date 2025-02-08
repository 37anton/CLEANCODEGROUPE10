import { INestApplication } from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { hash } from 'bcryptjs';

export async function loadFixtures(app?: INestApplication): Promise<void> {
  // Si une instance d'app est passée, on l'utilise, sinon on crée un contexte autonome
  const application = app || await (await import('@nestjs/core')).NestFactory.createApplicationContext(require('../../app.module').AppModule);
  const userService = application.get(UserService);

  console.log("Chargement des utilisateurs...");

  const passwordHash = await hash("password123", 10);
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
  console.log("Tous les utilisateurs ont été créés avec succès");

  if (!app) {
    await application.close();
  }
}