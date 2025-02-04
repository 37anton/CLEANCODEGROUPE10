import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserService } from '../../../application/services/user.service';
import { SQLUserRepository } from '../../repositories/sql/sql-user.repository';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user.repository';

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [
    // On n’importe TypeOrmModule que si on n’est pas en mémoire
    ...(!isInMemory ? [TypeOrmModule.forFeature([User])] : []),
  ],
  providers: [
    // Service lié aux utilisateurs
    UserService,
    // On déclare la version in-memory ou SQL du repository utilisateur
    isInMemory ? InMemoryUserRepository : SQLUserRepository,
    {
      provide: 'CustomUserRepository',
      useClass: isInMemory ? InMemoryUserRepository : SQLUserRepository,
    },
  ],
  exports: [
    // On exporte le service et le repository pour qu’ils soient utilisables ailleurs
    UserService,
    'CustomUserRepository',
  ],
})
export class UserModule {}
