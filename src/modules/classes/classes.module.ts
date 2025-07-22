import { Module } from '@nestjs/common';
import { ClassesController } from './controllers/classes.controller';
import { ClassesService } from './services/classes.service';
import { BatchProcessorService } from './services/batch-processor.service';
import { ClassEventsController } from './controllers/class-events.controller';

@Module({
    controllers: [ClassesController,
        ClassEventsController,
    ],
    providers: [ClassesService, BatchProcessorService],
    exports: [ClassesService], // Export for use in other modules
})
export class ClassesModule { } 