import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function DetalhesScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  let moto = { placa: 'ABC1234', status: 'Estacionada', localizacao: { x: 10, y: 20 }, nome: 'Moto Padrão' };
  if (params.moto) {
    try {
      moto = JSON.parse(params.moto as string);
    } catch {}
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: moto.nome || 'Detalhes da Moto',
      headerShown: true,
    });
  }, [navigation, moto]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Placa</ThemedText>
      <ThemedText style={styles.info}>{moto.placa}</ThemedText>

      <ThemedText type="subtitle">Status</ThemedText>
      <ThemedText style={styles.info}>{moto.status || 'Desconhecido'}</ThemedText>

      {moto.localizacao && (
        <>
          <ThemedText type="subtitle">Localização</ThemedText>
          <ThemedText style={styles.info}>X: {moto.localizacao.x}, Y: {moto.localizacao.y}</ThemedText>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    gap: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 16,
  },
});