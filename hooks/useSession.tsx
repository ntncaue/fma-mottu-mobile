import { auth } from '@/services/firebase';
import { useRouter, useSegments } from 'expo-router';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Tipagem do contexto
interface AuthContextType {
  user: User | null;
  // Use 'isLoading' consistentemente
  isLoading: boolean; 
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hook de Proteção (Lógica de Redirecionamento)
function useProtectedRoute(user: User | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();
  
  // Verifica se a rota atual está dentro do grupo (auth)
  const inAuthGroup = segments[0] === '(auth)';

  useEffect(() => {
    // ESSA É A CHAVE: Espera até que o estado de carregamento (Firebase) esteja pronto
    if (isLoading) return; 

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, isLoading, inAuthGroup, segments, router]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // ESSA CHAMADA GARANTE QUE O CARREGAMENTO SEMPRE TERMINE
      setIsLoading(false); 
    });

    return () => unsubscribe();
  }, []);

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