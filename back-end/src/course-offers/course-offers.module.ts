import { Module } from "@nestjs/common";
import { CourseOffersService } from "./course-offers.service";
import { CourseOffersController } from "./course-offers.controller";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CourseOffersController],
  providers: [CourseOffersService],
})
export class CourseOffersModule {}
