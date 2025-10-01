import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useDeviceColorScheme() ?? 'light';
  const [theme, setThemeState] = useState<Theme>(deviceTheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setThemeState(savedTheme as Theme);
        } else {
          setThemeState(deviceTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
        setThemeState(deviceTheme);
      }
    };

    loadTheme();
  }, [deviceTheme]);

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};
