import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Alerta } from '../types/alerta';

interface Props {
  alerta: Alerta;
}

const getNivelColor = (nivel: string) => {
  switch (nivel) {
    case 'INFO': return '#4A90D9';
    case 'AVISO': return '#FFB300';
    case 'CRITICO': return '#FF4444';
    default: return '#888';
  }
};

export default function AlertaCard({ alerta }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{alerta.titulo}</Text>
        <View style={[styles.badge, { backgroundColor: getNivelColor(alerta.nivel) }]}>
          <Text style={styles.badgeText}>{alerta.nivel}</Text>
        </View>
      </View>

      <Text style={styles.info}>Descrição: <Text style={styles.valor}>{alerta.descricao}</Text></Text>
      <Text style={styles.info}>Recurso: <Text style={styles.valor}>{alerta.recursoAfetado}</Text></Text>
      <Text style={styles.info}>Status: <Text style={[styles.valor, { color: alerta.resolvido ? '#00C851' : '#FF4444' }]}>
        {alerta.resolvido ? 'Resolvido' : 'Pendente'}
      </Text></Text>
      {alerta.resolvidoPor ? (
        <Text style={styles.info}>Resolvido por: <Text style={styles.valor}>{alerta.resolvidoPor}</Text></Text>
      ) : null}
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
  titulo: {
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