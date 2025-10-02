import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getMotosByPatio, Moto } from '@/services/serviceMotos';
import { getPatiosByFilial } from '@/services/servicePatios';

const colunas = ['A','B','C','D','E','F','G','H'];
const linhas = ['1','2','3','4','5','6','7','8'];

export default function MapaScreen() {
  const [patios, setPatios] = useState<{patioId:number, nomePatio:string}[]>([]);
  const [patioSelecionado, setPatioSelecionado] = useState<number | null>(null);
  const [motos, setMotos] = useState<Moto[]>([]);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);

  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'background');

  useEffect(() => {
    carregarPatios();
  }, []);

  useEffect(() => {
    if (patioSelecionado) carregarMotos(patioSelecionado);
  }, [patioSelecionado]);

  const carregarPatios = async () => {
    try {
      const data = await getPatiosByFilial(1); // filial 1 fixa
      setPatios(data);
      if (data.length > 0) setPatioSelecionado(data[0].patioId);
    } catch (error) {
      console.error('Erro ao carregar pátios:', error);
    }
  };

  const carregarMotos = async (patioId: number) => {
    try {
      const data = await getMotosByPatio(patioId);
      setMotos(data);
    } catch (error) {
      console.error('Erro ao carregar motos:', error);
    }
  };

  const getMotoNaPosicao = (index: number) => {
    return motos[index] || null;
  };

  return (
    <View style={styles.container}>
      {/* Picker de pátio */}
      <Picker
        selectedValue={patioSelecionado}
        onValueChange={(value) => setPatioSelecionado(value)}
        style={styles.picker}
      >
        {patios.map(p => (
          <Picker.Item key={p.patioId} label={p.nomePatio} value={p.patioId} />
        ))}
      </Picker>

      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.gridContainer}>
          {/* Cabeçalho com letras */}
          <View style={styles.headerRow}>
            <View style={styles.cornerCell} />
            {colunas.map(col => (
              <View key={col} style={styles.headerCell}>
                <ThemedText style={styles.headerText}>{col}</ThemedText>
              </View>
            ))}
          </View>

          {/* Grade */}
          {linhas.map((linha, iLinha) => (
            <View key={linha} style={styles.row}>
              <View style={styles.rowHeader}>
                <ThemedText style={styles.headerText}>{linha}</ThemedText>
              </View>
              {colunas.map((col, iCol) => {
                const index = iLinha * 8 + iCol; // index sequencial da moto
                const moto = getMotoNaPosicao(index);
                return (
                  <TouchableOpacity
                    key={`${col}${linha}`}
                    style={[styles.cell, moto && styles.cellWithMoto]}
                    onPress={() => moto && setSelectedMoto(moto)}
                  >
                    {moto && <Ionicons name="bicycle" size={24} color="#007AFF" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ThemedView>
      </ScrollView>

      {/* Info da moto selecionada */}
      {selectedMoto && (
        <ThemedView style={styles.infoCard}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedMoto(null)}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>

          <ThemedText type="subtitle">{selectedMoto.modelo}</ThemedText>
          <ThemedText>Placa: {selectedMoto.placa}</ThemedText>
          <ThemedText style={styles.price}>ID: {selectedMoto.motoId}</ThemedText>
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  picker: { margin: 16, backgroundColor: '#f0f0f0', borderRadius: 8 },
  gridContainer: { padding: 16 },
  headerRow: { flexDirection: 'row', marginBottom: 8 },
  row: { flexDirection: 'row', marginBottom: 8 },
  cornerCell: { width: 40, height: 40 },
  headerCell: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  rowHeader: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  cell: { width: 40, height: 40, borderWidth: 1, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
  cellWithMoto: { backgroundColor: '#E3F2FD', borderColor: '#007AFF' },
  headerText: { fontWeight: 'bold', color: '#666' },
  infoCard: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: { position: 'absolute', right: 16, top: 16 },
  price: { color: '#007AFF', fontWeight: 'bold', marginTop: 8 },
});
