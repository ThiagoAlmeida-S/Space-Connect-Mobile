import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, RefreshControl,
  Modal, FlatList
} from 'react-native';
import { api } from '../services/api';
import { Sensor } from '../types/sensor';
import { Reservatorio } from '../types/reservatorio';
import { Climatizacao } from '../types/climatizacao';
import { Alerta } from '../types/alerta';
import { Tripulante } from '../types/tripulante';
import { ConsumoEnergia } from '../types/consumoEnergia';
import SensorCard from '../components/SensorCard';
import ReservatorioCard from '../components/ReservatorioCard';
import ClimatizacaoCard from '../components/ClimatizacaoCard';
import AlertaCard from '../components/AlertaCard';
import TripulanteCard from '../components/TripulanteCard';
import ConsumoEnergiaCard from '../components/ConsumoEnergiaCard';

type FiltroCor = 'TODOS' | 'BOM' | 'ATENCAO' | 'CRITICO';
type FiltroTipo = 'TODOS' | 'SENSORES' | 'RESERVATORIOS' | 'CLIMATIZACAO' | 'ALERTAS' | 'TRIPULANTES' | 'ENERGIA';

type ModalConfig = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
};

const nomesTripulantes = ['João Faria', 'Maria Silva', 'Carlos Souza', 'Ana Lima', 'Pedro Costa'];
const cargosTripulantes = ['COMANDANTE', 'ENGENHEIRO', 'CIENTISTA', 'MEDICO'];
const statusSaude = ['BEM', 'MONITORAMENTO', 'CRITICO'];
const fontesEnergia = ['SOLAR', 'NUCLEAR', 'BATERIA'];
const setores = ['Módulo de Habitação', 'Módulo Científico', 'Módulo de Energia', 'Módulo de Suporte'];
const niveisAlerta = ['INFO', 'AVISO', 'CRITICO'];
const titulosAlerta = [
  'Temperatura Elevada',
  'Nível Crítico de Oxigênio',
  'Falha no Sistema de Energia',
  'Pressão Atmosférica Baixa',
];

export default function DashboardScreen() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [reservatorios, setReservatorios] = useState<Reservatorio[]>([]);
  const [climatizacao, setClimatizacao] = useState<Climatizacao[]>([]);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [tripulantes, setTripulantes] = useState<Tripulante[]>([]);
  const [consumos, setConsumos] = useState<ConsumoEnergia[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [simulando, setSimulando] = useState(false);
  const [apiOnline, setApiOnline] = useState(true);
  const [filtroCor, setFiltroCor] = useState<FiltroCor>('TODOS');
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('TODOS');
  const [dadosSimulados, setDadosSimulados] = useState(false);
  const [modal, setModal] = useState<ModalConfig>({
    visible: false,
    title: '',
    message: '',
  });

  const showModal = (config: Omit<ModalConfig, 'visible'>) => {
    setModal({ ...config, visible: true });
  };

  const hideModal = () => {
    setModal(prev => ({ ...prev, visible: false }));
  };

  const carregarDados = async () => {
    try {
      const [s, r, c, a, t, e] = await Promise.all([
        api.getSensores(),
        api.getReservatorios(),
        api.getClimatizacao(),
        api.getAlertas(),
        api.getTripulantes(),
        api.getConsumoEnergia(),
      ]);
      setSensores(s.slice(-3));
      setReservatorios(r.slice(-2));
      setClimatizacao(c.slice(-2));
      setAlertas(a.slice(-1));
      setTripulantes(t.slice(-1));
      setConsumos(e.slice(-1));
      setApiOnline(true);
    } catch {
      setApiOnline(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setDadosSimulados(false);
    carregarDados();
  };

  const confirmarSimulacao = () => {
    showModal({
      title: '🚀 Simular Base Lunar',
      message: 'Deseja simular todos os recursos da base?\n\nNovas leituras serão geradas para sensores, reservatórios, climatização, tripulantes, alertas e consumo de energia.',
      confirmText: 'Simular',
      cancelText: 'Cancelar',
      showCancel: true,
      onConfirm: async () => {
        hideModal();
        setDadosSimulados(false);
        await simularTudo();
      },
    });
  };

  const simularTudo = async () => {
    setSimulando(true);
    try {
      const idsUnicos = {
        sensores: [...new Set(sensores.map(s => s.id))].slice(0, 4),
        reservatorios: [...new Set(reservatorios.map(r => r.id))].slice(0, 4),
        climatizacao: [...new Set(climatizacao.map(c => c.id))].slice(0, 4),
      };

      const [novosSensores, novosReservatorios, novosClimas] = await Promise.all([
        Promise.all(idsUnicos.sensores.map(id => api.simularSensor(id))),
        Promise.all(idsUnicos.reservatorios.map(id => api.simularReservatorio(id))),
        Promise.all(idsUnicos.climatizacao.map(id => api.simularClimatizacao(id))),
      ]);

      const novoTripulante = await api.criarTripulante({
        nome: nomesTripulantes[Math.floor(Math.random() * nomesTripulantes.length)],
        dataEntrada: new Date().toISOString().split('T')[0],
        cargo: cargosTripulantes[Math.floor(Math.random() * cargosTripulantes.length)],
        statusSaude: statusSaude[Math.floor(Math.random() * statusSaude.length)],
      });

      const novoAlerta = await api.criarAlerta({
        titulo: titulosAlerta[Math.floor(Math.random() * titulosAlerta.length)],
        descricao: 'Alerta simulado automaticamente',
        recursoAfetado: setores[Math.floor(Math.random() * setores.length)],
        resolvidoPor: '',
        resolvido: false,
        dataHora: new Date().toISOString(),
        nivel: niveisAlerta[Math.floor(Math.random() * niveisAlerta.length)],
      });

      const novoConsumo = await api.criarConsumoEnergia({
        nomeSetor: setores[Math.floor(Math.random() * setores.length)],
        consumoKwh: parseFloat((Math.random() * 300 + 50).toFixed(1)),
        dataRegistro: new Date().toISOString(),
        fonte: fontesEnergia[Math.floor(Math.random() * fontesEnergia.length)],
      });

      setSensores(novosSensores);
      setReservatorios(novosReservatorios);
      setClimatizacao(novosClimas);
      setTripulantes([novoTripulante]);
      setAlertas([novoAlerta]);
      setConsumos([novoConsumo]);
      setDadosSimulados(true);
      setFiltroCor('TODOS');
      setFiltroTipo('TODOS');

      showModal({
        title: '✅ Simulação concluída!',
        message: 'Mostrando os dados simulados agora. Puxe para baixo para ver todos os registros.',
        confirmText: 'OK',
        showCancel: false,
      });
    } catch {
      showModal({
        title: 'Erro',
        message: 'Não foi possível simular os recursos. Verifique a conexão com a API.',
        confirmText: 'OK',
        showCancel: false,
      });
    } finally {
      setSimulando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const isBom = (item: any) =>
    item.status === 'OPERACIONAL' || item.status === 'NORMAL' || item.status === 'BEM';

  const isAtencao = (item: any) =>
    item.status === 'MANUTENCAO' || item.status === 'ALERTA' || item.status === 'MONITORAMENTO' ||
    item.nivel === 'AVISO' || item.nivel === 'INFO';

  const isCritico = (item: any) =>
    item.status === 'DEFEITO' || item.status === 'CRITICO' || item.nivel === 'CRITICO';

  const aplicarFiltroCor = (lista: any[]) => {
    if (filtroCor === 'BOM') return lista.filter(isBom);
    if (filtroCor === 'ATENCAO') return lista.filter(isAtencao);
    if (filtroCor === 'CRITICO') return lista.filter(isCritico);
    return lista;
  };

  const totalBom = [...sensores, ...reservatorios, ...climatizacao, ...tripulantes].filter(isBom).length;
  const totalAtencao = [...sensores, ...reservatorios, ...climatizacao, ...alertas].filter(isAtencao).length;
  const totalCritico = [...sensores, ...reservatorios, ...climatizacao, ...alertas].filter(isCritico).length;

  if (!apiOnline) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineEmoji}>🔌</Text>
        <Text style={styles.offlineTitle}>API Offline</Text>
        <Text style={styles.offlineText}>
          Não foi possível conectar ao servidor. Verifique se a API está rodando em localhost:8080
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={carregarDados}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90D9" />
        <Text style={styles.loadingText}>Conectando à base lunar...</Text>
      </View>
    );
  }

  const renderConteudo = () => {
    const mostrarTipo = (tipo: FiltroTipo) => filtroTipo === 'TODOS' || filtroTipo === tipo;
    return (
      <>
        {mostrarTipo('SENSORES') && aplicarFiltroCor(sensores).map(s => <SensorCard key={s.id} sensor={s} />)}
        {mostrarTipo('RESERVATORIOS') && aplicarFiltroCor(reservatorios).map(r => <ReservatorioCard key={r.id} reservatorio={r} />)}
        {mostrarTipo('CLIMATIZACAO') && aplicarFiltroCor(climatizacao).map(c => <ClimatizacaoCard key={c.id} climatizacao={c} />)}
        {mostrarTipo('ALERTAS') && aplicarFiltroCor(alertas).map(a => <AlertaCard key={a.id} alerta={a} />)}
        {mostrarTipo('TRIPULANTES') && aplicarFiltroCor(tripulantes).map(t => <TripulanteCard key={t.id} tripulante={t} />)}
        {mostrarTipo('ENERGIA') && aplicarFiltroCor(consumos).map(c => <ConsumoEnergiaCard key={c.id} consumo={c} />)}
      </>
    );
  };

  return (
    <View style={styles.container}>

      
      <Modal visible={modal.visible} transparent animationType="fade" onRequestClose={hideModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{modal.title}</Text>
            <Text style={styles.modalMessage}>{modal.message}</Text>
            <View style={styles.modalButtons}>
              {modal.showCancel && (
                <TouchableOpacity style={styles.modalButtonCancel} onPress={hideModal}>
                  <Text style={styles.modalButtonCancelText}>{modal.cancelText ?? 'Cancelar'}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={() => {
                  if (modal.onConfirm) {
                    modal.onConfirm();
                  } else {
                    hideModal();
                  }
                }}
              >
                <Text style={styles.modalButtonConfirmText}>{modal.confirmText ?? 'OK'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4A90D9" />}
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>🌕 Space Connect</Text>
          <Text style={styles.subtitulo}>Monitoramento da Base Lunar</Text>
        </View>

        <View style={styles.contadores}>
          <TouchableOpacity
            style={[styles.contador, { backgroundColor: '#00C851' }, filtroCor === 'BOM' && styles.contadorAtivo]}
            onPress={() => setFiltroCor(filtroCor === 'BOM' ? 'TODOS' : 'BOM')}
          >
            <Text style={styles.contadorNumero}>{totalBom}</Text>
            <Text style={styles.contadorLabel}>Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contador, { backgroundColor: '#FFB300' }, filtroCor === 'ATENCAO' && styles.contadorAtivo]}
            onPress={() => setFiltroCor(filtroCor === 'ATENCAO' ? 'TODOS' : 'ATENCAO')}
          >
            <Text style={styles.contadorNumero}>{totalAtencao}</Text>
            <Text style={styles.contadorLabel}>Atenção</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contador, { backgroundColor: '#FF4444' }, filtroCor === 'CRITICO' && styles.contadorAtivo]}
            onPress={() => setFiltroCor(filtroCor === 'CRITICO' ? 'TODOS' : 'CRITICO')}
          >
            <Text style={styles.contadorNumero}>{totalCritico}</Text>
            <Text style={styles.contadorLabel}>Crítico</Text>
          </TouchableOpacity>
        </View>

        {(filtroCor !== 'TODOS' || filtroTipo !== 'TODOS') && (
          <TouchableOpacity
            style={styles.limparFiltro}
            onPress={() => { setFiltroCor('TODOS'); setFiltroTipo('TODOS'); }}
          >
            <Text style={styles.limparFiltroTexto}>Limpar Filtro</Text>
          </TouchableOpacity>
        )}

        {dadosSimulados && (
          <View style={styles.simuladoBanner}>
            <Text style={styles.simuladoTexto}>🚀 Mostrando dados simulados — puxe para ver todos</Text>
          </View>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosContainer}>
          {(['TODOS', 'SENSORES', 'RESERVATORIOS', 'CLIMATIZACAO', 'ALERTAS', 'TRIPULANTES', 'ENERGIA'] as FiltroTipo[]).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filtroBotao, filtroTipo === f && styles.filtroAtivo]}
              onPress={() => setFiltroTipo(f)}
            >
              <Text style={[styles.filtroTexto, filtroTipo === f && styles.filtroTextoAtivo]}>
                {f === 'TODOS' ? '🌐 Todos' :
                  f === 'SENSORES' ? '🛰️ Sensores' :
                  f === 'RESERVATORIOS' ? '💧 Reservas' :
                  f === 'CLIMATIZACAO' ? '🌡️ Clima' :
                  f === 'ALERTAS' ? '⚠️ Alertas' :
                  f === 'TRIPULANTES' ? '👨‍🚀 Equipe' : '⚡ Energia'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.lista}>
          {renderConteudo()}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, simulando && styles.fabDisabled]}
        onPress={confirmarSimulacao}
        disabled={simulando}
      >
        {simulando ? (
          <ActivityIndicator color="#4A90D9" size="small" />
        ) : (
          <Text style={styles.fabText}>🚀 Simular Base Lunar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12121E' },
  header: { padding: 24, paddingTop: 48, alignItems: 'center' },
  titulo: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  subtitulo: { color: '#888', fontSize: 14, marginTop: 4 },
  contadores: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, marginBottom: 16 },
  contador: { borderRadius: 12, padding: 16, alignItems: 'center', width: '30%' },
  contadorAtivo: { borderWidth: 3, borderColor: '#FFFFFF' },
  contadorNumero: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  contadorLabel: { color: '#FFFFFF', fontSize: 11, marginTop: 4 },
  limparFiltro: { backgroundColor: '#1E3A2E', padding: 10, marginHorizontal: 16, marginBottom: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#00C851' },
  limparFiltroTexto: { color: '#00C851', fontWeight: 'bold', fontSize: 14 },
  simuladoBanner: { backgroundColor: '#1E3A5F', marginHorizontal: 16, borderRadius: 10, padding: 10, marginBottom: 12 },
  simuladoTexto: { color: '#4A90D9', fontSize: 12, textAlign: 'center' },
  filtrosContainer: { paddingHorizontal: 16, marginBottom: 16 },
  filtroBotao: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1E1E2E', borderWidth: 1, borderColor: '#2E2E4E', marginRight: 8 },
  filtroAtivo: { backgroundColor: '#4A90D9', borderColor: '#4A90D9' },
  filtroTexto: { color: '#888', fontSize: 13 },
  filtroTextoAtivo: { color: '#FFFFFF', fontWeight: 'bold' },
  lista: { paddingHorizontal: 16 },
  fab: { position: 'absolute', bottom: 24, right: 20, backgroundColor: '#12121E', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 28, borderWidth: 1, borderColor: '#4A90D9', elevation: 8 },
  fabDisabled: { borderColor: '#2E2E4E' },
  fabText: { color: '#4A90D9', fontSize: 15, fontWeight: 'bold' },
  offlineContainer: { flex: 1, backgroundColor: '#12121E', alignItems: 'center', justifyContent: 'center', padding: 32 },
  offlineEmoji: { fontSize: 64, marginBottom: 16 },
  offlineTitle: { color: '#FF4444', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  offlineText: { color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 24 },
  retryButton: { backgroundColor: '#4A90D9', borderRadius: 12, padding: 14, paddingHorizontal: 32 },
  retryText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  loadingContainer: { flex: 1, backgroundColor: '#12121E', alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#888', marginTop: 12, fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#1E1E2E', borderWidth: 1, borderColor: '#2E2E4E', borderRadius: 16, padding: 24, width: '85%', maxWidth: 400 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#4A90D9', marginBottom: 12 },
  modalMessage: { fontSize: 15, color: '#CCCCCC', lineHeight: 22, marginBottom: 24 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  modalButtonCancel: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#2E2E4E' },
  modalButtonCancelText: { color: '#888', fontWeight: 'bold' },
  modalButtonConfirm: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, backgroundColor: '#1E3A5F', borderWidth: 1, borderColor: '#4A90D9' },
  modalButtonConfirmText: { color: '#4A90D9', fontWeight: 'bold' },
});