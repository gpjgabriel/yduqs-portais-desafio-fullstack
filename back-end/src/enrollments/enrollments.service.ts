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

        const studentRecord = await tx.student.upsert({
          //Cria/Atualiza o aluno conforme CPF existente ou não
          where: { cpf: student.cpf },
          update: { ...student },
          create: { ...student },
        });

        const newEnrollment = await tx.enrollment.create({
          //Vincula o aluno ao plano
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
        error instanceof Prisma.PrismaClientKnownRequestError && // Se falhar por outra constraint única (ex: email)
        error.code === "P2002"
      ) {
        throw new ConflictException(
          "Um aluno com este CPF ou E-mail já existe."
        );
      }
      if (error instanceof NotFoundException) {
        // Outros erros
        throw error;
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
