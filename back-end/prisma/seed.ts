import { PrismaClient, Modality } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o script...");

  // Limpa os dados antigos
  await prisma.enrollment.deleteMany({});
  await prisma.paymentPlan.deleteMany({});
  await prisma.courseOffer.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.campus.deleteMany({});

  console.log(">>>>>>> Criando os dados...");

  const campusVilaIndustrial = await prisma.campus.create({
    data: {
      name: "VILA INDUSTRIAL",
      city: "CAMPINAS",
      address: "AV. DAS AMÉRICAS, TOM 200 - VILA INDUSTRIAL - CAMPINAS - SP",
    },
  });

  const campusBarraDaTijuca = await prisma.campus.create({
    data: {
      name: "BARRA DA TIJUCA",
      city: "RIO DE JANEIRO",
      address: "AV. DAS AMÉRICAS, TOM 300 - BARRA DA TIJUCA - RJ",
    },
  });

  const cursoAdmin = await prisma.course.create({
    data: {
      name: "Administração",
      description: "Curso de graduação em Administração de Empresas.",
    },
  });

  const ofertaPresencial = await prisma.courseOffer.create({
    data: {
      modality: Modality.PRESENCIAL,
      listPrice: 4752.0, // Preço
      featuredFullPrice: 2613.6, // Preço à vista
      courseId: cursoAdmin.id,
      campusId: campusVilaIndustrial.id,
    },
  });

  const ofertaDigital = await prisma.courseOffer.create({
    data: {
      modality: Modality.DIGITAL,
      listPrice: 1500.0, //fake
      featuredFullPrice: null,
      courseId: cursoAdmin.id,
      campusId: campusBarraDaTijuca.id,
    },
  });

  await prisma.paymentPlan.createMany({
    data: [
      {
        description: "18x R$ 169,95",
        installments: 18,
        installmentValue: 169.95,
        total: 3059.1,
        offerId: ofertaPresencial.id,
      },
      {
        description: "15x R$ 200,97",
        installments: 15,
        installmentValue: 200.97,
        total: 3014.55,
        offerId: ofertaPresencial.id,
      },
      {
        description: "12x R$ 247,50",
        installments: 12,
        installmentValue: 2496.0,
        total: 3199.69,
        offerId: ofertaPresencial.id,
      },
      {
        description: "9x R$ 320,10",
        installments: 9,
        installmentValue: 320.1,
        total: 2880.9,
        offerId: ofertaPresencial.id,
      },
      {
        description: "6x R$ 465,30",
        installments: 6,
        installmentValue: 465.3,
        total: 2791.8,
        offerId: ofertaPresencial.id,
      },
      {
        description: "3x R$ 900,90",
        installments: 3,
        installmentValue: 900.9,
        total: 2702.7,
        offerId: ofertaPresencial.id,
      },
      {
        description: "1x R$ 2.613,60",
        installments: 1,
        installmentValue: 2613.6,
        total: 2613.6,
        offerId: ofertaPresencial.id,
      },
    ],
  });

  await prisma.paymentPlan.create({
    data: {
      description: "1x R$ 1500,00",
      installments: 1,
      installmentValue: 1500.0,
      total: 1500.0,
      offerId: ofertaDigital.id,
    },
  });

  console.log(">>>>>>>>> Dados inseridos com sucesso!!! <<<<<<<<<<<<");
}

main()
  .catch((e) => {
    console.error("Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
