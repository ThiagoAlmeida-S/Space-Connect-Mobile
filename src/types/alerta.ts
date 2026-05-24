export type NivelAlerta = 'INFO' | 'AVISO' | 'CRITICO';

export interface Alerta {
  id: number;
  titulo: string;
  descricao: string;
  recursoAfetado: string;
  resolvidoPor: string;
  resolvido: boolean;
  dataHora: string;
  nivel: NivelAlerta;
}