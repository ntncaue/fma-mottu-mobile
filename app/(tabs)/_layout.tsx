import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          default: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderTopWidth: 0,
            elevation: 0,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Localizar',
          tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="detalhes"
        options={{
          title: 'Detalhes',
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="motos"
        options={{
          title: 'Motos',
          tabBarIcon: ({ color, size }) => <Ionicons name="bicycle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
