import { Injectable } from "@nestjs/common";
import { CreateCourseOfferDto } from "./dto/create-course-offer.dto";
import { UpdateCourseOfferDto } from "./dto/update-course-offer.dto";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class CourseOffersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCourseOfferDto: CreateCourseOfferDto) {
    return "This action adds a new courseOffer";
  }

  findAll() {
    return this.prisma.courseOffer.findMany({
      include: {
        course: true,
        campus: true,
        paymentPlans: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} courseOffer`;
  }

  update(id: number, updateCourseOfferDto: UpdateCourseOfferDto) {
    return `This action updates a #${id} courseOffer`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseOffer`;
  }
}
