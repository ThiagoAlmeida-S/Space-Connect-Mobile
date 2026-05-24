export type StatusClimatizacao = 'NORMAL' | 'ALERTA' | 'CRITICO';

export interface Climatizacao {
  id: number;
  setor: string;
  temperaturaAtual: number;
  temperaturaDesejada: number;
  umidade: number;
  pressaoAtmosferica: number;
  sistemaAtivo: boolean;
  status: StatusClimatizacao;
}