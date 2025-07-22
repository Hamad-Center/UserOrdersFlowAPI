import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ClassesModule } from './modules/classes/classes.module';
import { getRedisConfig } from './common/config/redis.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventPublisherService } from './common/events/event-publisher.service';

@Module({
  imports: [
    UsersModule,
    ClassesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    ClientsModule.registerAsync([
      {
        name: 'REDIS_CLIENT',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get('REDIS_HOST', 'redis'),
            port: parseInt(configService.get('REDIS_PORT', '6379')),
            retryAttempts: 5,
            retryDelay: 1000,
          }
        }),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService,
    EventPublisherService
  ],
  exports: [EventPublisherService],
})
export class AppModule { }
