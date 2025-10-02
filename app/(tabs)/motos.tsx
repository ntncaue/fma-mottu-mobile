import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Platform, StyleSheet, TextInput, View } from 'react-native';

import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useThemeColor } from '@/hooks/useThemeColor';

import { Moto, addMoto, deleteMoto, getMotosByPatio, moveMotoToPatio } from '../../services/serviceMotos';
import { Patio, getPatiosByFilial } from '../../services/servicePatios';

export default function Motos() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [patios, setPatios] = useState<Patio[]>([]);
  const [patioSelecionado, setPatioSelecionado] = useState<number | null>(null);

  // campos de edição
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [patioId, setPatioId] = useState('');
  const [editando, setEditando] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'background');
  const placeholderColor = useThemeColor({ light: '#999', dark: '#777' }, 'background');

  useEffect(() => {
    carregarPatios();
  }, []);

  useEffect(() => {
    if (patioSelecionado) {
      carregarMotos(patioSelecionado);
    }
  }, [patioSelecionado]);

  const carregarPatios = async () => {
    try {
      const data = await getPatiosByFilial(1);
      setPatios(data);
      if (data.length > 0) setPatioSelecionado(data[0].patioId);
    } catch (error) {
      console.error('Erro ao carregar pátios:', error);
      alert('Erro ao carregar pátios');
    }
  };

  const carregarMotos = async (patioId: number) => {
    try {
      const data = await getMotosByPatio(patioId);
      setMotos(data);
    } catch (error) {
      console.error('Erro ao carregar motos:', error);
      alert('Erro ao carregar motos');
    }
  };

  function limparCampos() {
    setEditando(null);
    setPlaca('');
    setModelo('');
    setAno('');
    setPatioId('');
    setModalVisible(false);
  }

  const salvarMoto = async () => {
    if (!patioId || (!editando && (!placa || !modelo || !ano))) {
      alert('Preencha todos os campos!');
      return;
    }
  
    try {
      if (editando) {
        // Mover moto existente
        await moveMotoToPatio(editando, Number(patioId));
        alert('Moto movida com sucesso!');
      } else {
        // Adicionar nova moto usando a service existente
        await addMoto({
          placa,
          modelo,
          ano: Number(ano),
          patioId: Number(patioId),
        });
        alert('Moto adicionada com sucesso!');
      }
  
      limparCampos();
      if (patioSelecionado) carregarMotos(patioSelecionado);
    } catch (error: any) {
      console.error('Erro ao salvar moto:', error.response?.data || error.message);
      alert('Erro: ' + (error.response?.statusText || error.message));
    }
  };
  
  const editarMoto = (moto: Moto) => {
    setEditando(moto.motoId);
    setPlaca(moto.placa);
    setModelo(moto.modelo);
    setAno(moto.ano.toString());
    setPatioId(moto.patioId.toString());
    setModalVisible(true);
  };

  const cardStyle = theme === 'light' ? estilos.cardLight : estilos.cardDark;

  return (
    <ThemedView style={estilos.screen}>
      {/* Seletor de pátio */}
      <ThemedView style={estilos.header}>
        <ThemedText type="title">Motos</ThemedText>
        <Picker
          selectedValue={patioSelecionado}
          onValueChange={(value) => setPatioSelecionado(value)}
          style={estilos.picker}
        >
          {patios.map((patio) => (
            <Picker.Item key={patio.patioId} label={patio.nomePatio} value={patio.patioId} />
          ))}
        </Picker>
      </ThemedView>

      {/* Botão de adicionar moto */}
      <ThemedView style={{ paddingHorizontal: 16 }}>
        <ThemedButton
          title="+ Adicionar Moto"
          onPress={() => {
            setEditando(null);
            setPlaca('');
            setModelo('');
            setAno('');
            setPatioId(patioSelecionado?.toString() || '');
            setModalVisible(true);
          }}
        />
      </ThemedView>

      {/* Lista de motos */}
      <FlatList
        data={motos}
        keyExtractor={(item) => item.motoId.toString()}
        renderItem={({ item }) => (
          <ThemedView style={[estilos.card, cardStyle]}>
            <ThemedText>Placa: {item.placa}</ThemedText>
            <ThemedText>Modelo: {item.modelo}</ThemedText>
            <ThemedText>Ano: {item.ano}</ThemedText>
            <ThemedText>Pátio ID: {item.patioId}</ThemedText>

            <View style={estilos.botoes}>
              <ThemedButton
                style={{ flex: 1 }}
                title="Editar"
                color="#555"
                onPress={() => editarMoto(item)}
              />
              <ThemedButton
                style={{ flex: 1 }}
                title="Excluir"
                color="#aa2222"
                onPress={async () => {
                  try {
                    await deleteMoto(item.motoId);
                    if (patioSelecionado) carregarMotos(patioSelecionado);
                  } catch {
                    alert('Erro ao excluir moto');
                  }
                }}
              />
            </View>
          </ThemedView>
        )}
        contentContainerStyle={estilos.listContainer}
      />

      {/* Modal de edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={limparCampos}
      >
        <ThemedView style={estilos.modalContainer}>
          <ThemedView style={[estilos.modalView, cardStyle]}>
            <ThemedText type="subtitle" style={estilos.modalTitle}>
              {editando ? 'Editar Pátio da Moto' : 'Adicionar Moto'}
            </ThemedText>

            <ThemedText>Placa:</ThemedText>
            <TextInput
              style={[estilos.campo, { color: textColor, borderColor }]}
              value={placa}
              editable={!editando}
              onChangeText={setPlaca}
              placeholderTextColor={placeholderColor}
            />

            <ThemedText>Modelo:</ThemedText>
            <TextInput
              style={[estilos.campo, { color: textColor, borderColor }]}
              value={modelo}
              editable={!editando}
              onChangeText={setModelo}
              placeholderTextColor={placeholderColor}
            />

            <ThemedText>Ano:</ThemedText>
            <TextInput
              style={[estilos.campo, { color: textColor, borderColor }]}
              value={ano}
              editable={!editando}
              onChangeText={setAno}
              keyboardType="numeric"
              placeholderTextColor={placeholderColor}
            />

            <ThemedText>Pátio ID:</ThemedText>
            <TextInput
              style={[estilos.campo, { color: textColor, borderColor }]}
              value={patioId}
              onChangeText={setPatioId}
              keyboardType="numeric"
              placeholder="1"
              placeholderTextColor={placeholderColor}
            />

            <ThemedButton
              title={editando ? 'Mover de Pátio' : 'Adicionar Moto'}
              onPress={salvarMoto}
            />
            <ThemedButton title="Cancelar" color="#888" onPress={limparCampos} />
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  screen: { flex: 1 },
  listContainer: { padding: 16, paddingBottom: 32 },
  header: {
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  picker: {
    marginTop: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
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
