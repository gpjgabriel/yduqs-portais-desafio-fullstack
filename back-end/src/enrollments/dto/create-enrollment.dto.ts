import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsDateString,
  ValidateNested,
  IsOptional,
  Matches,
  MaxDate,
  MinLength,
  Length,
  Min,
  Max,
  IsDate,
} from "class-validator";

import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class StudentDto {
  @ApiProperty({
    description: "Nome completo do aluno",
    example: "Gabriel Paiva",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-ZÀ-ÿ']+(\s[a-zA-ZÀ-ÿ']+)+$/, {
    message: "O nome deve ser completo (nome e sobrenome).",
  })
  name: string;

  @ApiProperty({
    description: "E-mail do aluno",
    example: "gpj_gabriel@email.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string; // email com máscara (email@provedor.xxx)

  @ApiProperty({ description: "CPF (apenas números)", example: "12345678910" })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: "O CPF deve conter 11 dígitos." })
  @Matches(/^[0-9]{11}$/, {
    message: "O CPF deve conter apenas números (sem máscara).",
  })
  cpf: string;

  @ApiProperty({ description: "Data de nascimento", example: "27/11/1989" })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @MaxDate(new Date(), {
    message: "A data de nascimento não pode ser uma data futura.",
  })
  birthDate: Date;

  @ApiProperty({
    description: "Celular (apenas números)",
    example: "62985835123",
  })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: "O celular deve conter 11 dígitos (DDD + número).",
  })
  @Matches(/^[0-9]{11}$/, { message: "O celular deve conter apenas números." })
  phone: string;

  @ApiProperty({
    description: "Ano de conclusão do ensino médio",
    example: 2012,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1950, { message: "Ano de conclusão inválido." })
  @Max(new Date().getFullYear(), {
    message: "O ano de conclusão não pode ser no futuro.",
  })
  highSchoolGraduationYear: number;
}

export class CreateEnrollmentDto {
  // Dados da escolha do Plano
  @ApiProperty({ description: "ID da oferta de curso selecionada", example: 1 })
  @IsInt()
  @IsNotEmpty()
  courseOfferId: number; // Oferta (card)

  @ApiProperty({
    description: "ID do plano de pagamento selecionado",
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  paymentPlanId: number; // Plano/Forma de Pagamento (modal)

  // Dados do formulário
  @ApiProperty({
    type: () => StudentDto,
    description: "Dados do aluno para matrícula",
  })
  @ValidateNested()
  @Type(() => StudentDto)
  @IsNotEmpty()
  student: StudentDto;
}
