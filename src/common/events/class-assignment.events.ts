import { BaseEventDto } from "./base-event.dto";
import { EVENT_PATTERNS } from "./event.patterns";

export class UserAssignedToClassEvent extends BaseEventDto {
    constructor(
        correlationId: string,
        public readonly userId: number,
        public readonly classId: number,
        public readonly assignedAt: Date = new Date()
    ) {
        super(correlationId, EVENT_PATTERNS.USER_ASSIGNED_TO_CLASS);
    }
}

export class BatchAssignmentStartedEvent extends BaseEventDto {
    constructor(
        correlationId: string,
        public readonly batchId: string,
        public readonly totalItems: number
    ) {
        super(correlationId, EVENT_PATTERNS.BATCH_ASSIGNMENT_STARTED);
    }
}

export class BatchAssignmentCompletedEvent extends BaseEventDto {
    constructor(
        correlationId: string,
        public readonly batchId: string,
        public readonly successful: number,
        public readonly failed: number
    ) {
        super(correlationId, EVENT_PATTERNS.BATCH_ASSIGNMENT_COMPLETED);
    }
}