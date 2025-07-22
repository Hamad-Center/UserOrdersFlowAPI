import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventPublisherService } from './event-publisher.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'REDIS_CLIENT',
                transport: Transport.REDIS,
                options: {
                    host: process.env.REDIS_URL || 'redis://localhost:6379',
                },
            },
        ]),
    ],
    providers: [EventPublisherService],
    exports: [EventPublisherService, ClientsModule],
})
export class EventsModule { }