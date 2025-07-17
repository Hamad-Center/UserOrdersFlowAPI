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
}