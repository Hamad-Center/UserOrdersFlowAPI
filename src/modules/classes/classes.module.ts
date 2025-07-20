import { Module } from '@nestjs/common';
import { ClassesController } from './controllers/classes.controller';
import { ClassesService } from './services/classes.service';
import { BatchAssignUsersDto } from './dto/batch-assign-users.dto';
import { BatchProcessorService } from './services/batch-processor.service';

@Module({
    controllers: [ClassesController],
    providers: [ClassesService, BatchProcessorService],
    exports: [ClassesService], // Export for use in other modules
})
export class ClassesModule { } 