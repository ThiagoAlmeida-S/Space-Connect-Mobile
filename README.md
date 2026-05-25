# 🌕 Space Connect Mobile

Aplicativo mobile desenvolvido em **React Native com TypeScript** para monitoramento inteligente de uma base lunar.

O sistema permite acompanhar sensores, reservatórios, climatização, alertas, consumo de energia e tripulantes em tempo real.

---

# 📱 Objetivo

O objetivo do aplicativo é simular o monitoramento operacional de uma base espacial, permitindo:

- Monitoramento dos recursos da base lunar
- Simulação de sensores e sistemas críticos
- Controle de alertas e status operacionais
- Cadastro de sensores, reservatórios e tripulantes
- Visualização de histórico de eventos críticos e avisos

---

# 👨‍🚀 Integrantes
- Nicolas Cipriano — RM562278
- Pedro de Castro  — RM561825  
- Thiago Almeida   — RM565365

---

# 🚀 Funcionalidades

## 📊 Dashboard Inteligente

- Visualização em tempo real dos recursos
- Indicadores de status:
  - 🟢 Normal
  - 🟡 Atenção
  - 🔴 Crítico
- Filtros por categoria(sensores, reservatorios, climatização, alertas, tripulantes e consumos)
- Filtros por status

---

## 🚨 Histórico de Eventos

- Visualização de alertas críticos
- Histórico de sensores em manutenção
- Histórico de reservatórios em alerta
- Limpeza de histórico diretamente pelo aplicativo

---

## 🛰️ Simulação da Base Lunar

O sistema possui simulação automática para:

- Sensores
- Reservatórios
- Climatização
- Alertas
- Consumo de energia
- Tripulantes

---

## 📝 Cadastro de Recursos

O aplicativo permite cadastrar:

- 👨‍🚀 Tripulantes
- 🛰️ Sensores
- 💧 Reservatórios

Todos os dados cadastrados são enviados para a API REST em Spring Boot.

## 👨‍🚀 Cadastro de Tripulantes

O usuário deve informar:

- Nome do tripulante
- Cargo (COMANDANTE, ENGENHEIRO, MEDICO E CIENTISTA)
- Status de saúde (BEM, MONITORAMENTO E CRITICO)

Após confirmar, os dados são enviados para a API e armazenados no banco de dados.

---

## 🛰️ Cadastro de Sensores

O usuário deve informar:

- Nome do sensor
- Tipo do sensor
- Localização

O sistema cria automaticamente os parâmetros iniciais do sensor.

---

## 💧 Cadastro de Reservatórios

O usuário deve informar:

- Nome do reservatório
- Tipo do reservatório

Os níveis e capacidades iniciais são configurados automaticamente pelo sistema.

---

Todos os cadastros realizados ficam persistidos no banco H2 da aplicação backend.

---

# 🛠️ Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- Fetch API

---

# 🔗 Integração com API

O aplicativo consome uma API REST desenvolvida em Spring Boot.

A API é responsável por:

- Persistência de dados
- Simulações
- CRUD completo
- Controle de recursos da base lunar

---

# 📱 Navegação do Aplicativo

O aplicativo possui navegação entre telas utilizando React Navigation.

## Telas disponíveis

* Dashboard
* Histórico
* Cadastro

---

# 📡 Feedback Visual

O sistema utiliza cores para indicar o estado operacional:

* 🟢 Operacional
* 🟡 Atenção
* 🔴 Crítico

---

# ▶️ Como Executar o Projeto

## Instalar dependências

```bash
npm install
```

---

## Instalar navegação

```bash
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
```

---

## Executar aplicação

```bash
npx expo start
```

---

# ⚠️ Importante

A API backend deve estar executando na porta:

```bash
http://localhost:8080
```

---

# 🎥 Demonstração Esperada

O aplicativo deve demonstrar:

* Navegação entre telas
* Simulação da base lunar
* Cadastro de recursos
* Histórico de eventos
* Integração com API REST
* Atualização dinâmica dos dados

````