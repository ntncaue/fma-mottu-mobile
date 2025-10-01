import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View, ScrollView, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useThemeColor } from '@/hooks/useThemeColor';

const motosMock = [
  {
    id: 1,
    placa: 'ABC1234',
    esp32Id: 'ESP32_001',
    modelo: 'Honda CG 160',
    localizacao: 'A3',
  },
  {
    id: 2,
    placa: 'DEF5678',
    esp32Id: 'ESP32_002',
    modelo: 'Yamaha MT-03',
    localizacao: 'B7',
  },
  {
    id: 3,
    placa: 'GHI9012',
    esp32Id: 'ESP32_003',
    modelo: 'Honda PCX',
    localizacao: 'C2',
  },
];

export default function HomeScreen() {
  const { theme, setTheme } = useAppTheme();
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#2C2C2C' }, 'background');
  const cardBorderColor = useThemeColor({ light: '#EFEFEF', dark: '#444' }, 'background');

  const cardStyle = theme === 'light' ? styles.cardLight : styles.cardDark;

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Início</ThemedText>
          <TouchableOpacity
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={[styles.themeButton, { borderColor: iconColor }]}
          >
            <Ionicons 
              name={theme === 'dark' ? 'sunny' : 'moon'} 
              size={24} 
              color={iconColor} 
            />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Motos no Pátio</ThemedText>
          {motosMock.map((moto) => (
            <ThemedView key={moto.id} style={[styles.card, cardStyle]}>
              <ThemedText type="subtitle">{moto.modelo}</ThemedText>
              <ThemedText>Placa: {moto.placa}</ThemedText>
              <ThemedText>ESP32: {moto.esp32Id}</ThemedText>
              <TouchableOpacity style={[styles.localizarButton, { backgroundColor: tintColor }]}>
                <ThemedText style={[styles.localizarButtonText, { color: theme === 'dark' ? '#000' : '#fff' }]}>Localizar no Pátio</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Estatísticas</ThemedText>
          <View style={styles.statsContainer}>
            <ThemedView style={[styles.card, cardStyle, styles.statCard]}>
              <Ionicons name="bicycle" size={32} color={tintColor} />
              <ThemedText type="title">150</ThemedText>
              <ThemedText>Total de Motos</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.card, cardStyle, styles.statCard]}>
              <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
              <ThemedText type="title">145</ThemedText>
              <ThemedText>ESP32 Ativos</ThemedText>
            </ThemedView>
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  themeButton: {
    padding: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardDark: {
    backgroundColor: '#2C2C2C',
    borderWidth: 1,
    borderColor: '#444',
  },
  localizarButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  localizarButtonText: {
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
});
