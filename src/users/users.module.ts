import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service'; // Ajusta la ruta con un (.) o (..) si te marcara alguna línea roja

@Module({
  controllers: [UsersController],
  // 🔑 Registramos PrismaService para que UsersService pueda usarlo sin reventar
  providers: [UsersService, PrismaService],
  // Si tu AuthModule necesita leer este servicio, exportarlo ayuda:
  exports: [UsersService], 
})
export class UsersModule {}