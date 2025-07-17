import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  password: string;
}
