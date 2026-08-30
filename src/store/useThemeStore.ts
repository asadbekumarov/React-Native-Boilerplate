import { create } from 'zustand';
import { StorageWrapper } from '../core/storage';

export type Theme = 'light' | 'dark' | 'system' | 'custom_green' | 'custom_blue';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system', // Default theme
  setTheme: (theme: Theme) => {
    StorageWrapper.setItem('app_theme', theme);
    set({ theme });
  },
  initializeTheme: () => {
    const savedTheme = StorageWrapper.getItemString('app_theme') as Theme;
    if (savedTheme) {
      set({ theme: savedTheme });
    }
  }
}));
