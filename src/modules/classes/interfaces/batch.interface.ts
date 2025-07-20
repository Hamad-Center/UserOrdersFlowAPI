export enum BatchStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    PARTIAL_SUCCESS = 'PARTIAL_SUCCESS'
}

export interface IBatchJob {
    batchId: string,
    status: BatchStatus,
    totalItems: number,
    processedItems: number,
    successCount: number,
    errorCount: number,
    errors: string[],
    createdAt: Date,
    updatedAt: Date,
    completedAt?: Date
}

export interface IBatchResponse {
    message: string;
    batchId: string;
    status: BatchStatus;
    totalItems: number;
    estimatedCompletionTime?: string;
}


