import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';

export default function DetalhesScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  let moto: any;
  if (params.moto) {
    try {
      moto = JSON.parse(params.moto as string);
    } catch {}
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: moto ? moto.modelo || 'Detalhes da Moto' : 'Detalhes',
      headerShown: true,
    });
  }, [navigation, moto]);

  if (!moto) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Selecione uma moto para ver os detalhes.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Placa</ThemedText>
      <ThemedText style={styles.info}>{moto.placa}</ThemedText>

      <ThemedText type="subtitle">Modelo</ThemedText>
      <ThemedText style={styles.info}>{moto.modelo || 'Não informado'}</ThemedText>

      <ThemedText type="subtitle">Ano</ThemedText>
      <ThemedText style={styles.info}>{moto.ano || 'Não informado'}</ThemedText>

      {moto.patioId && (
        <>
          <ThemedText type="subtitle">Pátio ID</ThemedText>
          <ThemedText style={styles.info}>{moto.patioId}</ThemedText>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    fontSize: 16,
    marginBottom: 16,
  },
});
