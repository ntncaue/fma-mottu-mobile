import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { auth } from '@/services/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Alert, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const criadores = [
  {
    nome: 'Antonio Caue',
    github: 'https://github.com/ntncaue',
  },
  {
    nome: 'Marcelo Bonfim',
    github: 'https://github.com/marcelooou',
  },
  {
    nome: 'Felipe Gomes',
    github: 'https://github.com/felipeorikasa',
  },
];

export default function SobreScreen() {
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      Alert.alert("Erro de Logout", error.message);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="business" size={64} color={tintColor} />
          <ThemedText type="title" style={styles.title}>Mottu</ThemedText>
        </View>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Sobre o Sistema</ThemedText>
          <ThemedText style={styles.text}>
            O sistema de localização de motos da Mottu utiliza tecnologia ESP32 para identificar e localizar
            cada moto em nosso pátio. Cada moto possui um identificador único que permite sua localização
            precisa dentro do pátio.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Como Funciona</ThemedText>
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <Ionicons name="search" size={24} color={tintColor} />
              <ThemedText style={styles.stepText}>
                1. Busque a moto pela placa ou identificador ESP32
              </ThemedText>
            </View>
            <View style={styles.step}>
              <Ionicons name="map" size={24} color={tintColor} />
              <ThemedText style={styles.stepText}>
                2. Visualize a localização no mapa do pátio
              </ThemedText>
            </View>
            <View style={styles.step}>
              <Ionicons name="bicycle" size={24} color={tintColor} />
              <ThemedText style={styles.stepText}>
                3. Encontre a moto facilmente usando as coordenadas
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Contato</ThemedText>
          <View style={styles.contactContainer}>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={24} color={tintColor} />
              <ThemedText style={styles.contactText}>contato@mottu.com.br</ThemedText>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call" size={24} color={tintColor} />
              <ThemedText style={styles.contactText}>(11) 1234-5678</ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Criadores</ThemedText>
          <View style={styles.criadoresContainer}>
            {criadores.map((criador) => (
              <View key={criador.github} style={styles.criadorItem}>
                <Ionicons name="logo-github" size={24} color={iconColor} />
                <ThemedText style={styles.criadorNome}>{criador.nome}</ThemedText>
                <TouchableOpacity onPress={() => Linking.openURL(criador.github)}>
                  <ThemedText style={[styles.criadorLink, { color: tintColor }]}>{criador.github.replace('https://', '')}</ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedButton title="Logout" onPress={handleLogout} color="#888" />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  title: {
    marginTop: 16,
    fontSize: 32,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  text: {
    lineHeight: 24,
  },
  stepContainer: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepText: {
    flex: 1,
  },
  contactContainer: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {},
  criadoresContainer: {
    gap: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  criadorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  criadorNome: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  criadorLink: {
    textDecorationLine: 'underline',
    fontSize: 13,
  },
});