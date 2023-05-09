import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

interface State {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useStore = create<State>(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        setTheme: (theme) => set((state) => ({ theme })),
      }),
      { name: 'my-dashboard-storage' }
    )
  )
);
