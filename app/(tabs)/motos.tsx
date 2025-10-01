import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View, TouchableOpacity, Modal, Platform } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppTheme } from '@/hooks/useAppTheme';

const listaInicial = [
  { id: '1', nome: '', placa: 'ABC1234', identificador: 'ESP32_001' },
  { id: '2', nome: '', placa: 'XYZ5678', identificador: 'ESP32_002' },
];

import { ThemedButton } from '@/components/ThemedButton';

export default function Motos() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const [motos, setMotos] = useState(listaInicial);
  const [nome, setNome] = useState('');
  const [placa, setPlaca] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [editando, setEditando] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'background');
  const placeholderColor = useThemeColor({ light: '#999', dark: '#777' }, 'background');

  useEffect(() => {
    AsyncStorage.getItem('motos').then(data => {
      if (data) setMotos(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('motos', JSON.stringify(motos));
  }, [motos]);

  function limparCampos() {
    setEditando(null);
    setNome('');
    setPlaca('');
    setIdentificador('');
    setModalVisible(false);
  }

  function salvarMoto() {
    if (!placa || !identificador) return;
    if (editando) {
      setMotos(motos.map(m => m.id === editando ? { ...m, nome, placa, identificador } : m));
    } else {
      setMotos([...motos, { id: (motos.length + 1).toString(), nome, placa, identificador }]);
    }
    limparCampos();
  }

  function editarMoto(moto: any) {
    setEditando(moto.id);
    setNome(moto.nome || '');
    setPlaca(moto.placa);
    setIdentificador(moto.identificador);
    setModalVisible(true);
  }

  const cardStyle = theme === 'light' ? estilos.cardLight : estilos.cardDark;

  return (
    <ThemedView style={estilos.screen}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={limparCampos}
      >
        <ThemedView style={estilos.modalContainer}>
          <ThemedView style={[estilos.modalView, cardStyle]}>
            <ThemedText type="subtitle" style={estilos.modalTitle}>{editando ? 'Editar Moto' : 'Adicionar Moto'}</ThemedText>
            <ThemedText>Nome (opcional):</ThemedText>
            <TextInput style={[estilos.campo, { color: textColor, borderColor: borderColor }]} value={nome} onChangeText={setNome} placeholder="Nome" placeholderTextColor={placeholderColor} />
            <ThemedText>Placa:</ThemedText>
            <TextInput style={[estilos.campo, { color: textColor, borderColor: borderColor }]} value={placa} onChangeText={setPlaca} placeholder="Placa" placeholderTextColor={placeholderColor} />
            <ThemedText>Identificador:</ThemedText>
            <TextInput style={[estilos.campo, { color: textColor, borderColor: borderColor }]} value={identificador} onChangeText={setIdentificador} placeholder="Identificador ESP32" placeholderTextColor={placeholderColor} />
            <ThemedButton title={editando ? 'Salvar Alteração' : 'Adicionar Moto'} onPress={salvarMoto} />
            <ThemedButton title="Cancelar" color="#888" onPress={limparCampos} />
          </ThemedView>
        </ThemedView>
      </Modal>

      <FlatList
        data={motos}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <ThemedView style={estilos.header}>
            <ThemedText type="title">Motos</ThemedText>
            <ThemedButton title="Adicionar" onPress={() => setModalVisible(true)} />
          </ThemedView>
        )}
        renderItem={({ item }) => (
          <ThemedView style={[estilos.card, cardStyle]}>
            {item.nome ? <ThemedText type="subtitle">{item.nome}</ThemedText> : null}
            <ThemedText>Placa: {item.placa}</ThemedText>
            <ThemedText>Identificador: {item.identificador}</ThemedText>
            <View style={estilos.botoes}>
              <ThemedButton style={{flex:1}} title="Detalhes" onPress={() => router.push({ pathname: '/(tabs)/detalhes', params: { moto: JSON.stringify(item) } })} />
              <ThemedButton style={{flex:1}} title="Ver no Mapa" onPress={() => router.push({ pathname: '/(tabs)/mapa', params: { moto: JSON.stringify(item) } })} />
              <ThemedButton style={{flex:1}} title="Editar" color="#555" onPress={() => editarMoto(item)} />
            </View>
          </ThemedView>
        )}
        contentContainerStyle={estilos.listContainer}
      />
    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  screen: { flex: 1 },
  listContainer: { padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
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
  botoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  campo: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    borderRadius: 12,
    padding: 24,
  },
  modalTitle: {
    marginBottom: 16,
  },
});
