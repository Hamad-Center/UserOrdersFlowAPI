import {
    Controller,
    Post,
    Get,
    Body,
    ValidationPipe,
    Param,
    ParseIntPipe,
    Patch,
    Delete,
    HttpCode,
    HttpStatus
} from "@nestjs/common";

import { ClassesService } from "../services/classes.service";
import { CreateClassDto } from "../dto/create-class.dto";
import { UpdateClassDto } from "../dto/update-class.dto";
import { AssignUserToClassDto } from "../dto/assign-user-to-class.dto";
import { IUserClassAssignment } from "../interfaces/class.interface";
import { BatchAssignUsersDto } from "../dto/batch-assign-users.dto";
import { BatchProcessorService } from "../services/batch-processor.service";

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) { }
    @Post()
    create(@Body(ValidationPipe) createClassDto: CreateClassDto) {
        console.log("creating class", { context: 'ClassesController' })
        return this.classesService.create(createClassDto);

    }

    @Get()
    findAll() {
        console.log(`finding all classes`, { context: 'ClassesController' })
        return this.classesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log("finding class by id", { id, context: 'ClassesController' });
        return this.classesService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateClassDto: UpdateClassDto
    ) {
        console.log(`updating class , ${id}, context ${ClassesController}`)
        return this.classesService.update(id, updateClassDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        console.log('deleting class ', { id, context: 'ClassController' });
        return this.classesService.delete(id);
    }

    //* user-class assignment endpoints 
    @Post('assignments')
    assignUserToClass(@Body(ValidationPipe) assignmentDto: AssignUserToClassDto) {
        console.log('assigning user to class', { context: 'classesController' });
        return this.classesService.assignUserToClass(assignmentDto);
    }

    @Delete('assignments/users/:userId/classes/:classId')
    @HttpCode(HttpStatus.NO_CONTENT)
    unassignUserFromClass(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('classId', ParseIntPipe) classId: number
    ) {
        console.log(`unassigning user ${userId} from class of id ${classId}`);
        return this.classesService.unAssignUserFromClass(userId, classId);
    }

    @Get('assignments/users/:userId')
    getUserAssignments(@Param('userId', ParseIntPipe) userId: number) {
        console.log('getting user assignements', { userId, context: 'ClassesController' })
        return this.classesService.getUserAssignments(userId);
    }

    @Get(':classId/assignments')
    getClassAssignments(@Param('classId', ParseIntPipe) classId: number) {
        console.log('getting class assignments', { classId, context: 'ClassesController' });
        return this.classesService.getClassAssignments(classId);
    }

    // batch operations (async processing)

    @Post('assignments/batch')
    @HttpCode(HttpStatus.ACCEPTED)
    async batchAssignUsers(@Body(ValidationPipe) batchDto: BatchAssignUsersDto) {
        console.log(
            'batch assigning users', {
            count: batchDto.assignments.length,
            correlationId: batchDto.correlationId,
            context: 'ClassesController'
        }
        );
        return this.classesService.processBatchAssignments(batchDto);
    }

    @Get('assignments/batch/:batchId/status')
    async getBatchStatus(@Param('batchId') batchId: string) {
        console.log('getting batch stauts', { batchId, context: 'ClassesController' });
        return this.classesService.getBatchStatus(batchId);

    }

    @Get('assignments/batch')
    async getAllBatchJobs() {
        console.log('getting all batch jobs', { context: 'ClassesController' });
        return this.classesService.getAllBatchJobs();
    }

    @Delete('assignments/batch/clear')
    @HttpCode(HttpStatus.OK)
    async cleanUpCompletedBatches() {
        const beforeJobs = await this.classesService.getAllBatchJobs();
        const beforeCount = beforeJobs.length;

        console.log(`cleaning completed batches started...`, {
            totalJobs: beforeCount,
            context: 'ClassesController'
        });

        // Clean all completed batches (regardless of age)
        const clearedCount = await this.classesService.cleanUpCompletedBatches();

        const afterJobs = await this.classesService.getAllBatchJobs();
        const remainingJobs = afterJobs.length;

        return {
            message: clearedCount === 0 ? 'No completed jobs to clear' : `Successfully cleared ${clearedCount} completed jobs`,
            jobsCleared: clearedCount,
            totalJobsBefore: beforeCount,
            remainingJobs: remainingJobs,
            operation: 'clear_completed'
        };
    }

    @Delete('assignments/batch/clear/old')
    @HttpCode(HttpStatus.OK)
    async cleanUpOldBatches() {
        const beforeJobs = await this.classesService.getAllBatchJobs();
        const beforeCount = beforeJobs.length;

        console.log(`cleaning old batches started...`, {
            totalJobs: beforeCount,
            context: 'ClassesController'
        });

        // Clean only old completed batches (24+ hours)
        const clearedCount = await this.classesService.cleanUpOldBatches();

        const afterJobs = await this.classesService.getAllBatchJobs();
        const remainingJobs = afterJobs.length;

        return {
            message: clearedCount === 0 ? 'No old jobs to clear (older than 24 hours)' : `Successfully cleared ${clearedCount} old jobs`,
            jobsCleared: clearedCount,
            totalJobsBefore: beforeCount,
            remainingJobs: remainingJobs,
            operation: 'clear_old'
        };
    }

    @Delete('assignments/batch/clear/all')
    @HttpCode(HttpStatus.OK)
    async cleanUpAllBatches() {
        const beforeJobs = await this.classesService.getAllBatchJobs();
        const beforeCount = beforeJobs.length;

        console.log(`cleaning all batches started...`, {
            totalJobs: beforeCount,
            context: 'ClassesController'
        });

        // Clean ALL batches (for testing/development)
        const clearedCount = await this.classesService.cleanUpAllBatches();

        const afterJobs = await this.classesService.getAllBatchJobs();
        const remainingJobs = afterJobs.length;

        return {
            message: clearedCount === 0 ? 'No jobs to clear' : `Successfully cleared all ${clearedCount} jobs`,
            jobsCleared: clearedCount,
            totalJobsBefore: beforeCount,
            remainingJobs: remainingJobs,
            operation: 'clear_all'
        };
    }


}