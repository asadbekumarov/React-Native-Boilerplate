import '../global.css'; // MUST be first for NativeWind v4
import { Slot, DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

SplashScreen.preventAutoHideAsync();


import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { NoInternet } from '@/shared/components/NoInternet';

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const { theme, initializeTheme } = useThemeStore();
  
  useEffect(() => {
    initializeTheme();
    // Hide splash screen after app is ready
    SplashScreen.hideAsync();
  }, []);

  // Determine actual theme string
  const activeTheme = theme === 'system' ? (systemColorScheme || 'light') : theme;
  
  // Choose Navigation Theme (Light/Dark fallback for Navigation container)
  const navTheme = activeTheme === 'dark' || activeTheme.includes('dark') ? DarkTheme : DefaultTheme;
  
  return (
    <Provider store={store}>
      <ThemeProvider value={navTheme}>
        <ErrorBoundary>
          <NoInternet>
            <View style={{ flex: 1 }} className={activeTheme}>
              <Slot />
            </View>
          </NoInternet>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
