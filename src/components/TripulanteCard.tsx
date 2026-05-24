import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tripulante } from '../types/tripulante';

interface Props {
  tripulante: Tripulante;
}

const getSaudeColor = (status: string) => {
  switch (status) {
    case 'BEM': return '#00C851';
    case 'MONITORAMENTO': return '#FFB300';
    case 'CRITICO': return '#FF4444';
    default: return '#888';
  }
};

const getCargoEmoji = (cargo: string) => {
  switch (cargo) {
    case 'COMANDANTE': return '👨‍✈️';
    case 'ENGENHEIRO': return '👨‍🔧';
    case 'CIENTISTA': return '👨‍🔬';
    case 'MEDICO': return '👨‍⚕️';
    default: return '👤';
  }
};

export default function TripulanteCard({ tripulante }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{getCargoEmoji(tripulante.cargo)} {tripulante.nome}</Text>
        <View style={[styles.badge, { backgroundColor: getSaudeColor(tripulante.statusSaude) }]}>
          <Text style={styles.badgeText}>{tripulante.statusSaude}</Text>
        </View>
      </View>

      <Text style={styles.info}>Cargo: <Text style={styles.valor}>{tripulante.cargo}</Text></Text>
      <Text style={styles.info}>Entrada: <Text style={styles.valor}>{tripulante.dataEntrada}</Text></Text>
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