import { TipoPessoa } from '../enums/personEnum';

export type CreatePersonParams = {
  name: string;
  matricula: string;
  email: string;
  tipo: TipoPessoa;
};
