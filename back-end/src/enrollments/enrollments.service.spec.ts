import { Test, TestingModule } from "@nestjs/testing";
import { EnrollmentsService } from "./enrollments.service";
import { PrismaService } from "prisma/prisma.service";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { Prisma } from "@prisma/client";

// Mock do cliente
const mockTx = {
  paymentPlan: {
    findFirst: jest.fn(),
  },
  student: {
    upsert: jest.fn(),
  },
  enrollment: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

// Mock do PrismaService - simula a função transaction
const mockPrismaService = {
  $transaction: jest.fn().mockImplementation(async (callback) => {
    return await callback(mockTx);
  }),
};

const uniqueCpf = Date.now()
  .toString()
  .slice(-11);

const createEnrollmentDto: CreateEnrollmentDto = {
  courseOfferId: 1,
  paymentPlanId: 10,
  student: {
    name: "Gabriel Paiva",
    email: `gpj_${uniqueCpf}@hotmail.com`,
    cpf: uniqueCpf,
    birthDate: new Date("1989-11-27"),
    phone: "62985835123",
    highSchoolGraduationYear: 2012,
  },
};

describe("EnrollmentsService", () => {
  let service: EnrollmentsService;
  let prisma: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EnrollmentsService>(EnrollmentsService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("Verifica se cria uma matrícula com sucesso", async () => {
      const mockPaymentPlan = {
        id: 10,
        offerId: 1,
        total: "1500.00",
      };

      const mockStudent = {
        id: 1,
        ...createEnrollmentDto.student,
      };

      // retorno da matrícula
      const mockEnrollment = {
        id: 1,
        studentId: 1,
        courseOfferId: 1,
        paymentPlanId: 10,
        finalAmount: "1500.00",
        student: mockStudent,
      };

      mockTx.paymentPlan.findFirst.mockResolvedValue(mockPaymentPlan);
      mockTx.student.upsert.mockResolvedValue(mockStudent);

      // Tenta encontrar a matrícula e depois cria uma nova
      mockTx.enrollment.findFirst.mockResolvedValue(null);
      mockTx.enrollment.create.mockResolvedValue(mockEnrollment);

      // Cria a matrícula
      const result = await service.create(createEnrollmentDto);

      // Verifique se o resultado é o esperado
      expect(result).toEqual(mockEnrollment);

      // Verifique se o Prisma foi chamado com os dados corretos
      expect(prisma.$transaction).toHaveBeenCalledTimes(1);

      // Verifica se os dados da plano
      expect(mockTx.paymentPlan.findFirst).toHaveBeenCalledWith({
        where: {
          id: createEnrollmentDto.paymentPlanId, // Verifica o ID do plano (10)
          offerId: createEnrollmentDto.courseOfferId, // Verifica o ID da oferta (1)
        },
      });

      // Verifica se os dados do aluno
      expect(mockTx.student.upsert).toHaveBeenCalledWith({
        where: { cpf: createEnrollmentDto.student.cpf }, // Verifica o CPF como chave
        update: createEnrollmentDto.student,
        create: createEnrollmentDto.student,
      });

      // Verifica se os dados da inscrição
      expect(mockTx.enrollment.findFirst).toHaveBeenCalledWith({
        where: {
          studentId: mockStudent.id, // Verifica o ID do aluno
          courseOfferId: createEnrollmentDto.courseOfferId, // Verifica o ID da oferta
        },
      });

      // Verifica a criação da inscrição
      expect(mockTx.enrollment.create).toHaveBeenCalledWith({
        data: {
          studentId: mockStudent.id,
          courseOfferId: createEnrollmentDto.courseOfferId,
          paymentPlanId: createEnrollmentDto.paymentPlanId,
          finalAmount: mockPaymentPlan.total,
        },
        include: {
          student: true,
        },
      });
    });
  });

  it("deve lançar um erro se o plano de pagamento não for encontrado", async () => {
    mockTx.paymentPlan.findFirst.mockResolvedValue(null);

    // Tenta criar com um plano null
    await expect(service.create(createEnrollmentDto)).rejects.toThrow(
      NotFoundException
    );

    // Verifica o retorno da msgn de erro
    await expect(service.create(createEnrollmentDto)).rejects.toThrow(
      "Plano de pagamento ou oferta de curso inválida."
    );
  });

  it("deve lançar um erro se a matrícula já existir", async () => {
    // Mock do dados do plano e do aluno
    const mockPaymentPlan = { id: 10, offerId: 1, total: "1500.00" };
    const mockStudent = { id: 1, ...createEnrollmentDto.student };

    mockTx.paymentPlan.findFirst.mockResolvedValue(mockPaymentPlan);
    mockTx.student.upsert.mockResolvedValue(mockStudent);

    // Simula uma matrícula encontrada
    const mockExistingEnrollment = {
      id: 99, // Um ID de uma matrícula existente
      studentId: 1,
      courseOfferId: 1,
      paymentPlanId: 10,
      finalAmount: "1500.00",
    };
    mockTx.enrollment.findFirst.mockResolvedValue(mockExistingEnrollment);

    // Verifica se a matrícula é rejeitada e retorna erro
    await expect(service.create(createEnrollmentDto)).rejects.toThrow(
      ConflictException
    );

    await expect(service.create(createEnrollmentDto)).rejects.toThrow(
      "O aluno já está matriculado nesta oferta de curso."
    );

    // Garante que o a função de criar não foi chamada
    expect(mockTx.enrollment.create).not.toHaveBeenCalled();
  });

  it("deve lançar um erro se tenta cruar uma matrícula com um aluno que já existe (mesmo email)", async () => {
    const mockPaymentPlan = { id: 10, offerId: 1, total: "1500.00" };
    mockTx.paymentPlan.findFirst.mockResolvedValue(mockPaymentPlan);

    // Simula um erro P2002 (e-mail duplicado)
    const prismaP2002Error = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed",
      { code: "P2002", clientVersion: "x.x" }
    );

    // Configura o mock para retornar o erro
    mockTx.student.upsert.mockRejectedValue(prismaP2002Error);

    // Verifica se a matrícula é rejeitada e retorna erro
    await expect(service.create(createEnrollmentDto)).rejects.toThrow(
      ConflictException
    );

    await expect(service.create(createEnrollmentDto)).rejects.toThrow(
      "Um aluno com este CPF ou E-mail já existe."
    );

    // Garante que as funções de criar matrícula não foram chamadas
    expect(mockTx.enrollment.findFirst).not.toHaveBeenCalled();
    expect(mockTx.enrollment.create).not.toHaveBeenCalled();
  });
});
