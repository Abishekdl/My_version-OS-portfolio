import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { Window } from './Window';
import { AnimatePresence } from 'framer-motion';

export const WindowManager: React.FC = () => {
    const { windows } = useWindowStore();

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            <div id="window-container" className="relative w-full h-full pointer-events-auto">
                <AnimatePresence>
                    {windows.map((window) => (
                        <Window key={window.id} window={window} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
