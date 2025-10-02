import { ParcelaDto } from './parcela.model';

export interface TituloDto {
  numeroTitulo?: number;
  nomeDevedor: string;
  cpf: string;
  porcentagemJuros: number;
  porcentagemMulta: number;
  parcelas: ParcelaDto[];
  valorOriginal: number;
  diasAtraso: number;
  valorAtualizado: number;
}
