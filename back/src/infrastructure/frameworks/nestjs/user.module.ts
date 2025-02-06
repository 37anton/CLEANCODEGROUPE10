import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../../../application/services/user.service';
import { User } from '../../../domain/entities/user.entity';
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ Assurer que TypeORM gère bien User
  controllers: [UserController],
  providers: [
    UserService, // ✅ Fournir UserService comme un service principal
    {
      provide: 'CustomUserRepository', // ✅ Alias utilisé dans d'autres modules
      useExisting: UserService, // ✅ Redirige vers UserService
    },
  ],
  exports: [
    'CustomUserRepository', // ✅ Permet à d'autres modules d'utiliser UserService
    UserService,
    TypeOrmModule, // ✅ Ajout pour éviter les erreurs d'injection dans d'autres modules
  ],
})
export class UserModule {}
