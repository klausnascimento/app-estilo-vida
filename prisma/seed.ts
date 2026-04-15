import { PrismaClient } from '@prisma/client';
import { MOCK_USER_ID } from '../types';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // 1. Create Default User
  const user = await prisma.user.upsert({
    where: { email: 'admin@estilovida.local' },
    update: {},
    create: {
      id: MOCK_USER_ID,
      name: 'Administrador Estilo Vida',
      email: 'admin@estilovida.local',
    },
  });

  // 2. Insert Portuguese Verses
  const versesPT = [
    { text: 'Tudo posso naquele que me fortalece.', reference: 'Filipenses 4:13', language: 'PT_BR' },
    { text: 'O Senhor é o meu pastor, nada me faltará.', reference: 'Salmos 23:1', language: 'PT_BR' },
    { text: 'Entrega o teu caminho ao Senhor; confia nele, e ele o fará.', reference: 'Salmos 37:5', language: 'PT_BR' }
  ];
  
  // 3. Insert English Verses
  const versesEN = [
    { text: 'I can do all things through Christ who strengthens me.', reference: 'Philippians 4:13', language: 'EN' },
    { text: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1', language: 'EN' }
  ];
  
  // 4. Insert Spanish Verses
  const versesES = [
    { text: 'Todo lo puedo en Cristo que me fortalece.', reference: 'Filipenses 4:13', language: 'ES' },
    { text: 'El Señor es mi pastor, nada me faltará.', reference: 'Salmos 23:1', language: 'ES' }
  ];

  await prisma.dailyBibleVerse.createMany({
    data: [...versesPT, ...versesEN, ...versesES]
  });

  // Motivational Quotes
  await prisma.dailyMotivation.createMany({
    data: [
      { text: 'A disciplina é a ponte entre as metas e as realizações.', language: 'PT_BR' },
      { text: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.', language: 'PT_BR' },
      { text: 'Discipline is the bridge between goals and accomplishment.', language: 'EN' },
      { text: 'La disciplina es el puente entre las metas y los logros.', language: 'ES' },
    ]
  });

  console.log('Seed finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
