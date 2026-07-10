import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtiene todos los usuarios reales de PostgreSQL para pintar la tabla del Panel
  async findAll() {
    try {
      return await (this.prisma as any).user.findMany();
    } catch {
      return await (this.prisma as any).users.findMany();
    }
  }

  async create(data: any) {
    const usuarioLimpio = {
      name: data.name || data.role || 'Usuario',
      email: data.email,
      password: data.password,
      role: data.role || 'CLIENTE',
    };

    try {
      return await (this.prisma as any).user.create({ data: usuarioLimpio });
    } catch {
      return await (this.prisma as any).users.create({ data: usuarioLimpio });
    }
  }

  async findByEmail(email: string) {
    try {
      return await (this.prisma as any).user.findUnique({ where: { email } });
    } catch {
      return await (this.prisma as any).users.findUnique({ where: { email } });
    }
  }

  async findOne(id: string) {
    try {
      return await (this.prisma as any).user.findUnique({ where: { id } });
    } catch {
      return await (this.prisma as any).users.findUnique({ where: { id } });
    }
  }
}