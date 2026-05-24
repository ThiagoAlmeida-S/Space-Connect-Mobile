const API_BASE_URL = 'http://localhost:8080';

export const api = {
  // Sensores
  getSensores: async () => {
    const response = await fetch(`${API_BASE_URL}/sensores`);
    if (!response.ok) throw new Error('Erro ao buscar sensores');
    return response.json();
  },

  simularSensor: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/sensores/simular/${id}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Erro ao simular sensor');
    return response.json();
  },

  // Reservatorios
  getReservatorios: async () => {
    const response = await fetch(`${API_BASE_URL}/reservatorios`);
    if (!response.ok) throw new Error('Erro ao buscar reservatórios');
    return response.json();
  },

  simularReservatorio: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/reservatorios/simular/${id}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Erro ao simular reservatório');
    return response.json();
  },

  // Climatizacao
  getClimatizacao: async () => {
    const response = await fetch(`${API_BASE_URL}/climatizacao`);
    if (!response.ok) throw new Error('Erro ao buscar climatização');
    return response.json();
  },

  simularClimatizacao: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/climatizacao/simular/${id}`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Erro ao simular climatização');
    return response.json();
  },

  // Alertas
  getAlertas: async () => {
    const response = await fetch(`${API_BASE_URL}/alertas`);
    if (!response.ok) throw new Error('Erro ao buscar alertas');
    return response.json();
  },

  criarAlerta: async (alerta: object) => {
    const response = await fetch(`${API_BASE_URL}/alertas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alerta),
    });
    if (!response.ok) throw new Error('Erro ao criar alerta');
    return response.json();
  },

  // Tripulantes
  getTripulantes: async () => {
    const response = await fetch(`${API_BASE_URL}/tripulantes`);
    if (!response.ok) throw new Error('Erro ao buscar tripulantes');
    return response.json();
  },

  criarTripulante: async (tripulante: object) => {
    const response = await fetch(`${API_BASE_URL}/tripulantes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripulante),
    });
    if (!response.ok) throw new Error('Erro ao criar tripulante');
    return response.json();
  },

  // Consumo Energia
  getConsumoEnergia: async () => {
    const response = await fetch(`${API_BASE_URL}/consumo-energia`);
    if (!response.ok) throw new Error('Erro ao buscar consumo de energia');
    return response.json();
  },

  criarConsumoEnergia: async (consumo: object) => {
    const response = await fetch(`${API_BASE_URL}/consumo-energia`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(consumo),
    });
    if (!response.ok) throw new Error('Erro ao criar consumo');
    return response.json();
  },
};