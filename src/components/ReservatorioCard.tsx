import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Reservatorio } from '../types/reservatorio';

interface Props {
  reservatorio: Reservatorio;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'NORMAL': return '#00C851';
    case 'ALERTA': return '#FFB300';
    case 'CRITICO': return '#FF4444';
    default: return '#888';
  }
};

export default function ReservatorioCard({ reservatorio }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{reservatorio.nome}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(reservatorio.status) }]}>
          <Text style={styles.badgeText}>{reservatorio.status}</Text>
        </View>
      </View>
      <Text style={styles.info}>Tipo: <Text style={styles.valor}>{reservatorio.tipo}</Text></Text>
      <Text style={styles.info}>Nível Atual: <Text style={styles.valor}>{reservatorio.nivelAtual} {reservatorio.unidade}</Text></Text>
      <Text style={styles.info}>Capacidade: <Text style={styles.valor}>{reservatorio.capacidadeMaxima} {reservatorio.unidade}</Text></Text>
      <Text style={styles.info}>Percentual: <Text style={styles.valor}>{reservatorio.percentualAtual.toFixed(1)}%</Text></Text>
      <Text style={styles.info}>Nível Crítico: <Text style={styles.valor}>{reservatorio.nivelCritico} {reservatorio.unidade}</Text></Text>
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