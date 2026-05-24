import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Climatizacao } from '../types/climatizacao';

interface Props {
  climatizacao: Climatizacao;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'NORMAL': return '#00C851';
    case 'ALERTA': return '#FFB300';
    case 'CRITICO': return '#FF4444';
    default: return '#888';
  }
};

export default function ClimatizacaoCard({ climatizacao }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nome}>{climatizacao.setor}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(climatizacao.status) }]}>
          <Text style={styles.badgeText}>{climatizacao.status}</Text>
        </View>
      </View>
      <Text style={styles.info}>Temp. Atual: <Text style={styles.valor}>{climatizacao.temperaturaAtual}°C</Text></Text>
      <Text style={styles.info}>Temp. Desejada: <Text style={styles.valor}>{climatizacao.temperaturaDesejada}°C</Text></Text>
      <Text style={styles.info}>Umidade: <Text style={styles.valor}>{climatizacao.umidade}%</Text></Text>
      <Text style={styles.info}>Pressão: <Text style={styles.valor}>{climatizacao.pressaoAtmosferica} hPa</Text></Text>
      <Text style={styles.info}>Sistema: <Text style={styles.valor}>{climatizacao.sistemaAtivo ? 'Ativo' : 'Inativo'}</Text></Text>
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