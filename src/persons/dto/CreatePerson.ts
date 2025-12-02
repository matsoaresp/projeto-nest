import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { TipoPessoa } from '../enums/personEnum';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  matricula: string;

  @IsEnum(TipoPessoa)
  tipo: TipoPessoa;
}
