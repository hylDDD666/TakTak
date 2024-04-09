// import { PrismaClient } from '@prisma/client';
const {PrismaClient} = require('@prisma/client')
 
const prisma = new PrismaClient();
 
 async function prismaExample() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Elliott',
      email: 'xelliottx@user.com',
      image:''
    },
  });
 
  const users = await prisma.user.findMany();
  console.log(users);
}
prismaExample()