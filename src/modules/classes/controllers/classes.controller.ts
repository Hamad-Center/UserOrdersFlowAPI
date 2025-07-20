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
}