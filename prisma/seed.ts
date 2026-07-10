import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando el sembrado de la base de datos...');

  // 1. Crear Usuario Administrador
  const admin = await prisma.user.upsert({
    where: { email: 'admin@biblioteca.com' },
    update: {},
    create: {
      id: 'user-admin-01',
      name: ' Admin',
      email: 'admin@biblioteca.com',
      password: 'admin123', // Lo ideal en producción es usar bcrypt, pero para pruebas sirve
      role: 'ADMIN',
    },
  });

  // 2. Crear Usuario Bibliotecario
  const bibliotecario = await prisma.user.upsert({
    where: { email: 'bibliotecario@biblioteca.com' },
    update: {},
    create: {
      id: 'user-biblio-02',
      name: 'Bibliotecaria',
      email: 'bibliotecario@biblioteca.com',
      password: 'biblio123',
      role: 'BIBLIOTECARIO',
    },
  });

  // 3. Crear Usuario Cliente
  const cliente = await prisma.user.upsert({
    where: { email: 'cliente@biblioteca.com' },
    update: {},
    create: {
      id: 'user-cliente-03',
      name: ' Cliente',
      email: 'cliente@biblioteca.com',
      password: 'cliente123',
      role: 'CLIENTE',
    },
  });

  // 4. Crear Usuario Estudiante
  const estudiante = await prisma.user.upsert({
    where: { email: 'estudiante@biblioteca.com' },
    update: {},
    create: {
      id: 'user-estudiante-04',
      name: ' Estudiante',
      email: 'estudiante@biblioteca.com',
      password: 'estudiante123',
      role: 'ESTUDIANTE',
    },
  });

  console.log('✅ Base de datos sembrada con éxito:');
  console.log({ admin, bibliotecario, cliente, estudiante });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });