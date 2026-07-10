import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LoansService {
  private prisma = new PrismaClient();

  // 1. Obtener todos los préstamos con sus relaciones
  async findAll() {
    return this.prisma.loan.findMany({
      include: {
        book: true,
        user: true,
      },
    });
  }

  // 2. Obtener un préstamo por ID
  async findOne(id: string) {
    const loan = await this.prisma.loan.findUnique({
      where: { id },
      include: { book: true, user: true },
    });
    if (!loan) throw new NotFoundException('Préstamo no encontrado');
    return loan;
  }

  // 3. Crear un préstamo disminuyendo el stock (-1)
  async create(createLoanDto: any) {
    const targetBookId = createLoanDto.bookId || createLoanDto.libroId;
    const targetUserId = createLoanDto.userId || createLoanDto.usuarioId;

    if (!targetBookId) throw new BadRequestException('El ID del libro es requerido');

    // Verificar si el libro existe y tiene stock disponible
    const libro = await this.prisma.book.findUnique({ where: { id: targetBookId } });
    if (!libro) throw new NotFoundException('El libro seleccionado no existe');
    
    if (libro.stock !== undefined && libro.stock <= 0) {
      throw new BadRequestException('No hay stock disponible para este libro');
    }

    // Transacción nativa: Crea el préstamo y resta 1 al stock del libro (Sin el campo 'costo')
    const [nuevoPrestamo] = await this.prisma.$transaction([
      this.prisma.loan.create({
        data: {
          loanDate: createLoanDto.loanDate ? new Date(createLoanDto.loanDate) : new Date(),
          returnDate: createLoanDto.returnDate ? new Date(createLoanDto.returnDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          status: createLoanDto.status || createLoanDto.estado || 'Prestado',
          book: { connect: { id: targetBookId } },
          user: { connect: { id: targetUserId } },
        },
      }),
      this.prisma.book.update({
        where: { id: targetBookId },
        data: {
          stock: { decrement: 1 } // Resta 1 unidad del catálogo
        }
      })
    ]);

    return nuevoPrestamo;
  }

  // 4. Actualizar Préstamo (Devolución) incrementando el stock (+1)
  async update(id: string, updateLoanDto: any) {
    const nuevoEstado = updateLoanDto.status || updateLoanDto.estado || 'DEVUELTO';
    
    // Buscamos el préstamo para saber qué libro hay que devolver
    const loanExistente = await this.prisma.loan.findUnique({
      where: { id },
    });

    if (!loanExistente) throw new NotFoundException('Préstamo no encontrado');

    // Si ya fue devuelto en la base de datos, solo actualizamos los campos informativos sin alterar stock
    if (String(loanExistente.status).toUpperCase() === 'DEVUELTO') {
      return this.prisma.loan.update({
        where: { id },
        data: {
          status: nuevoEstado,
          returnDate: new Date(),
        },
      });
    }

    // Transacción: Cambia el estado a DEVUELTO y suma 1 al stock del libro de forma segura
    const [loanActualizado] = await this.prisma.$transaction([
      this.prisma.loan.update({
        where: { id },
        data: {
          status: nuevoEstado,
          returnDate: new Date(),
        },
      }),
      this.prisma.book.update({
        where: { id: loanExistente.bookId },
        data: {
          stock: { increment: 1 } // Devuelve la unidad al catálogo
        },
      }),
    ]);

    return loanActualizado;
  }

  // 5. Eliminar un préstamo
  async remove(id: string) {
    return this.prisma.loan.delete({
      where: { id },
    });
  }
}