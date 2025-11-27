import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWindowStore, type WindowState } from '../../store/useWindowStore';
import { motion } from 'framer-motion';

interface WindowProps {
    window: WindowState;
}

export const Window: React.FC<WindowProps> = ({ window: windowState }) => {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } = useWindowStore();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMaximized = windowState.isMaximized || isMobile;

    return (
        <Rnd
            style={{
                zIndex: windowState.zIndex,
                display: windowState.isMinimized ? 'none' : 'flex'
            }}
            position={isMaximized ? { x: 0, y: 48 } : windowState.position}
            size={isMaximized ? { width: window.innerWidth, height: window.innerHeight - 48 } : windowState.size}
            minWidth={isMobile ? window.innerWidth : 400}
            minHeight={isMobile ? window.innerHeight - 48 : 300}
            bounds="window"
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            onDragStop={(_e, d) => {
                if (!isMaximized) {
                    updateWindowPosition(windowState.id, d.x, d.y);
                }
            }}
            onResizeStop={(_e, _direction, ref, _delta, position) => {
                if (!isMaximized) {
                    updateWindowSize(windowState.id, ref.offsetWidth, ref.offsetHeight);
                    updateWindowPosition(windowState.id, position.x, position.y);
                }
            }}
            onDragStart={() => focusWindow(windowState.id)}
            onClick={() => focusWindow(windowState.id)}
            className="flex flex-col"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`flex flex-col h-full w-full bg-gray-900/95 backdrop-blur-xl ${isMaximized ? 'rounded-none' : 'rounded-lg'} border border-white/10 shadow-2xl overflow-hidden`}
            >
                {/* Title Bar */}
                <div
                    className="h-10 bg-gray-800/50 border-b border-white/5 flex items-center justify-between px-4 select-none"
                    onDoubleClick={() => !isMobile && maximizeWindow(windowState.id)}
                >
                    <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-300">{windowState.title}</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(windowState.id); }}
                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
                        >
                            <Minus size={14} />
                        </button>
                        {!isMobile && (
                            <button
                                onClick={(e) => { e.stopPropagation(); maximizeWindow(windowState.id); }}
                                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
                            >
                                {windowState.isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
                            </button>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); closeWindow(windowState.id); }}
                            className="p-1.5 hover:bg-red-500/80 rounded-md transition-colors text-gray-400 hover:text-white"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto text-white">
                    {windowState.component}
                </div>
            </motion.div>
        </Rnd>
    );
};
