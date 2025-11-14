import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.$transaction([
    prisma.enrollment.deleteMany(),
    prisma.paymentPlan.deleteMany(),
    prisma.courseOffer.deleteMany(),
  ]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
