import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface AppIconProps {
    id: string;
    title: string;
    icon: LucideIcon;
    color: string;
    isOpen: boolean;
    onClick: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({ title, icon: Icon, color, isOpen, onClick }) => {
    const [animationState, setAnimationState] = useState<'idle' | 'bouncing' | 'zooming'>('idle');

    const handleClick = () => {
        if (isOpen || animationState !== 'idle') {
            onClick();
            return;
        }

        // Start animation sequence
        setAnimationState('bouncing');

        // After bounce (220ms), start zoom
        setTimeout(() => {
            setAnimationState('zooming');
        }, 220);

        // After zoom (420ms), open app and reset
        setTimeout(() => {
            onClick();
            // Small delay to allow window to open before resetting icon
            setTimeout(() => {
                setAnimationState('idle');
            }, 100);
        }, 640); // 220ms + 420ms
    };

    return (
        <div className="relative group flex flex-col items-center">
            <motion.div
                className="relative cursor-pointer"
                onClick={handleClick}
                whileHover={animationState === 'idle' ? { scale: 1.2, y: -10 } : {}}
            >
                <div
                    className={`
                        p-2.5 rounded-xl bg-gray-800/80 border border-white/5 shadow-lg ${color}
                        ${animationState === 'bouncing' ? 'animate-bounce-rotate' : ''}
                        ${animationState === 'zooming' ? 'animate-zoom-forward' : ''}
                    `}
                >
                    <Icon size={24} />
                </div>

                {isOpen && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
            </motion.div>

            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-50">
                {title}
            </div>
        </div>
    );
};
