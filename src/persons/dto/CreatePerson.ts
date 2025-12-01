export class CreateDto {
    name: string;
    matricula: string;
    email: string;
    tipo: 'aluno' | 'professor';
}