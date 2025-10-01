import { useAppTheme } from './useAppTheme';

export function useColorScheme() {
  const { theme } = useAppTheme();
  return theme;
}