import {
    Controller,
    Post,
    Get,
    Body,
    ValidationPipe,
    Param,
    ParseIntPipe
} from "@nestjs/common";

import { ClassesService } from "../services/classes.service";
import { CreateClassDto } from "../dto/create-class.dto";

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
}