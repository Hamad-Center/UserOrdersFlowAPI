import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: configService.get('REDIS_HOST', 'redis'),
      port: parseInt(configService.get('REDIS_PORT', '6379')),
      retryAttempts: 5,
      retryDelay: 1000,
    },

  });



  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips non-whitelisted properties
      forbidNonWhitelisted: true, // throws an error if non-whitelisted properties are present
      transform: true, // transform payloads to be objects typed according to their DTO classes
    }),
  );

  // starts both HTTP SERVER AND MICROSERVICES 
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);

  console.log(`HTTP SERVER IS UP AND RUNNING AT PORT 3000`);
  console.log(`REDIS MICROSERVICE IS CONNECTED AND LISTENING FOR EVENTS`);
}

bootstrap().catch((error) => {
  console.error('failed to start application', error);
  process.exit(1);
}) 
