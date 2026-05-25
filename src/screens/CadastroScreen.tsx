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

  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const cadastrarTripulante = async () => {
    try {

      await api.criarTripulante({
        nome,
        dataEntrada: new Date().toISOString().split('T')[0],
        cargo,
        statusSaude: 'BEM',
      });

      Alert.alert('Sucesso', 'Tripulante cadastrado!');

      setNome('');
      setCargo('');

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar tripulante');
    }
  };

  const cadastrarAlerta = async () => {
    try {

      await api.criarAlerta({
        titulo,
        descricao,
        recursoAfetado: 'Módulo Principal',
        resolvidoPor: '',
        resolvido: false,
        dataHora: new Date().toISOString(),
        nivel: 'AVISO',
      });

      Alert.alert('Sucesso', 'Alerta cadastrado!');

      setTitulo('');
      setDescricao('');

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar alerta');
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>
          Cadastro manual da base lunar
        </Text>
      </View>

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          👨‍🚀 Novo Tripulante
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Cargo"
          placeholderTextColor="#888"
          value={cargo}
          onChangeText={setCargo}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={cadastrarTripulante}
        >
          <Text style={styles.buttonText}>
            Cadastrar Tripulante
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          ⚠️ Novo Alerta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#888"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Descrição"
          placeholderTextColor="#888"
          value={descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={cadastrarAlerta}
        >
          <Text style={styles.buttonText}>
            Cadastrar Alerta
          </Text>
        </TouchableOpacity>

      </View>

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

  card: {
    backgroundColor: '#1E1E2E',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2E2E4E',
  },

  cardTitle: {
    color: '#4A90D9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#12121E',
    borderWidth: 1,
    borderColor: '#2E2E4E',
    borderRadius: 10,
    padding: 14,
    color: '#FFF',
    marginBottom: 14,
  },

  button: {
    backgroundColor: '#1E3A5F',
    borderWidth: 1,
    borderColor: '#4A90D9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#4A90D9',
    fontWeight: 'bold',
    fontSize: 15,
  },

});