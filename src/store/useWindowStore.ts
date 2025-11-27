import { create } from 'zustand';

export interface WindowState {
    id: string;
    title: string;
    icon: string;
    component: React.ReactNode;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    previousPosition?: { x: number; y: number };
    previousSize?: { width: number; height: number };
}

interface WindowStore {
    windows: WindowState[];
    activeWindowId: string | null;
    zIndexCounter: number;

    openWindow: (id: string, title: string, icon: string, component: React.ReactNode) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowPosition: (id: string, x: number, y: number) => void;
    updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
    windows: [],
    activeWindowId: null,
    zIndexCounter: 100,

    openWindow: (id, title, icon, component) => set((state) => {
        const existingWindow = state.windows.find(w => w.id === id);
        if (existingWindow) {
            return {
                activeWindowId: id,
                zIndexCounter: state.zIndexCounter + 1,
                windows: state.windows.map(w =>
                    w.id === id ? { ...w, isMinimized: false, zIndex: state.zIndexCounter + 1 } : w
                )
            };
        }

        // Calculate centered position
        const defaultWidth = 800;
        const defaultHeight = 600;
        const taskbarHeight = 48;
        const dockHeight = 80; // Approximate dock height
        const availableHeight = window.innerHeight - taskbarHeight - dockHeight;
        const x = Math.max(0, (window.innerWidth - defaultWidth) / 2);
        const y = Math.max(taskbarHeight, taskbarHeight + (availableHeight - defaultHeight) / 2);
        
        console.log('Opening window:', id, 'at position:', { x, y }, 'viewport:', { width: window.innerWidth, height: window.innerHeight });

        return {
            activeWindowId: id,
            zIndexCounter: state.zIndexCounter + 1,
            windows: [...state.windows, {
                id,
                title,
                icon,
                component,
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                zIndex: state.zIndexCounter + 1,
                position: { x, y },
                size: { width: defaultWidth, height: defaultHeight }
            }]
        };
    }),

    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter(w => w.id !== id),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
    })),

    minimizeWindow: (id) => set((state) => ({
        activeWindowId: null,
        windows: state.windows.map(w =>
            w.id === id ? { ...w, isMinimized: true } : w
        )
    })),

    maximizeWindow: (id) => set((state) => ({
        activeWindowId: id,
        zIndexCounter: state.zIndexCounter + 1,
        windows: state.windows.map(w => {
            if (w.id === id) {
                if (w.isMaximized) {
                    // Restore to previous position/size
                    return {
                        ...w,
                        isMaximized: false,
                        zIndex: state.zIndexCounter + 1,
                        position: w.previousPosition || w.position,
                        size: w.previousSize || w.size,
                        previousPosition: undefined,
                        previousSize: undefined
                    };
                } else {
                    // Maximize and store current position/size
                    return {
                        ...w,
                        isMaximized: true,
                        zIndex: state.zIndexCounter + 1,
                        previousPosition: w.position,
                        previousSize: w.size
                    };
                }
            }
            return w;
        })
    })),

    focusWindow: (id) => set((state) => ({
        activeWindowId: id,
        zIndexCounter: state.zIndexCounter + 1,
        windows: state.windows.map(w =>
            w.id === id ? { ...w, isMinimized: false, zIndex: state.zIndexCounter + 1 } : w
        )
    })),

    updateWindowPosition: (id, x, y) => set((state) => ({
        windows: state.windows.map(w =>
            w.id === id ? { ...w, position: { x, y } } : w
        )
    })),

    updateWindowSize: (id, width, height) => set((state) => ({
        windows: state.windows.map(w =>
            w.id === id ? { ...w, size: { width, height } } : w
        )
    })),
}));
