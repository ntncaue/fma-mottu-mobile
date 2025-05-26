import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetalhesScreen() {
  const params = useLocalSearchParams();
  let moto = { placa: 'ABC1234', status: 'Estacionada', localizacao: { x: 10, y: 20 } };
  if (params.moto) {
    try {
      moto = JSON.parse(params.moto as string);
    } catch {}
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Moto</Text>
      <Text>Placa: {moto.placa}</Text>
      <Text>Status: {moto.status}</Text>
      <Text>Localização: X: {moto.localizacao.x}, Y: {moto.localizacao.y}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
}); 