import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "../../domain/entities/client.entity";
import { CLIENT_REPOSITORY } from "../repositories/client.repository";
import { ClientSqlRepository } from "../repositories/sql/client.repository.sql";
import { ClientInMemoryRepository } from "../repositories/in-memory/client.in-memory";

const isInMemory = process.env.STORAGE_ADAPTER === 'in-memory';

@Module({
  imports: [...(!isInMemory ? [TypeOrmModule.forFeature([Client])] : [])],
  providers: [
    { 
      provide: CLIENT_REPOSITORY,
        useClass: isInMemory ? ClientInMemoryRepository : ClientSqlRepository,
    }
  ],
  exports: [CLIENT_REPOSITORY],
})
export class ClientModule {}