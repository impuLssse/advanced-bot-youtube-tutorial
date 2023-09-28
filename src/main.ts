import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot.module';

async function bootstrap() {
  const app = await NestFactory.create(BotModule);
  app.useLogger(['debug', 'error', 'fatal', 'log', 'verbose']);

  await app.listen(3000);
}
bootstrap();
