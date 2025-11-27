import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Command, X } from 'lucide-react';

interface ShortcutHelpProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ShortcutHelp: React.FC<ShortcutHelpProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    const shortcuts = [
        { key: 'Super + Space', action: 'Open App Launcher' },
        { key: 'Ctrl + Shift + L', action: 'Lock Screen' },
        { key: 'Alt + Shift + P', action: 'Power Menu' },
        { key: 'Ctrl + Shift + /', action: 'Show Shortcuts' },
        { key: 'Alt + Shift + T', action: 'Open Terminal' },
        { key: 'Alt + Shift + B', action: 'Open Browser' },
        { key: 'Alt + Shift + F', action: 'Open Files' },
        { key: 'Alt + Shift + W', action: 'Close Active Window' }
    ];

    return (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-900 border border-white/10 rounded-xl p-6 w-[500px] shadow-2xl relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Command size={24} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-gray-300">{shortcut.action}</span>
                            <kbd className="px-2 py-1 bg-black/40 rounded border border-white/10 text-sm font-mono text-blue-400">
                                {shortcut.key}
                            </kbd>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
