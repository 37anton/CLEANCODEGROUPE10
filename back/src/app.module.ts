import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

// 👇 On importe les modules Mongoose et TypeORM
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Configuration globale du ConfigModule
    ConfigModule.forRoot({ isGlobal: true }),

    // 👇 Configuration Mongoose pour MongoDB
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    ),    

    // 👇 Configuration TypeORM pour PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Ne JAMAIS activer en production pour éviter de perdre des données
    }),

    AuthModule, // AuthModule peut maintenant utiliser ConfigService
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}