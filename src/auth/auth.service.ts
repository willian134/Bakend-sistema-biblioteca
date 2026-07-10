import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const { password, ...result } = user;
    return { message: 'Login correcto', user: result };
  }
}