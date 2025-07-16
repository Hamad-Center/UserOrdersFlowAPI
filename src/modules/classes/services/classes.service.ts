import { Injectable } from "@nestjs/common";
import { CreateClassDto } from "../dto/create-class.dto";
import { IClassRepository } from '../interfaces/class-repository.interface'
import { IClass, IUserClassAssignment } from '../interfaces/class.interface'

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


}