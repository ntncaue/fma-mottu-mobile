import { auth } from '@/services/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
// Importamos useRouter e useSegments, necessários para o redirecionamento
import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Tipagem do contexto
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// =========================================================================
// 1. Hook de Proteção: Gerencia o redirecionamento entre (auth) e (tabs)
// =========================================================================
function useProtectedRoute(user: User | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();
  
  // Verifica se a rota atual está dentro do grupo (auth)
  const inAuthGroup = segments[0] === '(auth)';

  useEffect(() => {
    if (isLoading) return; // Espera o Firebase terminar a verificação

    if (!user && !inAuthGroup) {
      // Se NÃO está logado e NÃO está no grupo de login, redireciona para login
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Se está logado e AINDA está no grupo de login/cadastro, redireciona para a home
      router.replace('/(tabs)');
    }
  }, [user, isLoading, inAuthGroup, segments, router]);
}
// =========================================================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listener do Firebase para mudanças de estado
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. O hook de proteção é chamado aqui
  useProtectedRoute(user, isLoading);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useSession must be wrapped in an <AuthProvider />');
  return value;
}