export class CreateDto {
<<<<<<< Updated upstream
    name: string;
    matricula: string;
    email: string;
    tipo: 'aluno' | 'professor';
}
=======
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  matricula: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(TipoPessoa)
  tipo: TipoPessoa;
}
>>>>>>> Stashed changes
