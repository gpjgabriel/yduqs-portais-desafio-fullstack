import { Test, TestingModule } from "@nestjs/testing";
import { CourseOffersService } from "./course-offers.service";
import { PrismaService } from "prisma/prisma.service";

// Mock do PrismaService
const mockPrismaService = {
  courseOffer: {
    findMany: jest.fn(),
  },
};

describe("CourseOffersService", () => {
  let service: CourseOffersService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseOffersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CourseOffersService>(CourseOffersService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("deve retornar uma lista de ofertas de curso", async () => {
      const mockCourseOffers = [
        {
          id: 1,
          modality: "PRESENCIAL",
          listPrice: "2613.6",
          course: { id: 1, name: "Administração" },
          campus: { id: 1, name: "VILA INDUSTRIAL" },
          paymentPlans: [],
        },
      ];

      prisma.courseOffer.findMany.mockResolvedValue(mockCourseOffers);

      const result = await service.findAll();

      expect(result).toEqual(mockCourseOffers);

      expect(prisma.courseOffer.findMany).toHaveBeenCalledTimes(1);

      expect(prisma.courseOffer.findMany).toHaveBeenCalledWith({
        include: {
          course: true,
          campus: true,
          paymentPlans: true,
        },
      });
    });
  });
});
