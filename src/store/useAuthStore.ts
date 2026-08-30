import { create } from 'zustand';
import { StorageWrapper } from '../core/storage';

interface User {
  id: string;
  name: string;
  email: string;
  // ... other user fields
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
  logout: () => {
    StorageWrapper.removeItem('access_token');
    StorageWrapper.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false });
  },
  checkAuth: () => {
    const token = StorageWrapper.getItemString('access_token');
    if (token) {
      // Typically, you might also want to validate the token or fetch the user profile here
      set({ isAuthenticated: true });
    } else {
      set({ isAuthenticated: false });
    }
  }
}));
