import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule], // added after i have added the users module using the nest cli cmd : nest g module users
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
