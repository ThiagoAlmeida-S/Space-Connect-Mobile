import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '../screens/DashboardScreen';
import Historicoscreen from '../screens/Historicoscreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#12121E',
            borderTopColor: '#2E2E4E',
            height: 65,
          },
          tabBarActiveTintColor: '#4A90D9',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Base Lunar',
          }}
        />

        <Tab.Screen
          name="Historico"
          component={Historicoscreen}
          options={{
            tabBarLabel: 'Histórico',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}