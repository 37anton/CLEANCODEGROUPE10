import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadFixtures } from './scripts/fixtures';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (process.env.LOAD_FIXTURES === 'true') {
    await loadFixtures(app);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
