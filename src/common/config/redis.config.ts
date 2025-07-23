// src/config/redis.config.ts
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const getRedisConfig = (configService: ConfigService): ClientOptions => {
    // Use individual host/port instead of full URL
    const redisHost = configService.get<string>('REDIS_HOST', 'redis');
    const redisPort = configService.get<number>('REDIS_PORT', 6379);

    return {
        transport: Transport.REDIS,
        options: {
            host: redisHost,
            port: redisPort,
            retryAttempts: 5,
            retryDelay: 3000,
        },
    };
};

export const getRedisConfigFromUrl = (configService: ConfigService): ClientOptions => {
    const redisUrl = configService.get<string>('REDIS_URL', 'redis://redis:6379');


    const url = new URL(redisUrl);

    return {
        transport: Transport.REDIS,
        options: {
            host: url.hostname,
            port: parseInt(url.port) || 6379,
            retryAttempts: 5,
            retryDelay: 3000,
        },
    };
};
//these are event patterns for type safety 

export const EVENT_PATTERNS = {
    USER_ASSIGNED_TO_CLASS: 'user.assigned.to.class',
    BATCH_ASSIGNMENT_STARTED: 'batch.assignment.started',
    BATCH_ASSIGNMENT_COMPLETED: 'batch.assignment.completed',
} as const;


export type EVENT_PATTERNS = typeof EVENT_PATTERNS[keyof typeof EVENT_PATTERNS]