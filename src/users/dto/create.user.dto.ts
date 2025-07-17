import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  password: string;
}
