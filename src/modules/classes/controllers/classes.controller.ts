import {
    Controller,
    Post,
    Get,
    Body,
    ValidationPipe
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
}