import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useThemeColor } from '@/hooks/useThemeColor';

import { getMotosByPatio } from '@/services/serviceMotos';
import { getPatiosByFilial } from '@/services/servicePatios';

export default function HomeScreen() {
  const { theme, setTheme } = useAppTheme();
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#2C2C2C' }, 'background');

  const [totalMotos, setTotalMotos] = useState(0);
  const [totalPatios, setTotalPatios] = useState(0);

  useEffect(() => {
    carregarTotaisFilial1();
  }, []);

  const carregarTotaisFilial1 = async () => {
    try {
      const patios = await getPatiosByFilial(1); // filial 1 fixa
      setTotalPatios(patios.length);

      let motosCount = 0;
      for (const patio of patios) {
        const motos = await getMotosByPatio(patio.patioId);
        motosCount += motos.length;
      }

      setTotalMotos(motosCount);
    } catch (error) {
      console.error('Erro ao carregar totais da filial 1:', error);
    }
  };

  const cardStyle = theme === 'light' ? styles.cardLight : styles.cardDark;

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Início</ThemedText>
          <Ionicons
            name={theme === 'dark' ? 'sunny' : 'moon'}
            size={24}
            color={iconColor}
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </ThemedView>

        <ThemedView style={[styles.card, cardStyle, { backgroundColor: cardBackgroundColor }]}>
          <ThemedText type="subtitle">Bem-vindo ao FMA Mottu</ThemedText>
          <ThemedText>
            Gerencie a frota de motocicletas da filial de forma simples e eficiente.
          </ThemedText>
        </ThemedView>

        <View style={styles.statsContainer}>
          <ThemedView style={[styles.card, cardStyle, styles.statCard, { backgroundColor: cardBackgroundColor }]}>
            <Ionicons name="bicycle" size={32} color={tintColor} />
            <ThemedText type="title">{totalMotos}</ThemedText>
            <ThemedText>Total de Motos</ThemedText>
          </ThemedView>

          <ThemedView style={[styles.card, cardStyle, styles.statCard, { backgroundColor: cardBackgroundColor }]}>
            <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
            <ThemedText type="title">{totalPatios}</ThemedText>
            <ThemedText>Pátios Ativos</ThemedText>
          </ThemedView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  card: { borderRadius: 12, padding: 16, marginBottom: 16 },
  cardLight: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  cardDark: {
    backgroundColor: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#444',
  },
  statsContainer: { flexDirection: 'row', gap: 16 },
  statCard: { flex: 1, alignItems: 'center', gap: 8 },
});
