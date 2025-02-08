import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "../../domain/entities/client.entity";
import { CLIENT_REPOSITORY } from "../repositories/client.repository";
import { ClientSqlRepository } from "../repositories/sql/client.repository.sql";

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [{ provide: CLIENT_REPOSITORY, useClass: ClientSqlRepository }],
  exports: [CLIENT_REPOSITORY],
})
export class ClientModule {}