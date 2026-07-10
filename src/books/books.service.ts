import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BooksService {
  private prisma = new PrismaClient();

  // Crear un nuevo libro incluyendo el campo obligatorio ISBN
  async create(createBookDto: any) {
    return this.prisma.book.create({
      data: {
        title: createBookDto.title || createBookDto.titulo,
        author: createBookDto.author || createBookDto.autor,
        // Generamos un string por defecto si no viene en el payload para evitar el crash de TS
        isbn: createBookDto.isbn || `ISBN-${Math.floor(Math.random() * 1000000)}`, 
        stock: createBookDto.stock !== undefined ? Number(createBookDto.stock) : 1,
      },
    });
  }

  // Obtener todo el catálogo
  async findAll() {
    return this.prisma.book.findMany();
  }

  // Obtener un solo libro por ID
  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('Libro no encontrado');
    return book;
  }

  // Modificar stock o propiedades del libro
  async update(id: string, updateBookDto: any) {
    await this.findOne(id); // Valida si existe
    return this.prisma.book.update({
      where: { id },
      data: {
        title: updateBookDto.title || updateBookDto.titulo,
        author: updateBookDto.author || updateBookDto.autor,
        isbn: updateBookDto.isbn || undefined,
        stock: updateBookDto.stock !== undefined ? Number(updateBookDto.stock) : undefined,
      },
    });
  }

  // Eliminar un libro
  async remove(id: string) {
    await this.findOne(id); // Valida si existe
    return this.prisma.book.delete({ where: { id } });
  }
}