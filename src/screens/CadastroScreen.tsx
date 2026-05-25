import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { api } from '../services/api';

export default function CadastroScreen() {
  const [tipoCadastro, setTipoCadastro] = useState<
    'TRIPULANTE' | 'SENSOR' | 'RESERVATORIO'
  >('TRIPULANTE');

  // TRIPULANTE
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [statusSaude, setStatusSaude] = useState('');

  // SENSOR
  const [nomeSensor, setNomeSensor] = useState('');
  const [tipoSensor, setTipoSensor] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  // RESERVATÓRIO
  const [nomeReservatorio, setNomeReservatorio] = useState('');
  const [tipoReservatorio, setTipoReservatorio] = useState('');
  const [capacidade, setCapacidade] = useState('');

  const limparCampos = () => {
    setNome('');
    setCargo('');
    setStatusSaude('');

    setNomeSensor('');
    setTipoSensor('');
    setLocalizacao('');

    setNomeReservatorio('');
    setTipoReservatorio('');
    setCapacidade('');
  };

  const cadastrar = async () => {
    try {
      // TRIPULANTE
      if (tipoCadastro === 'TRIPULANTE') {
        if (!nome || !cargo || !statusSaude) {
          Alert.alert('Erro', 'Preencha todos os campos.');
          return;
        }

        await api.criarTripulante({
          nome,
          cargo,
          statusSaude,
          dataEntrada: new Date().toISOString().split('T')[0],
        });

        Alert.alert('Sucesso', 'Tripulante cadastrado!');
      }

      // SENSOR
      else if (tipoCadastro === 'SENSOR') {
        if (!nomeSensor || !tipoSensor || !localizacao) {
          Alert.alert('Erro', 'Preencha todos os campos.');
          return;
        }

        await fetch('http://localhost:8080/sensores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nomeSensor,
            tipo: tipoSensor,
            localizacao,
            ativo: true,
            ultimaLeitura: 0,
            dataLeitura: new Date().toISOString(),
            status: 'OPERACIONAL',
            limiteMinimo: 10,
            limiteMaximo: 90,
          }),
        });

        Alert.alert('Sucesso', 'Sensor cadastrado!');
      }

      // RESERVATÓRIO
      else if (tipoCadastro === 'RESERVATORIO') {
        if (!nomeReservatorio || !tipoReservatorio || !capacidade) {
          Alert.alert('Erro', 'Preencha todos os campos.');
          return;
        }

        await fetch('http://localhost:8080/reservatorios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nomeReservatorio,
            tipo: tipoReservatorio,
            capacidadeMaxima: Number(capacidade),
            nivelAtual: 50,
            nivelCritico: 20,
            unidade: 'Litros',
          }),
        });

        Alert.alert('Sucesso', 'Reservatório cadastrado!');
      }

      limparCampos();

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar.');
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>
          Cadastro de recursos da base lunar
        </Text>
      </View>

      <View style={styles.tabs}>

        <TouchableOpacity
          style={[
            styles.tabButton,
            tipoCadastro === 'TRIPULANTE' && styles.tabActive,
          ]}
          onPress={() => setTipoCadastro('TRIPULANTE')}
        >
          <Text style={styles.tabText}>👨‍🚀 Tripulante</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            tipoCadastro === 'SENSOR' && styles.tabActive,
          ]}
          onPress={() => setTipoCadastro('SENSOR')}
        >
          <Text style={styles.tabText}>🛰️ Sensor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            tipoCadastro === 'RESERVATORIO' && styles.tabActive,
          ]}
          onPress={() => setTipoCadastro('RESERVATORIO')}
        >
          <Text style={styles.tabText}>💧 Reservatório</Text>
        </TouchableOpacity>

      </View>

      {/* TRIPULANTE */}
      {tipoCadastro === 'TRIPULANTE' && (
        <View style={styles.form}>

          <TextInput
            placeholder="Nome"
            placeholderTextColor="#888"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            placeholder="Cargo (COMANDANTE, ENGENHEIRO...)"
            placeholderTextColor="#888"
            style={styles.input}
            value={cargo}
            onChangeText={setCargo}
          />

          <TextInput
            placeholder="Status Saúde (BEM, MONITORAMENTO...)"
            placeholderTextColor="#888"
            style={styles.input}
            value={statusSaude}
            onChangeText={setStatusSaude}
          />

        </View>
      )}

      {/* SENSOR */}
      {tipoCadastro === 'SENSOR' && (
        <View style={styles.form}>

          <TextInput
            placeholder="Nome do Sensor"
            placeholderTextColor="#888"
            style={styles.input}
            value={nomeSensor}
            onChangeText={setNomeSensor}
          />

          <TextInput
            placeholder="Tipo do Sensor"
            placeholderTextColor="#888"
            style={styles.input}
            value={tipoSensor}
            onChangeText={setTipoSensor}
          />

          <TextInput
            placeholder="Localização"
            placeholderTextColor="#888"
            style={styles.input}
            value={localizacao}
            onChangeText={setLocalizacao}
          />

        </View>
      )}

      {/* RESERVATÓRIO */}
      {tipoCadastro === 'RESERVATORIO' && (
        <View style={styles.form}>

          <TextInput
            placeholder="Nome do Reservatório"
            placeholderTextColor="#888"
            style={styles.input}
            value={nomeReservatorio}
            onChangeText={setNomeReservatorio}
          />

          <TextInput
            placeholder="Tipo"
            placeholderTextColor="#888"
            style={styles.input}
            value={tipoReservatorio}
            onChangeText={setTipoReservatorio}
          />

          <TextInput
            placeholder="Capacidade Máxima"
            placeholderTextColor="#888"
            keyboardType="numeric"
            style={styles.input}
            value={capacidade}
            onChangeText={setCapacidade}
          />

        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={cadastrar}
      >
        <Text style={styles.buttonText}>
          🚀 Cadastrar
        </Text>
      </TouchableOpacity>

      <View style={{ height: 120 }} />

    </ScrollView>
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
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#888',
    marginTop: 4,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
    paddingHorizontal: 12,
  },

  tabButton: {
    backgroundColor: '#1E1E2E',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E2E4E',
  },

  tabActive: {
    borderColor: '#4A90D9',
  },

  tabText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  form: {
    paddingHorizontal: 20,
    gap: 16,
  },

  input: {
    backgroundColor: '#1E1E2E',
    borderWidth: 1,
    borderColor: '#2E2E4E',
    borderRadius: 12,
    padding: 14,
    color: '#FFF',
  },

  button: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#1E3A5F',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A90D9',
  },

  buttonText: {
    color: '#4A90D9',
    fontWeight: 'bold',
    fontSize: 16,
  },
});