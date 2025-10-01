import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

// Importe AppThemeProvider e AuthProvider da sua estrutura
import { AppThemeProvider } from '@/hooks/useAppTheme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useSession } from '@/hooks/useSession'; // useSession contém user e loading

// Garante que a splash screen não desapareça antes de carregar as fontes
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // Obtemos user, loading do hook de sessão
  const { user, isLoading } = useSession(); 
  const router = useRouter();
  const segments = useSegments();

  // --- Lógica de Carregamento de Fontes ---
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Adicione outras fontes aqui
  });

  // Tratar erros de fonte
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Esconder a splash screen quando as fontes estiverem carregadas
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // --- Lógica de Redirecionamento de Autenticação ---
  useEffect(() => {
    // Espera até que as fontes e o estado de autenticação (isLoading) estejam prontos
    if (isLoading || !loaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Se não está logado e não está no grupo (auth), redireciona para login
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Se está logado e ainda está no grupo (auth), redireciona para a home
      router.replace('/(tabs)');
    }
  }, [user, isLoading, loaded, segments, router]); // Adicionei 'isLoading' ao invés de 'loading'

  // Retorna null enquanto as fontes ou o Firebase estão carregando
  if (!loaded || isLoading) { 
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function RootLayout() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </AppThemeProvider>
  );
}

export default RootLayout;