import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sensor } from '../types/sensor';

interface Props {
  sensor: Sensor;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'OPERACIONAL': return '#00C851';
    case 'MANUTENCAO': return '#FFB300';
    case 'DEFEITO': return '#FF4444';
    default: return '#888';
  }
};

export default function SensorCard({ sensor }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{sensor.nome}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(sensor.status) }]}>
          <Text style={styles.badgeText}>{sensor.status}</Text>
        </View>
      </View>
      <Text style={styles.info}>Tipo: <Text style={styles.valor}>{sensor.tipo}</Text></Text>
      <Text style={styles.info}>Localização: <Text style={styles.valor}>{sensor.localizacao}</Text></Text>
      <Text style={styles.info}>Última Leitura: <Text style={styles.valor}>{sensor.ultimaLeitura}</Text></Text>
      <Text style={styles.info}>Limite: <Text style={styles.valor}>{sensor.limiteMinimo} - {sensor.limiteMaximo}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E1E2E', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#2E2E4E' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nome: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  info: { color: '#888', fontSize: 13, marginBottom: 4 },
  valor: { color: '#CCCCCC', fontWeight: 'bold' },
});