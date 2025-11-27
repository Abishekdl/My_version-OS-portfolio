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
    wallpaper: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2070",
    setTheme: (theme) => set({ theme }),
    setWallpaper: (wallpaper) => set({ wallpaper }),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
