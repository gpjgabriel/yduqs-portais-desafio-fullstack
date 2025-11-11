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

class StudentDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-ZÀ-ÿ']+(\s[a-zA-ZÀ-ÿ']+)+$/, {
    message: "O nome deve ser completo (nome e sobrenome).",
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string; // email com máscara (email@provedor.xxx)

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: "O CPF deve conter 11 dígitos." })
  @Matches(/^[0-9]{11}$/, {
    message: "O CPF deve conter apenas números (sem máscara).",
  })
  cpf: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @MaxDate(new Date(), {
    message: "A data de nascimento não pode ser uma data futura.",
  })
  birthDate: Date;

  @IsString()
  @IsOptional()
  @Length(11, 11, {
    message: "O celular deve conter 11 dígitos (DDD + número).",
  })
  @Matches(/^[0-9]{11}$/, {
    message: "O celular deve conter apenas números.",
  })
  phone?: string;

  @IsInt()
  @IsOptional()
  @Min(1950, { message: "Ano de conclusão inválido." })
  @Max(new Date().getFullYear(), {
    message: "O ano de conclusão não pode ser no futuro.",
  })
  highSchoolGraduationYear?: number;
}

export class CreateEnrollmentDto {
  // Dados da escolha do Plano
  @IsInt()
  @IsNotEmpty()
  courseOfferId: number; // Oferta (card)

  @IsInt()
  @IsNotEmpty()
  paymentPlanId: number; // Plano/Forma de Pagamento (modal)

  // Dados do formulário
  @ValidateNested()
  @Type(() => StudentDto)
  @IsNotEmpty()
  student: StudentDto;
}
