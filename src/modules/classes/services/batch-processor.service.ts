import { Injectable, Logger } from "@nestjs/common";
import { BatchStatus, IBatchJob } from '../interfaces/batch.interface'
import { AssignUserToClassDto } from "../dto/assign-user-to-class.dto";

@Injectable()
export class BatchProcessorService {
    private readonly logger = new Logger(BatchProcessorService.name);
    private batchJobs = new Map<string, IBatchJob>();

    async processBatchInBackground(
        batchId: string,
        assignments: AssignUserToClassDto[],
        assignmentProcessor: (assignment: AssignUserToClassDto) => Promise<void>
    ): Promise<void> {
        const job = this.batchJobs.get(batchId);
        if (!job) {
            this.logger.error(`batch job ${batchId} not found.`)
            return;
        }
        try {
            //updates status to processing 
            job.status = BatchStatus.PROCESSING;
            job.updatedAt = new Date();
            this.logger.log(`starting batch processing for batch id ${batchId} with ${assignments.length} items`);

            const chunkSize = 10;
            for (let i = 0; i < assignments.length; i += chunkSize) {
                const chunk = assignments.slice(i, i + chunkSize);

                // this logic is for processing chunks in paralled with limited concurrency 
                const chunkPromises = chunk.map(async (assignment) => {
                    try {
                        await assignmentProcessor(assignment);
                        job.successCount++;
                        this.logger.debug(`Processed assignment: user ${assignment.userId} to class ${assignment.classId}`);
                    } catch (error) {
                        job.errorCount++;
                        const errorMsg = `failed to assign user ${assignment.userId} to class ${assignment.classId}`;
                        job.errors.push(errorMsg);
                        this.logger.error(errorMsg);
                    }
                    job.processedItems++;
                    job.updatedAt = new Date();
                });
                await Promise.allSettled(chunkPromises);

                // and this is a small delay between each chunk to prevent overwhelming the system
                await new Promise(res => setTimeout(res, 100));
            }

            //determine final status 
            if (job.errorCount === 0) {
                job.status = BatchStatus.COMPLETED;
            } else if (job.successCount > 0) {
                job.status = BatchStatus.PARTIAL_SUCCESS;
            } else {
                job.status = BatchStatus.FAILED;
            }
            job.completedAt = new Date();
            job.updatedAt = new Date();
            this.logger.log(`batch ${batchId} completed: ${job.successCount} success, ${job.errorCount} errors`);
        }
        catch (error) {
            job.status = BatchStatus.FAILED;
            job.errors.push(`batch processing failed: ${error.message}`);
            job.updatedAt = new Date();
            job.completedAt = new Date();
            this.logger.error(`batch ${batchId} failed completely`, error.stack)
        }
    }
    async createBatchJob(batchId: string, totalItems: number): Promise<IBatchJob> {
        const job: IBatchJob = {
            batchId,
            status: BatchStatus.PENDING,
            totalItems,
            processedItems: 0,
            successCount: 0,
            errorCount: 0,
            errors: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.batchJobs.set(batchId, job);
        return job;
    }

    getBatchJob(batchId: string): IBatchJob | undefined {
        return this.batchJobs.get(batchId);
    }

    getAllBatchJob(): IBatchJob[] {
        return Array.from(this.batchJobs.values());
    }

    // clean up old completed batches
    cleanUpOldJobs(OlderThanHours: number = 24): void {
        const cutOffTime = new Date(Date.now() - (OlderThanHours * 60 * 60 * 1000));

        for (const [batchId, job] of this.batchJobs.entries()) {
            if (job.completedAt && job.completedAt < cutOffTime) {
                this.batchJobs.delete(batchId);
                this.logger.debug(`cleaned up old batch job ${batchId}`);
            }
        }
    }
}