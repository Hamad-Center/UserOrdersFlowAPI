import { Module } from '@nestjs/common';
import { ClassesController } from './controllers/classes.controller';
import { ClassesService } from './services/classes.service';
import { BatchProcessorService } from './services/batch-processor.service';
import { ClassEventsController } from './controllers/class-events.controller';
import { EventPublisherService } from 'src/common/events/event-publisher.service';
import { EventsModule } from 'src/common/events/events.module';

@Module({
    imports: [EventsModule],
    controllers: [ClassesController,
        ClassEventsController,
    ],
    providers: [ClassesService, BatchProcessorService,
        EventPublisherService
    ],
    exports: [ClassesService], // Export for use in other modules
})
export class ClassesModule { } 