import { create } from 'zustand';

interface ThemeStore {
    theme: 'dark' | 'light';
    wallpaper: string;
    setTheme: (theme: 'dark' | 'light') => void;
    setWallpaper: (url: string) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: 'dark',
    wallpaper: "/wallpaper5.png",
    setTheme: (theme) => set({ theme }),
    setWallpaper: (wallpaper) => set({ wallpaper }),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
