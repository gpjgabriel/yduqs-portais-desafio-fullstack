import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { CourseOffersModule } from './course-offers/course-offers.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [TasksModule, CourseOffersModule, EnrollmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
