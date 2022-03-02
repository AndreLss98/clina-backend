import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { hashSync } from 'bcrypt';

async function seedDb() {
  const defaultUser = await prisma.user.upsert({
    where: { email: 'default@email.com' },
    update: {},
    create: {
      email: 'default@email.com',
      name: 'Default user',
      password: hashSync('123456', 10),
      avatar:
        'https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
    },
  });

  const defaultRoom = await prisma.room.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Burj Khalifa',
      description:
        'Aenean finibus semper erat, sed varius neque lobortis non. Phasellus sit amet ligula egestas, condimentum enim sed, mollis justo. Vivamus sit amet feugiat sapien. Maecenas non justo id ipsum egestas dignissim. Nam consequat porttitor velit. Etiam et enim ac dui semper scelerisque. Cras mollis massa iaculis molestie bibendum.',
      userId: defaultUser.id,
      address: {
        create: {
          address: 'Rua São Salvador 625',
          number: 72,
          complement: 'Quadra 10, Lote 02',
          district: 'Setor Central',
          city: 'Guapó',
          state: 'Goias',
          cep: '75354970',
        },
      },
      photos: {
        createMany: {
          data: [
            { url: 'https://google.com/public/123412341.png' },
            { url: 'https://google.com/public/asdafdsas.png' },
          ],
        },
      },
    },
  });

  const defautlSchedule = await prisma.schedule.upsert({
    where: { id: 1 },
    update: {},
    create: {
      period: 'MORNING',
      fromDate: new Date('2022-03-06'),
      toDate: new Date('2022-03-09'),
      roomId: defaultRoom.id,
      userId: defaultUser.id,
    },
  });

  console.log({ defaultUser, defaultRoom, defautlSchedule });
}

seedDb()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
