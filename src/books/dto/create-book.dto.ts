import { IsString, IsNotEmpty, IsInt, Min } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: "El título es obligatorio" })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "El autor es obligatorio" })
  author: string;

  @IsString()
  @IsNotEmpty({ message: "El ISBN es obligatorio" })
  isbn: string;

  @IsInt()
  @Min(0, { message: "El stock no puede ser negativo" })
  stock: number;
}
