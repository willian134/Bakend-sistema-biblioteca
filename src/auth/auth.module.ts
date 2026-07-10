import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service'; // 👈 Asegúrate de que la ruta apunte a tu PrismaService

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY_POR_DEFECTO',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    PrismaService // 👈 AGREGADO AQUÍ para que AuthService pueda usarlo
  ],
  exports: [JwtModule], 
})
export class AuthModule {}