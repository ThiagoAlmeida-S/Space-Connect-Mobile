import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConsumoEnergia } from '../types/consumoEnergia';

interface Props {
  consumo: ConsumoEnergia;
}

const getFonteEmoji = (fonte: string) => {
  switch (fonte) {
    case 'SOLAR': return '☀️';
    case 'NUCLEAR': return '⚛️';
    case 'BATERIA': return '🔋';
    default: return '⚡';
  }
};

const getFonteColor = (fonte: string) => {
  switch (fonte) {
    case 'SOLAR': return '#FFB300';
    case 'NUCLEAR': return '#00C851';
    case 'BATERIA': return '#4A90D9';
    default: return '#888';
  }
};

export default function ConsumoEnergiaCard({ consumo }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{consumo.nomeSetor}</Text>
        <View style={[styles.badge, { backgroundColor: getFonteColor(consumo.fonte) }]}>
          <Text style={styles.badgeText}>{getFonteEmoji(consumo.fonte)} {consumo.fonte}</Text>
        </View>
      </View>

      <Text style={styles.info}>Consumo: <Text style={styles.valor}>{consumo.consumoKwh} kWh</Text></Text>
      <Text style={styles.info}>Data: <Text style={styles.valor}>{new Date(consumo.dataRegistro).toLocaleString('pt-BR')}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2E2E4E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  info: {
    color: '#888',
    fontSize: 13,
    marginBottom: 4,
  },
  valor: {
    color: '#CCCCCC',
    fontWeight: 'bold',
  },
});