import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DatabaseSeederService } from './seeder/database-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const globalPrefix = 'api';
  const config = new DocumentBuilder()
    .setTitle('Taxi Booking API')
    .setDescription('API for booking taxis')
    .setVersion('1.0')
    .addTag('Bookings')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  const port = process.env.PORT || 3000;

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  await app.listen(port);
  const seeder = app.get(DatabaseSeederService);
  await seeder.seed();
}

bootstrap();
