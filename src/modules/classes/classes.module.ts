import { Module } from '@nestjs/common';
import { ClassesController } from './controllers/classes.controller';
import { ClassesService } from './services/classes.service';

@Module({
    controllers: [ClassesController],
    providers: [ClassesService],
    exports: [ClassesService], // Export for use in other modules
})
export class ClassesModule { } 