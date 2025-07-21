import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateClassDto } from "../dto/create-class.dto";
import { IClass, IUserClassAssignment } from '../interfaces/class.interface'
import { UpdateClassDto } from "../dto/update-class.dto";
import { AssignUserToClassDto } from "../dto/assign-user-to-class.dto";
import { BatchAssignUsersDto } from "../dto/batch-assign-users.dto";
import { BatchStatus, IBatchJob, IBatchResponse } from "../interfaces/batch.interface";
import { BatchProcessorService } from '../services/batch-processor.service'

@Injectable()
export class ClassesService {
    // in memory storage for demo purposes , will handle this in phase 3 when implementing repository )
    private classes: IClass[] = [
        {
            id: 1,
            name: "hand to hand combat sessions",
            capacity: 25,
            description: "this is hardcore training",
            createdAt: new Date('2025-07-16'),
            updatedAt: new Date('2025-07-16')
        }
    ];

    private assignements: IUserClassAssignment[] = [];
    constructor(
        private readonly batchProcessor: BatchProcessorService
    ) { }



    async create(createClassDto: CreateClassDto): Promise<IClass> {
        const highestId = this.classes.map(c => c.id).reduce((max, id) => Math.max(max, id), 0);
        const newClass: IClass = {
            id: highestId + 1,
            ...createClassDto,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.classes.push(newClass);
        console.log('Class created', { classId: newClass.id, context: 'ClassesService' });
        return newClass;
    }


    async findAll(): Promise<IClass[]> {
        return this.classes;
    }

    async findOne(id: number): Promise<IClass> {
        const classItem = this.classes.find(c => c.id === id);
        if (!classItem) {
            console.error(`the requested info ${classItem} isnot found`)
            throw new NotFoundException(`class with id ${id} isnot found...`);
        }
        return classItem;
    }
    async update(id: number, updateClassDto: UpdateClassDto): Promise<IClass> {
        const classItemIndex = this.classes.findIndex(c => c.id === id);
        if (classItemIndex === -1) {
            throw new NotFoundException(`class with id ${id} isnot found`);
        }

        this.classes[classItemIndex] = {
            ...this.classes[classItemIndex],
            ...updateClassDto,
            updatedAt: new Date(),
        };
        return this.classes[classItemIndex];
    }

    async delete(id: number): Promise<void> {
        const classToBeDeleted = this.classes.findIndex(c => c.id === id);
        if (classToBeDeleted === -1) {
            throw new NotFoundException(`class with specific id ${id} is not found.`)
        }
        this.classes.splice(classToBeDeleted, 1);
    }

    // this is the user class core business logic 
    async assignUserToClass(assignmentDto: AssignUserToClassDto): Promise<IUserClassAssignment> {

        const exitstingAssignment = this.assignements.find(
            a => a.userId === assignmentDto.userId &&
                a.classId === assignmentDto.classId &&
                a.status === 'ACTIVE'
        )

        if (exitstingAssignment) {
            throw new BadRequestException(`user with id ${exitstingAssignment.userId} is already assigned to this class`);
        }

        // will check class capacity at first 
        const classItem = await this.findOne(assignmentDto.classId);
        const currentAssignments = this.assignements.filter(
            a => a.classId === assignmentDto.classId && a.status === 'ACTIVE'
        );

        if (currentAssignments.length >= classItem.capacity) {
            console.error('hmm, this is an already existing user!');
            throw new BadRequestException(`class is at full capacity`)
        }

        const highestId = Math.max(...this.assignements.map(a => a.id), 0);

        const assignement: IUserClassAssignment = {
            id: highestId + 1,
            userId: assignmentDto.userId,
            classId: assignmentDto.classId,
            assignedAt: new Date(),
            status: assignmentDto.status || 'ACTIVE',
        };
        this.assignements.push(assignement);
        return assignement;
    }

    async unAssignUserFromClass(userId: number, classId: number): Promise<void> {
        const assignmentIndex = this.assignements.findIndex(
            a => a.userId === userId && a.classId === classId && a.status === 'ACTIVE'
        )
        if (assignmentIndex === -1) {
            throw new NotFoundException('assignement not found')
        }
        this.assignements[assignmentIndex].status = 'INACTIVE';
    }

    async getUserAssignments(userId: number): Promise<IUserClassAssignment[]> {
        return this.assignements.filter(a => a.userId === userId);
    }

    async getClassAssignments(classId: number): Promise<IUserClassAssignment[]> {
        return this.assignements.filter(a => a.classId === classId);
    }

    async processBatchAssignments(batchDto: BatchAssignUsersDto): Promise<IBatchResponse> {
        if (batchDto.assignments.length > 1000) {
            throw new BadRequestException(`batch size cannot exceed 1000 assignments`);
        }

        if (batchDto.assignments.length === 0) {
            throw new BadRequestException(`batch must contain at least 1 assignment`);
        }

        const batchId = batchDto.correlationId || `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        console.log('Creating batch job', {
            batchId,
            count: batchDto.assignments.length,
            context: 'ClassesService'
        });

        const job = this.batchProcessor.createBatchJob(batchId, batchDto.assignments.length);


        this.batchProcessor.processBatchInBackground(
            batchId,
            batchDto.assignments,
            async (assignment) => {
                // this is where the actual assignment happens 
                await this.assignUserToClass(assignment);
            }
        ).catch(error => {
            console.error(`batch ${batchId} processing failed: `, error);
        });

        // estimated time for the batch to complete  
        const estimatedMs = batchDto.assignments.length * 100;
        const estimatedCompletion = new Date(Date.now() + estimatedMs).toString();

        return {
            message: 'batch procssing started successfully and has been accepted for processing.',
            batchId,
            status: BatchStatus.PENDING,
            totalItems: batchDto.assignments.length,
            estimatedCompletionTime: estimatedCompletion
        };

    }

    async getBatchStatus(batchId: string): Promise<IBatchJob> {
        const job = this.batchProcessor.getBatchJob(batchId);
        if (!job) {
            throw new NotFoundException(`batch job ${batchId} not found`);
        }
        return job;
    }

    async getAllBatchJobs(): Promise<IBatchJob[]> {
        return this.batchProcessor.getAllBatchJob();
    }

}
