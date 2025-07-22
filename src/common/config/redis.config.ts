import { ConfigService } from "@nestjs/config"


export const getRedisConfig = (configService: ConfigService) => ({
    transport: 'REDIS' as const,
    options: {
        host: configService.get('REDIS_HOST', 'redis'),
        port: parseInt(configService.get('REDIS_PORT', '6379')),
        retryAttempts: 5,
        retryDelay: 1000,
        maxRetriesPerRequest: 3
    },
});

//these are event patterns for type safety 

export const EVENT_PATTERNS = {
    USER_ASSIGNED_TO_CLASS: 'user.assigned.to.class',
    BATCH_ASSIGNMENT_STARTED: 'batch.assignment.started',
    BATCH_ASSIGNMENT_COMPLETED: 'batch.assignment.completed',
} as const;


export type EVENT_PATTERNS = typeof EVENT_PATTERNS[keyof typeof EVENT_PATTERNS]