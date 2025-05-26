import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const listaInicial = [
  { id: '1', nome: '', placa: 'ABC1234', identificador: 'ESP32_001' },
  { id: '2', nome: '', placa: 'XYZ5678', identificador: 'ESP32_002' },
];

export default function Motos() {
  const router = useRouter();
  const [motos, setMotos] = useState(listaInicial);
  const [nome, setNome] = useState('');
  const [placa, setPlaca] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [editando, setEditando] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('motos').then(data => {
      if (data) setMotos(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('motos', JSON.stringify(motos));
  }, [motos]);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setMotos(lista => {
        if (lista.length === 0) return lista;
        const i = Math.floor(Math.random() * lista.length);
        const novas = [...lista];
        novas[i] = {
          ...novas[i],
        };
        return novas;
      });
    }, 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  function limparCampos() {
    setEditando(null);
    setNome('');
    setPlaca('');
    setIdentificador('');
  }

  function salvarMoto() {
    if (!placa || !identificador) return;
    if (editando) {
      setMotos(motos.map(m => m.id === editando ? {
        ...m,
        nome,
        placa,
        identificador,
      } : m));
    } else {
      setMotos([
        ...motos,
        {
          id: (motos.length + 1).toString(),
          nome,
          placa,
          identificador,
        },
      ]);
    }
    limparCampos();
  }

  function editarMoto(moto: any) {
    setEditando(moto.id);
    setNome(moto.nome || '');
    setPlaca(moto.placa);
    setIdentificador(moto.identificador);
  }

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Motos no Pátio</Text>
      <View style={{ marginBottom: 16 }}>
        <Text>Nome (opcional):</Text>
        <TextInput style={estilos.campo} value={nome} onChangeText={setNome} placeholder="Nome" />
        <Text>Placa:</Text>
        <TextInput style={estilos.campo} value={placa} onChangeText={setPlaca} placeholder="Placa" />
        <Text>Identificador:</Text>
        <TextInput style={estilos.campo} value={identificador} onChangeText={setIdentificador} placeholder="Identificador ESP32" />
        <Button title={editando ? 'Salvar Alteração' : 'Adicionar Moto'} onPress={salvarMoto} />
        {editando && (
          <Button title="Cancelar" color="#888" onPress={limparCampos} />
        )}
      </View>
      <FlatList
        data={motos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            {item.nome ? <Text>Nome: {item.nome}</Text> : null}
            <Text>Placa: {item.placa}</Text>
            <Text>Identificador: {item.identificador}</Text>
            <View style={estilos.botoes}>
              <Button title="Detalhes" onPress={() => router.push({ pathname: '/(tabs)/detalhes', params: { moto: JSON.stringify(item) } })} />
              <Button title="Ver no Mapa" onPress={() => router.push({ pathname: '/(tabs)/mapa', params: { moto: JSON.stringify(item) } })} />
              <Button title="Editar" onPress={() => editarMoto(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 8 },
  botoes: { flexDirection: 'row', gap: 8, marginTop: 8 },
  campo: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 },
}); 