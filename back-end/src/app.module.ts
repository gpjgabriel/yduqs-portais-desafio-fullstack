import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { CourseOffersModule } from './course-offers/course-offers.module';

@Module({
  imports: [TasksModule, CourseOffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
