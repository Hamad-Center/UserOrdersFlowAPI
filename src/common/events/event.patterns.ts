export const EVENT_PATTERNS = {
    USER_ASSIGNED_TO_CLASS: 'user.assigned.to.class',
    BATCH_ASSIGNMENT_STARTED: 'batch.assignment.started',
    BATCH_ASSIGNMENT_COMPLETED: 'batch.assignment.completed',
} as const;

export type EventPattern = typeof EVENT_PATTERNS[keyof typeof EVENT_PATTERNS];