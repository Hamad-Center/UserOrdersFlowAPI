import { BullModuleOptions } from "@nestjs/bull";
import { Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"
import { retry } from "rxjs"

export const getRedisConfig = (configService: ConfigService) => ({
    transport: 'REDIS' as const,
    options: {
        host: configService.get('REDIS_HOST', 'redis'),
        port: parseInt(configService.get('REDIS_PORT', '6379')),
        retryAttempts: 5,
        retryDelay: 1000,
    },
});

/**
 * @param configService sets up redis connection for the bull job queue system
 * defines job cleanup policies 
 */
export const getBullConfig = (configService: ConfigService): BullModuleOptions => ({
    redis: {
        host: configService.get('REDIS_HOST', 'redis'),
        port: parseInt(configService.get('REDIS_PORT', '6379')),
    },
    defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 2000,
        },
    },
});

export const QUEUE_NAMES = {
    BATCH_ASSIGNMENTS: 'batch-assignments',
    USER_NOTIFICATIONS: 'user-notifications',
} as const;