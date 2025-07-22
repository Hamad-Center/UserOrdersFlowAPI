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