import { useAppTheme } from '@/hooks/useAppTheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

// 1. Tipagem atualizada para incluir 'disabled'
interface ButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean; // Nova propriedade adicionada
}

export const ThemedButton = ({ title, onPress, color, style, disabled = false }: ButtonProps) => {
  const { theme } = useAppTheme();
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  
  const isPrimary = !color;
  const buttonBackgroundColor = color || tintColor;

  let textColor: string = 'white';
  if (isPrimary && theme === 'dark') {
    textColor = backgroundColor;
  } else if (isPrimary && theme === 'light') {
    textColor = 'white';
  }

  // Define a opacidade para desabilitado
  const finalOpacity = disabled ? 0.6 : 1;

  return (
    // 2. Aplicando as props 'onPress' e 'disabled'
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled} 
      style={[
        styles.button, 
        { backgroundColor: buttonBackgroundColor, opacity: finalOpacity }, 
        style
      ]}
    >
      <ThemedText style={[styles.buttonText, { color: textColor }]}>{title}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
