export type FonteEnergia = 'SOLAR' | 'NUCLEAR' | 'BATERIA';

export interface ConsumoEnergia {
  id: number;
  nomeSetor: string;
  consumoKwh: number;
  dataRegistro: string;
  fonte: FonteEnergia;
}