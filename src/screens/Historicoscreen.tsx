import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
 StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { api } from '../services/api';

import AlertaCard from '../components/AlertaCard';
import SensorCard from '../components/SensorCard';
import ReservatorioCard from '../components/ReservatorioCard';
import ClimatizacaoCard from '../components/ClimatizacaoCard';

import { historicoStorage } from '../storage/historicoStorage';

export default function HistoricoScreen() {

  const [alertas, setAlertas] = useState<any[]>([]);
  const [sensores, setSensores] = useState<any[]>([]);
  const [reservatorios, setReservatorios] = useState<any[]>([]);
  const [climatizacao, setClimatizacao] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const carregarHistorico = async () => {

    try {

      const ocultos = historicoStorage.obterOcultos();

      const [a, s, r, c] = await Promise.all([
        api.getAlertas(),
        api.getSensores(),
        api.getReservatorios(),
        api.getClimatizacao(),
      ]);

      const alertasFiltrados = a.filter((item: any) => {

        const chave = `alerta-${item.id}`;

        return (
          (item.nivel === 'CRITICO' || item.nivel === 'AVISO')
          &&
          !ocultos.includes(chave)
        );

      });

      const sensoresFiltrados = s.filter((item: any) => {

        const chave = `sensor-${item.id}`;

        return (
          (item.status === 'DEFEITO' || item.status === 'MANUTENCAO')
          &&
          !ocultos.includes(chave)
        );

      });

      const reservatoriosFiltrados = r.filter((item: any) => {

        const chave = `reservatorio-${item.id}`;

        return (
          (item.status === 'CRITICO' || item.status === 'ALERTA')
          &&
          !ocultos.includes(chave)
        );

      });

      const climatizacaoFiltrada = c.filter((item: any) => {

        const chave = `climatizacao-${item.id}`;

        return (
          (item.status === 'CRITICO' || item.status === 'ALERTA')
          &&
          !ocultos.includes(chave)
        );

      });

      setAlertas(alertasFiltrados);
      setSensores(sensoresFiltrados);
      setReservatorios(reservatoriosFiltrados);
      setClimatizacao(climatizacaoFiltrada);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  const limparHistoricoVisual = () => {

    const chaves = [

      ...alertas.map(i => `alerta-${i.id}`),

      ...sensores.map(i => `sensor-${i.id}`),

      ...reservatorios.map(i => `reservatorio-${i.id}`),

      ...climatizacao.map(i => `climatizacao-${i.id}`),

    ];

    historicoStorage.adicionarOcultos(chaves);

    setAlertas([]);
    setSensores([]);
    setReservatorios([]);
    setClimatizacao([]);

    setModalVisible(false);

  };

  if (loading) {

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90D9" />
        <Text style={styles.loadingText}>
          Carregando histórico...
        </Text>
      </View>
    );

  }

  return (

    <View style={styles.container}>

      <Modal visible={modalVisible} transparent animationType="fade">

        <View style={styles.modalOverlay}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
              🗑️ Limpar Histórico
            </Text>

            <Text style={styles.modalText}>
              Deseja limpar o histórico exibido no aplicativo?
            </Text>

            <View style={styles.modalButtons}>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={limparHistoricoVisual}
              >
                <Text style={styles.confirmText}>
                  Limpar
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

      <View style={styles.header}>

        <Text style={styles.title}>
          Histórico
        </Text>

        <Text style={styles.subtitle}>
          Eventos críticos e alertas da base lunar
        </Text>

      </View>

      <ScrollView contentContainerStyle={styles.list}>

        {alertas.map((item) => (
          <AlertaCard key={item.id} alerta={item} />
        ))}

        {sensores.map((item) => (
          <SensorCard key={item.id} sensor={item} />
        ))}

        {reservatorios.map((item) => (
          <ReservatorioCard key={item.id} reservatorio={item} />
        ))}

        {climatizacao.map((item) => (
          <ClimatizacaoCard key={item.id} climatizacao={item} />
        ))}

        {alertas.length === 0 &&
          sensores.length === 0 &&
          reservatorios.length === 0 &&
          climatizacao.length === 0 && (

            <Text style={styles.emptyText}>
              Nenhum evento encontrado.
            </Text>

          )}

        <View style={{ height: 120 }} />

      </ScrollView>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.deleteButtonText}>
          🗑️ Limpar Histórico
        </Text>
      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#12121E',
  },

  header: {
    padding: 24,
    paddingTop: 50,
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#888',
    marginTop: 4,
  },

  list: {
    paddingHorizontal: 16,
  },

  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },

  deleteButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: '#2A0F16',
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  deleteButtonText: {
    color: '#FF4444',
    fontWeight: 'bold',
    fontSize: 14,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#12121E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#888',
    marginTop: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '85%',
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2E2E4E',
  },

  modalTitle: {
    color: '#FF4444',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  modalText: {
    color: '#CCC',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },

  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E2E4E',
  },

  cancelText: {
    color: '#888',
    fontWeight: 'bold',
  },

  confirmButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2A0F16',
    borderWidth: 1,
    borderColor: '#FF4444',
  },

  confirmText: {
    color: '#FF4444',
    fontWeight: 'bold',
  },

});