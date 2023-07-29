import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient();

const passwordStr = '$2b$10$Hm3994FZyCDVoEefcpoK7Ox5c/8S5hkh8r0orbJOVk1hb06MnFBcy'
async function main() {
  const user = await prisma.user.create({
    data: {
      password: passwordStr,
      fullName: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number(),
      description: faker.lorem.lines(),
      createdAt: new Date()
    }
  });

  return user;
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async () => {
  await prisma.$disconnect()
})