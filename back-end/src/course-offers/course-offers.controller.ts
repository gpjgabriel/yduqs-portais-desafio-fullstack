import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CourseOffersService } from "./course-offers.service";
import { CreateCourseOfferDto } from "./dto/create-course-offer.dto";
import { UpdateCourseOfferDto } from "./dto/update-course-offer.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("1. Ofertas de Curso")
@Controller("course-offers")
export class CourseOffersController {
  constructor(private readonly courseOffersService: CourseOffersService) {}

  @Post()
  create(@Body() createCourseOfferDto: CreateCourseOfferDto) {
    return this.courseOffersService.create(createCourseOfferDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as ofertas de curso" })
  @ApiResponse({
    status: 200,
    description: "Lista de ofertas retornada com sucesso.",
  })
  @ApiResponse({ status: 500, description: "Erro interno do servidor." })
  findAll() {
    return this.courseOffersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseOffersService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCourseOfferDto: UpdateCourseOfferDto
  ) {
    return this.courseOffersService.update(+id, updateCourseOfferDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.courseOffersService.remove(+id);
  }
}
