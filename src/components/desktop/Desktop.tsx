import React, { useState, useEffect } from 'react';
import { Taskbar } from './Taskbar';
import { Dock } from './Dock';
import { WindowManager } from './WindowManager';
import { SearchLauncher } from '../system/SearchLauncher';
import { LockScreen } from '../system/LockScreen';
import { PowerMenu } from '../system/PowerMenu';
import { Calendar } from '../system/Calendar';
import { ShortcutHelp } from '../system/ShortcutHelp';
import { useSystemStore } from '../../store/useSystemStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useWindowStore } from '../../store/useWindowStore';
import { getAppComponent } from '../apps/AppRegistry';

export const Desktop: React.FC = () => {
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [isShortcutsOpen, setShortcutsOpen] = useState(false);
    const { setLauncherOpen, setLocked, setPowerMenuOpen } = useSystemStore();
    const { wallpaper } = useThemeStore();
    const { openWindow, closeWindow, windows } = useWindowStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            // Super + Space - Open App Launcher
            if ((e.metaKey || e.ctrlKey) && key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                setLauncherOpen(true);
                return;
            }

            // Ctrl + Shift + L - Lock Screen
            if (e.ctrlKey && e.shiftKey && key === 'l') {
                e.preventDefault();
                e.stopPropagation();
                setLocked(true);
                return;
            }

            // Alt + Shift + P - Power Menu
            if (e.altKey && e.shiftKey && key === 'p') {
                e.preventDefault();
                e.stopPropagation();
                setPowerMenuOpen(true);
                return;
            }

            // Ctrl + Shift + / - Show Shortcuts
            if (e.ctrlKey && e.shiftKey && (key === '/' || key === '?')) {
                e.preventDefault();
                e.stopPropagation();
                setShortcutsOpen(true);
                return;
            }

            // Alt + Shift + T - Open Terminal
            if (e.altKey && e.shiftKey && key === 't') {
                e.preventDefault();
                e.stopPropagation();
                openWindow('terminal', 'Terminal', 'terminal', getAppComponent('terminal'));
                return;
            }

            // Alt + Shift + B - Open Browser
            if (e.altKey && e.shiftKey && key === 'b') {
                e.preventDefault();
                e.stopPropagation();
                openWindow('browser', 'Browser', 'browser', getAppComponent('browser'));
                return;
            }

            // Alt + Shift + F - Open Files
            if (e.altKey && e.shiftKey && key === 'f') {
                e.preventDefault();
                e.stopPropagation();
                openWindow('files', 'Projects', 'files', getAppComponent('files'));
                return;
            }

            // Alt + Shift + W - Close Active Window
            if (e.altKey && e.shiftKey && key === 'w') {
                e.preventDefault();
                e.stopPropagation();
                // Find the window with highest zIndex
                const activeWindow = windows.reduce((max, w) =>
                    w.zIndex > max.zIndex ? w : max
                    , windows[0]);
                if (activeWindow) {
                    closeWindow(activeWindow.id);
                }
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown, true); // Use capture phase
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, [setLauncherOpen, setLocked, setPowerMenuOpen, openWindow, closeWindow, windows]);

    return (
        <div
            className="h-screen w-screen bg-cover bg-center relative overflow-hidden"
            style={{
                backgroundImage: `url("${wallpaper}")`,
            }}
        >
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

            <Taskbar onCalendarClick={() => setCalendarOpen(!isCalendarOpen)} />
            {/* <DesktopIcons /> */}
            <WindowManager />
            <Dock />

            <SearchLauncher />
            <LockScreen />
            <PowerMenu />
            <Calendar isOpen={isCalendarOpen} onClose={() => setCalendarOpen(false)} />
            <ShortcutHelp isOpen={isShortcutsOpen} onClose={() => setShortcutsOpen(false)} />
        </div>
    );
};
