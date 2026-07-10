import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: "Debe ingresar un email valido" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "La clave debe tener al menos 6 caracteres" })
  password!: string;
}