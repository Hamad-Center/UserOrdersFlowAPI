// src/main.ts (CORRECTED VERSION)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const redisHost = configService.get<string>('REDIS_HOST', 'redis');
  const redisPortStr = configService.get<string>('REDIS_PORT', '6379');
  const redisPort = parseInt(redisPortStr, 10);

  console.log('🔧 [Microservice] Redis Config:', {
    host: redisHost,
    port: redisPort,
    portString: redisPortStr,
    environment: configService.get('NODE_ENV')
  });

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisHost,
      port: redisPort,
      retryAttempts: 5,
      retryDelay: 3000,
      connectTimeout: 10000,
      lazyConnect: true,
      enableOfflineQueue: false,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  try {
    await app.startAllMicroservices();
    console.log(`REDIS MICROSERVICE IS CONNECTED AND LISTENING FOR EVENTS`);
  } catch (error) {
    console.error('Failed to start microservices:', error);
    // Continue anyway - the HTTP server can still work
  }

  await app.listen(process.env.PORT ?? 3000);
  console.log(`HTTP SERVER IS UP AND RUNNING AT PORT 3000`);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

// Add this debug helper to main.ts temporarily
console.log('🐛 All Redis Environment Variables:');
console.log('REDIS_HOST:', process.env.REDIS_HOST);
console.log('REDIS_PORT:', process.env.REDIS_PORT);
console.log('REDIS_URL:', process.env.REDIS_URL);  // ← This might be the problem!
