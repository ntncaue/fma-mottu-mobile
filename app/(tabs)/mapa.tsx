import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Moto {
  id: number;
  placa: string;
  modelo: string;
  localizacao: string;
  preco: string;
}

// Dados mockados de motos (em produção, isso viria de uma API)
const motosMock: Moto[] = [
  {
    id: 1,
    placa: 'ABC1234',
    modelo: 'Honda CG 160',
    localizacao: 'A3',
    preco: 'R$ 15,00/hora',
  },
  {
    id: 2,
    placa: 'DEF5678',
    modelo: 'Yamaha MT-03',
    localizacao: 'B7',
    preco: 'R$ 25,00/hora',
  },
  {
    id: 3,
    placa: 'GHI9012',
    modelo: 'Honda PCX',
    localizacao: 'C2',
    preco: 'R$ 20,00/hora',
  },
];

// Gera a grade de localização (A1 até H8)
const colunas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const linhas = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function MapaScreen() {
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);

  const getMotoNaLocalizacao = (localizacao: string) => {
    return motosMock.find(moto => moto.localizacao === localizacao);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.gridContainer}>
          {/* Cabeçalho com letras */}
          <View style={styles.headerRow}>
            <View style={styles.cornerCell} />
            {colunas.map(coluna => (
              <View key={coluna} style={styles.headerCell}>
                <ThemedText style={styles.headerText}>{coluna}</ThemedText>
              </View>
            ))}
          </View>

          {/* Grade de localização */}
          {linhas.map(linha => (
            <View key={linha} style={styles.row}>
              <View style={styles.rowHeader}>
                <ThemedText style={styles.headerText}>{linha}</ThemedText>
              </View>
              {colunas.map(coluna => {
                const localizacao = `${coluna}${linha}`;
                const moto = getMotoNaLocalizacao(localizacao);
                return (
                  <TouchableOpacity
                    key={localizacao}
                    style={[
                      styles.cell,
                      moto && styles.cellWithMoto,
                    ]}
                    onPress={() => moto && setSelectedMoto(moto)}
                  >
                    {moto && (
                      <Ionicons name="bicycle" size={24} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ThemedView>
      </ScrollView>

      {selectedMoto && (
        <ThemedView style={styles.infoCard}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedMoto(null)}
          >
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          <ThemedText type="subtitle">{selectedMoto.modelo}</ThemedText>
          <ThemedText>Placa: {selectedMoto.placa}</ThemedText>
          <ThemedText>Localização: {selectedMoto.localizacao}</ThemedText>
          <ThemedText style={styles.price}>{selectedMoto.preco}</ThemedText>
          
          <TouchableOpacity style={styles.reserveButton}>
            <ThemedText style={styles.reserveButtonText}>Reservar Agora</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cornerCell: {
    width: 40,
    height: 40,
  },
  headerCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowHeader: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  cellWithMoto: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#666',
  },
  infoCard: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  price: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 