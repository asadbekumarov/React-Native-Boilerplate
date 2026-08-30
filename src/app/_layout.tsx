import '../global.css';

import '@/core/i18n';

import {
  Slot,
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useRouter,
  useSegments,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/api/queryClient';
import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { NoInternet } from '@/shared/components/NoInternet'; // MUST be first for NativeWind v4

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../core/reactotron');
}

// Usb turish (hold) uchun SplashScreen ni yashirmaymiz
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const { theme, initializeTheme } = useThemeStore();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  const segments = useSegments();
  const router = useRouter();

  // Initialization (Theme & Auth)
  useEffect(() => {
    initializeTheme();
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update ready state safely
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, [initializeTheme, checkAuth]);

  // Auth Routing
  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = (segments[0] as string) === '(auth)';

    /*
      // Agar ilovangizda majburiy avtorizatsiya kerak bo'lsa (hamma ekranlar yopiq bo'lsa),
      // quyidagi kodni izohdan (commentdan) chiqaring:
      
      if (!isAuthenticated && !inAuthGroup) {
        // User is not authenticated, but trying to access protected routes -> send to login
        router.replace('/(auth)/login' as any);
      } else
    */

    if (isAuthenticated && inAuthGroup) {
      // User is authenticated, but in auth screens -> send to app root
      router.replace('/');
    }
  }, [isAuthenticated, segments, isReady, router]);

  // Hide SplashScreen only after everything is ready
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  // Determine actual theme string
  const activeTheme = theme === 'system' ? systemColorScheme || 'light' : theme;

  // Choose Navigation Theme (Light/Dark fallback for Navigation container)
  const navTheme =
    activeTheme === 'dark' || activeTheme.includes('dark')
      ? DarkTheme
      : DefaultTheme;

  // Toaster theme configuration based on active NativeWind theme
  const isDarkMode =
    activeTheme === 'dark' ||
    activeTheme === 'custom_green' ||
    activeTheme === 'custom_blue';

  // Providerlar Tartibi (Eng tashqidan eng ichkigacha)
  // 1. GestureHandlerRootView - Gesture/Touch eventlar hamma joyda ishlashi uchun
  // 2. QueryClientProvider - API holati hamma joyda kerak
  // 3. ThemeProvider - Navigatsiya theme'si
  // 4. BottomSheetModalProvider - Modallar har qanday ekrandan chaqirilishi uchun
  // 5. ErrorBoundary & NoInternet - Xatoliklar barchasini ushlash
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={navTheme}>
          <BottomSheetModalProvider>
            <ErrorBoundary>
              <NoInternet>
                <View style={{ flex: 1 }} className={activeTheme}>
                  <Slot />
                  {/* Toaster eng yuqori UI qatlami (Overlay) sifatida */}
                  <Toaster
                    theme={isDarkMode ? 'dark' : 'light'}
                    position="top-center"
                    richColors
                  />
                </View>
              </NoInternet>
            </ErrorBoundary>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
