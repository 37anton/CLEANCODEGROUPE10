import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "../../domain/entities/client.entity";
import { CLIENT_REPOSITORY } from "../repositories/client.repository";
import { ClientSqlRepository } from "../repositories/sql/client.repository.sql";
import { ClientInMemoryRepository } from "../repositories/in-memory/client.in-memory";
import { CreateClientUseCase } from "src/application/use-cases/create-client.use-case";
import { ClientService } from "src/application/services/client.service";


const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [...(!isInMemory ? [TypeOrmModule.forFeature([Client])] : [])],
  providers: [
    CreateClientUseCase,
    ClientService,
    { 
      provide: CLIENT_REPOSITORY,
        useClass: isInMemory ? ClientInMemoryRepository : ClientSqlRepository,
    }
  ],
  exports: [CLIENT_REPOSITORY],
})
export class ClientModule {}