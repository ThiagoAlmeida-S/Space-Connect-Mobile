export type StatusReservatorio = 'NORMAL' | 'ALERTA' | 'CRITICO';

export interface Reservatorio {
  id: number;
  nome: string;
  tipo: string;
  capacidadeMaxima: number;
  nivelAtual: number;
  nivelCritico: number;
  percentualAtual: number;
  unidade: string;
  status: StatusReservatorio;
}