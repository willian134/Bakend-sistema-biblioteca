import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateLoanDto {
  @IsString()
  @IsNotEmpty({ message: "El ID de usuario es requerido" })
  userId!: string;

  @IsString()
  @IsNotEmpty({ message: "El ID del libro es requerido" })
  bookId!: string;

  @IsDateString({}, { message: "Debe ser una fecha v�lida (ISO 8601)" })
  returnDate!: string;
}
