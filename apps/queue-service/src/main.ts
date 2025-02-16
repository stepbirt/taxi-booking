import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rabbitMQConfig } from '@taxi-booking-app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log(`🚀 Queue Application is running`);
  app.connectMicroservice<MicroserviceOptions>(rabbitMQConfig);
  await app.startAllMicroservices();
}

bootstrap();
