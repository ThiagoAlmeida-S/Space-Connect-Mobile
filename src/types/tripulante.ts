export type CargaTripulante = 'COMANDANTE' | 'ENGENHEIRO' | 'CIENTISTA' | 'MEDICO';
export type StatusSaude = 'BEM' | 'MONITORAMENTO' | 'CRITICO';

export interface Tripulante {
  id: number;
  nome: string;
  dataEntrada: string;
  cargo: CargaTripulante;
  statusSaude: StatusSaude;
}