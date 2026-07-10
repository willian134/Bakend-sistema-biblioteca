import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  name: string;

  @IsEmail({}, { message: "Debe ingresar un correo válido" })
  email: string;

  @IsString()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password: string;

  @IsString()
  @IsOptional()
  role?: string;
}
