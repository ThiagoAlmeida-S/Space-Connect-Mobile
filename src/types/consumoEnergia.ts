export type FonteEnergia = 'SOLAR' | 'NUCLEAR' | 'BATERIA';
export type StatusConsumo = 'NORMAL' | 'ATENCAO' | 'CRITICO';

export interface ConsumoEnergia {
  id: number;
  nomeSetor: string;
  consumoKwh: number;
  percentualConsumo: number;
  status: StatusConsumo;
  dataRegistro: string;
  fonte: FonteEnergia;
}