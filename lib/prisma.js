// import { PrismaClient } from '@prisma/client';
const {PrismaClient} = require('@prisma/client')
 
const prisma = new PrismaClient();
 
 async function prismaExample() {
  const videos = await prisma.video.findMany();
  console.log(videos);
}
prismaExample()