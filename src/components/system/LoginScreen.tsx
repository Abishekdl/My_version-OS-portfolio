import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';
import { format } from 'date-fns';

export const LoginScreen: React.FC = () => {
    const { setLoggedIn } = useSystemStore();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white relative px-4"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2070")',
                backgroundColor: 'rgba(0,0,0,0.4)',
                backgroundBlendMode: 'overlay'
            }}
        >
            <div className="absolute top-0 w-full h-full backdrop-blur-sm z-0"></div>

            <div className="z-10 flex flex-col items-center w-full max-w-md">
                <div className="mb-8 md:mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-light mb-2">{format(time, 'HH:mm')}</h1>
                    <p className="text-lg md:text-xl font-light">{format(time, 'EEEE, MMMM d')}</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/30 backdrop-blur-md p-6 md:p-8 rounded-2xl w-full flex flex-col items-center border border-white/10 shadow-2xl"
                >
                    <motion.div
                        onClick={handleLogin}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-full mb-4 flex items-center justify-center overflow-hidden border-2 border-white/20 cursor-pointer hover:border-blue-400 transition-all"
                    >
                        {/* Placeholder for user avatar, using icon for now */}
                        <User size={40} className="text-gray-400 md:w-12 md:h-12" />
                    </motion.div>

                    <h2 className="text-xl md:text-2xl font-medium mb-2">Abishek</h2>

                    <p className="text-sm text-white/60">Click to login</p>
                </motion.div>
            </div>
        </div>
    );
};
