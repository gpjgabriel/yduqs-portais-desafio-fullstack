import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { EnrollmentsService } from "./enrollments.service";
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { UpdateEnrollmentDto } from "./dto/update-enrollment.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("2. Matrículas")
@Controller("enrollments")
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: "Criar uma nova matrícula" })
  @ApiBody({ type: CreateEnrollmentDto })
  @ApiResponse({ status: 201, description: "Matrícula criada com sucesso." })
  @ApiResponse({
    status: 400,
    description: "Dados de entrada inválidos (Bad Request).",
  })
  @ApiResponse({
    status: 404,
    description: "Plano de pagamento ou oferta não encontrada.",
  })
  @ApiResponse({
    status: 409,
    description: "Conflito (ex: CPF/Email já cadastrado).",
  })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.enrollmentsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto
  ) {
    return this.enrollmentsService.update(+id, updateEnrollmentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.enrollmentsService.remove(+id);
  }
}
