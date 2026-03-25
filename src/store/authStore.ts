import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  initFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  token: null,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: user !== null,
      isAdmin: user?.is_admin ?? false,
    });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },

  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      token: null,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  },

  initFromStorage: () => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('access_token');

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        set({
          user,
          isAuthenticated: true,
          isAdmin: user.is_admin,
          token: savedToken,
        });
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  },
}));
