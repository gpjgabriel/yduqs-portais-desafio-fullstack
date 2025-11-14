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
  let invalidPlanForOffer1: number;

  let offer1_Id: number;
  let offer1_PlanId: number;
  let offer2_Id: number;
  let offer2_PlanId: number;

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

    const offers = await prisma.courseOffer.findMany({
      where: { paymentPlans: { some: {} } },
      include: { paymentPlans: true },
    });

    if (offers.length < 2) {
      throw new Error(
        "Seed precisa de pelo menos 2 ofertas com planos de pagamento para os testes."
      );
    }

    // Oferta 1
    offer1_Id = offers[0].id;
    offer1_PlanId = offers[0].paymentPlans[0].id;

    // Oferta 2
    offer2_Id = offers[1].id;
    offer2_PlanId = offers[1].paymentPlans[0].id;

    // Plano inválido
    invalidPlanForOffer1 = offer2_PlanId;
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /enrollments -> deve criar uma matrícula com dados válidos", async () => {
    const newEnrollmentDto: CreateEnrollmentDto = {
      courseOfferId: offer1_Id,
      paymentPlanId: offer1_PlanId,
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
        courseOfferId: offer1_Id,
        paymentPlanId: offer1_PlanId,
      })
    );
  });

  it("POST /enrollments -> deve falhar se o aluno tentar se matricular no MESMO curso novamente", async () => {
    const studentData = createValidStudentDto();

    const enrollmentDto: CreateEnrollmentDto = {
      courseOfferId: offer1_Id,
      paymentPlanId: offer1_PlanId,
      student: studentData,
    };

    // Cria a primeira matrícula
    await request(app.getHttpServer())
      .post("/enrollments")
      .send(enrollmentDto)
      .expect(201); // Sucesso

    // Tenta criar a segunda matrícula com o MESMO cpf e courso
    return request(app.getHttpServer())
      .post("/enrollments")
      .send(enrollmentDto)
      .expect(409) // Deve falhar com 409
      .expect((res) => {
        expect(res.body.message).toBe(
          "O aluno já está matriculado nesta oferta de curso."
        );
      });
  });
});
