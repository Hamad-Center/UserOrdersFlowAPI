import { v4 as uuidv4 } from "uuid";

export abstract class BaseEventDto {
    readonly eventId: string = uuidv4();
    readonly correlationId: string;
    readonly timeStamp: string = new Date().toISOString();
    readonly eventType: string;

    constructor(correlationId: string, eventType: string) {
        this.correlationId = correlationId;
        this.eventType = eventType;
    }
}