import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { CreateEnrollmentDto } from "../src/enrollments/dto/create-enrollment.dto";
import { PrismaService } from "prisma/prisma.service";

const createValidStudentDto = () => {
  const uniqueCpf = Date.now()
    .toString()
    .slice(-11);
  return {
    name: "Gabriel Paiva",
    email: `gpj_${uniqueCpf}@hotmail.com`,
    cpf: uniqueCpf,
    birthDate: new Date("1989-11-27"),
    phone: "62985835123",
    highSchoolGraduationYear: 2012,
  };
};

describe("Enrollments (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let validCourseOfferId: number;
  let validPaymentPlanId: number;
  let invalidPaymentPlanForThisOffer: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        validationError: { target: false },
      })
    );

    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    const offer = await prisma.courseOffer.findFirst({
      where: { paymentPlans: { some: {} } },
      include: { paymentPlans: true },
    });

    if (!offer) {
      throw new Error("Seed não executado ou banco sem ofertas com planos.");
    }

    validCourseOfferId = offer.id;
    validPaymentPlanId = offer.paymentPlans[0].id;

    const otherPlan = await prisma.paymentPlan.findFirst({
      where: { offerId: { not: validCourseOfferId } },
    });

    if (!otherPlan) {
      throw new Error(
        "Seed não possui pelo menos 2 ofertas com planos para o teste."
      );
    }

    invalidPaymentPlanForThisOffer = otherPlan.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /enrollments -> deve criar uma matrícula com dados válidos", async () => {
    const newEnrollmentDto: CreateEnrollmentDto = {
      courseOfferId: validCourseOfferId,
      paymentPlanId: validPaymentPlanId,
      student: createValidStudentDto(),
    };

    const response = await request(app.getHttpServer())
      .post("/enrollments")
      .send(newEnrollmentDto)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        studentId: expect.any(Number),
        courseOfferId: validCourseOfferId,
        paymentPlanId: validPaymentPlanId,
        student: expect.objectContaining({
          cpf: newEnrollmentDto.student.cpf,
        }),
      })
    );
  });
});
