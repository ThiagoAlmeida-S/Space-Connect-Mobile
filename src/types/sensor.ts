export type StatusSensor = 'OPERACIONAL' | 'DEFEITO' | 'MANUTENCAO';

export interface Sensor {
  id: number;
  nome: string;
  tipo: string;
  localizacao: string;
  ativo: boolean;
  ultimaLeitura: number;
  dataLeitura: string;
  status: StatusSensor;
  limiteMinimo: number;
  limiteMaximo: number;
}