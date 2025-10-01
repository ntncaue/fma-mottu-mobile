import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { auth } from '@/services/firebase';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'background');
  const placeholderColor = useThemeColor({ light: '#999', dark: '#777' }, 'background');
  const tintColor = useThemeColor({}, 'tint');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        router.replace('/(tabs)');
      })
      .catch((error) => {
        Alert.alert("Erro de Cadastro", error.message);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Cadastro</ThemedText>
      
      <TextInput
        style={[styles.input, { color: textColor, borderColor: borderColor }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={placeholderColor}
      />
      <TextInput
        style={[styles.input, { color: textColor, borderColor: borderColor }]}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={placeholderColor}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={handleRegister}>
        <ThemedText style={styles.buttonText}>Cadastrar</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <ThemedText style={styles.link}>Já tem uma conta? Faça login</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 24,
    textAlign: 'center',
    color: '#007AFF', // This should be tint color
  },
});
