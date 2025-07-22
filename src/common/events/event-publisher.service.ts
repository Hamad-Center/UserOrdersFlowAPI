import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { BaseEventDto } from "./base-event.dto";
import { EventPattern } from "./event.patterns";

@Injectable()
export class EventPublisherService {
    private readonly logger = new Logger(EventPublisherService.name);

    constructor(
        @Inject('REDIS_CLIENT') private readonly client: ClientProxy,
    ) { }

    async publishEvent<T extends BaseEventDto>(pattern: EventPattern, event: T): Promise<void> {
        try {
            this.logger.debug(`publishing event : ${pattern}`, {
                eventId: event.eventId,
                correlationId: event.correlationId,
                eventType: event.eventType,
            });

            // emit an event to redis using nestjs microservices
            this.client.emit(pattern, event);

        }
        catch (error) {
            this.logger.error(`failed to publish events ${pattern}`, {
                eventId: event.eventId,
                correlationId: event.correlationId,
                error: error.message,
            });
            throw error;
        }
    }
} 