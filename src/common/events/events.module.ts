import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventPublisherService } from './event-publisher.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'REDIS_CLIENT',
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => {

                    const redisHost = configService.get<string>('REDIS_HOST', 'redis');
                    const redisPortStr = configService.get<string>('REDIS_PORT', '6379');
                    const redisPort = parseInt(redisPortStr, 10);

                    console.log('🔧 [EventsModule] Redis Config:', {
                        host: redisHost,
                        port: redisPort
                    });

                    return {
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
                    };
                },
                inject: [ConfigService],
            },
        ]),
    ],
    providers: [EventPublisherService],
    exports: [EventPublisherService],
})
export class EventsModule { }
