import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1D1D1D' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar}>
            <Ionicons name="search" size={24} color="#666" />
            <ThemedText style={styles.searchText}>Buscar por placa ou ESP32</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="title" style={styles.sectionTitle}>Motos no Pátio</ThemedText>
          {motosMock.map((moto) => (
            <ThemedView key={moto.id} style={styles.motoCard}>
              <ThemedView style={styles.motoInfo}>
                <ThemedText type="subtitle">{moto.modelo}</ThemedText>
                <ThemedText>Placa: {moto.placa}</ThemedText>
                <ThemedText>ESP32: {moto.esp32Id}</ThemedText>
                <TouchableOpacity style={styles.localizarButton}>
                  <ThemedText style={styles.localizarButtonText}>Localizar no Pátio</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="title" style={styles.sectionTitle}>Estatísticas</ThemedText>
          <View style={styles.statsContainer}>
            <ThemedView style={styles.statCard}>
              <Ionicons name="bicycle" size={24} color="#007AFF" />
              <ThemedText style={styles.statNumber}>150</ThemedText>
              <ThemedText style={styles.statLabel}>Total de Motos</ThemedText>
            </ThemedView>
            <ThemedView style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <ThemedText style={styles.statNumber}>145</ThemedText>
              <ThemedText style={styles.statLabel}>ESP32 Ativos</ThemedText>
            </ThemedView>
          </View>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerImage: {
    height: 200,
    width: '100%',
    position: 'absolute',
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchText: {
    color: '#666',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  motoCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 16,
  },
  motoInfo: {
    gap: 8,
  },
  localizarButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  localizarButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    color: '#666',
    textAlign: 'center',
  },
});
