import { TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppTheme } from '@/hooks/useAppTheme';
import { ThemedText } from './ThemedText';

export const ThemedButton = ({ title, onPress, color, style }: { title: string, onPress: () => void, color?: string, style?: any }) => {
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

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: buttonBackgroundColor }, style]}>
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
