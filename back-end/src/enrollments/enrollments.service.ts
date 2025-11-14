import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { UpdateEnrollmentDto } from "./dto/update-enrollment.dto";
import { PrismaService } from "prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { student, courseOfferId, paymentPlanId } = createEnrollmentDto;

    try {
      return await this.prisma.$transaction(async (tx) => {
        // Validação do plano/curso/pagamento
        const paymentPlan = await tx.paymentPlan.findFirst({
          where: {
            id: paymentPlanId,
            offerId: courseOfferId,
          },
        });

        if (!paymentPlan) {
          throw new NotFoundException(
            "Plano de pagamento ou oferta de curso inválida."
          );
        }

        // Cria/Atualiza o aluno
        const studentRecord = await tx.student.upsert({
          where: { cpf: student.cpf },
          update: { ...student },
          create: { ...student },
        });

        // Verifica se já existe uma matrícula para este aluno NESTA oferta
        const existingEnrollment = await tx.enrollment.findFirst({
          where: {
            studentId: studentRecord.id,
            courseOfferId: courseOfferId,
          },
        });

        // Se existir, lança um erro de conflito
        if (existingEnrollment) {
          throw new ConflictException(
            "O aluno já está matriculado nesta oferta de curso."
          );
        }

        // Cria a nova matrícula
        const newEnrollment = await tx.enrollment.create({
          data: {
            studentId: studentRecord.id,
            courseOfferId: courseOfferId,
            paymentPlanId: paymentPlanId,
            finalAmount: paymentPlan.total,
          },
          include: {
            student: true,
          },
        });

        return newEnrollment;
      });
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException(
          "Um aluno com este CPF ou E-mail já existe."
        );
      }
      throw new Error(`Falha ao criar matrícula: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all enrollments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
