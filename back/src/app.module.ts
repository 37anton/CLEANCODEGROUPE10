import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';



import { TypeOrmModule } from '@nestjs/typeorm';
import { EntretienModule } from './infrastructure/frameworks/nest.js/entretien.module';

@Module({
  imports: [

    // Configuration globale du ConfigModule
    ConfigModule.forRoot({ isGlobal: true }),


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      synchronize: true,
    }),
    EntretienModule,


    AuthModule, // AuthModule peut maintenant utiliser ConfigService

  ],
})
export class AppModule {}