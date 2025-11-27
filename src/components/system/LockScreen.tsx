import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../../store/useSystemStore';
import { format } from 'date-fns';
import { Lock, User } from 'lucide-react';

export const LockScreen: React.FC = () => {
    const { isLocked, setLocked } = useSystemStore();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!isLocked) return null;

    return (
        <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[200] bg-black/40 flex flex-col items-center justify-center text-white"
            onClick={() => setLocked(false)}
        >
            <div className="flex flex-col items-center gap-8">
                <div className="text-center">
                    <h1 className="text-8xl font-thin mb-4">{format(time, 'HH:mm')}</h1>
                    <p className="text-2xl font-light">{format(time, 'EEEE, MMMM d')}</p>
                </div>

                <div className="flex flex-col items-center gap-4 mt-12">
                    <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-white/20 flex items-center justify-center overflow-hidden">
                        <User size={64} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-medium">Abishek</h2>
                    <div className="flex items-center gap-2 text-white/60 animate-pulse mt-4">
                        <Lock size={16} />
                        <span>Click to unlock</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
