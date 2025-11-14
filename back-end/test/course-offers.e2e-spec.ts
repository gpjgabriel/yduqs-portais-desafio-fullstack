import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "prisma/prisma.service";

describe("CourseOffers (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let validOfferId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  // it("GET /course-offers -> deve retornar um array vazio", () => {
  //   return request(app.getHttpServer())
  //     .get("/course-offers")
  //     .expect(200)
  //     .expect([]);
  // });

  it("GET /course-offers -> deve retornar a lista de ofertas", async () => {
    const response = await request(app.getHttpServer())
      .get("/course-offers")
      .expect(200);

    // Verifica se é um array e não está vazio
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Verifica o conteúdo do array retornado
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        modality: expect.any(String),
        listPrice: expect.any(String),
        course: expect.any(Object),
        campus: expect.any(Object),
        paymentPlans: expect.any(Array),
      })
    );

    // Guarda um ID válido para o próximo teste
    validOfferId = response.body[0].id;
  });
});
