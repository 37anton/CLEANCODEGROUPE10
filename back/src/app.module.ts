import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 👇 On importe les modules Mongoose et TypeORM
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
      synchronize: true, // ⚠️ Ne JAMAIS activer en production si tu veux éviter de perdre des données
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
