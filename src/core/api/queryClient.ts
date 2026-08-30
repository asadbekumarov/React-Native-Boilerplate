import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query konfiguratsiyasi.
 * 
 * - staleTime: 5 daqiqa — so'rovlar 5 daqiqa davomida "yangi" hisoblanadi
 * - retry: 2 — muvaffaqiyatsiz so'rovlar 2 marta qayta uriniladi
 * - refetchOnWindowFocus: false — oyna fokusga qaytganda avtomatik qayta so'rov yuborilmaydi
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 daqiqa
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
