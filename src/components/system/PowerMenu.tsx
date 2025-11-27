import React from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../../store/useSystemStore';
import { Lock, LogOut, RefreshCw, Power } from 'lucide-react';

export const PowerMenu: React.FC = () => {
    const { isPowerMenuOpen, setPowerMenuOpen, setLocked, setLoggedIn } = useSystemStore();

    if (!isPowerMenuOpen) return null;

    const handleAction = (action: string) => {
        setPowerMenuOpen(false);
        switch (action) {
            case 'lock':
                setLocked(true);
                break;
            case 'logout':
                setLoggedIn(false);
                break;
            case 'restart':
                window.location.reload();
                break;
            case 'shutdown':
                // Just reload for now, or show a black screen
                window.location.reload();
                break;
        }
    };

    return (
        <div
            className="fixed inset-0 z-[150] bg-black/50 flex items-center justify-center"
            onClick={() => setPowerMenuOpen(false)}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="flex gap-8"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={() => handleAction('lock')}
                    className="flex flex-col items-center gap-4 group"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Lock className="text-white" size={24} />
                    </div>
                    <span className="text-white font-medium">Lock</span>
                </button>

                <button
                    onClick={() => handleAction('logout')}
                    className="flex flex-col items-center gap-4 group"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-yellow-600 transition-colors">
                        <LogOut className="text-white" size={24} />
                    </div>
                    <span className="text-white font-medium">Logout</span>
                </button>

                <button
                    onClick={() => handleAction('restart')}
                    className="flex flex-col items-center gap-4 group"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                        <RefreshCw className="text-white" size={24} />
                    </div>
                    <span className="text-white font-medium">Restart</span>
                </button>

                <button
                    onClick={() => handleAction('shutdown')}
                    className="flex flex-col items-center gap-4 group"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                        <Power className="text-white" size={24} />
                    </div>
                    <span className="text-white font-medium">Shutdown</span>
                </button>
            </motion.div>
        </div>
    );
};
