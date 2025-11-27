import { create } from 'zustand';

interface SystemStore {
    isBooting: boolean;
    isLoggedIn: boolean;
    isLocked: boolean;
    isPowerMenuOpen: boolean;
    isLauncherOpen: boolean;

    setBooting: (isBooting: boolean) => void;
    setLoggedIn: (isLoggedIn: boolean) => void;
    setLocked: (isLocked: boolean) => void;
    setPowerMenuOpen: (isOpen: boolean) => void;
    setLauncherOpen: (isOpen: boolean) => void;
    toggleLauncher: () => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
    isBooting: true,
    isLoggedIn: false,
    isLocked: false,
    isPowerMenuOpen: false,
    isLauncherOpen: false,

    setBooting: (isBooting) => set({ isBooting }),
    setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    setLocked: (isLocked) => set({ isLocked }),
    setPowerMenuOpen: (isPowerMenuOpen) => set({ isPowerMenuOpen }),
    setLauncherOpen: (isLauncherOpen) => set({ isLauncherOpen }),
    toggleLauncher: () => set((state) => ({ isLauncherOpen: !state.isLauncherOpen })),
}));
