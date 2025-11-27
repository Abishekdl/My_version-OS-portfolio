import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../../store/useSystemStore';

const asciiLogo = `
                         .oo.
                        .ooooo:
                       .ooooooo.
                      -+ooooooo+:
                     /:-++oooooo+:
                    /++++++++++++++:
                   ./++++++++++++++++-
                  ./oooossso++osssssso+.
                 ./oooooosso. ./osssssso.                AbishekOS v1.0.0
                ./oossssso.     :sssssso.
               ./oossssss/       +ssssooo/-           Hyperland Inspired Portfolio
              ./osssso!/:-       -/!osssso/-
             -/!osso:                -/!oso: -://           arch btw ;)
`;

interface BootLog {
    timestamp: number;
    message: string;
    status: 'OK' | 'DONE';
}

const bootMessages: Omit<BootLog, 'timestamp'>[] = [
    { message: "Booting AbishekOS v1.0.0...", status: 'OK' },
    { message: "Initializing memory management...", status: 'OK' },
    { message: "Starting system services...", status: 'OK' },
    { message: "Loading device drivers...", status: 'OK' },
    { message: "Mounting filesystems...", status: 'OK' },
    { message: "Starting network services...", status: 'OK' },
    { message: "Loading desktop environment...", status: 'OK' },
    { message: "Initializing Hyperland compositor...", status: 'OK' },
    { message: "Loading user preferences...", status: 'OK' },
    { message: "Starting display manager...", status: 'OK' },
    { message: "System ready.", status: 'OK' },
    { message: "Welcome to AbishekOS!", status: 'DONE' }
];

export const BootScreen: React.FC = () => {
    const { setBooting } = useSystemStore();
    const [logs, setLogs] = useState<BootLog[]>([]);
    const [showLogo, setShowLogo] = useState(false);
    const startTime = Date.now();

    useEffect(() => {
        // Show logo first
        setTimeout(() => setShowLogo(true), 300);

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < bootMessages.length) {
                const elapsed = (Date.now() - startTime) / 1000;
                setLogs(prev => [...prev, {
                    ...bootMessages[currentIndex],
                    timestamp: elapsed
                }]);
                currentIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setBooting(false);
                }, 800);
            }
        }, 180);

        return () => clearInterval(interval);
    }, [setBooting]);

    return (
        <div className="h-screen w-screen bg-black text-cyan-400 font-mono p-4 md:p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
                {/* ASCII Logo - Hidden on mobile, shown on md+ */}
                {showLogo && (
                    <motion.pre
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="hidden md:block text-cyan-400 mb-6 text-[10px] md:text-sm leading-tight overflow-x-hidden"
                    >
                        {asciiLogo}
                    </motion.pre>
                )}

                {/* Mobile Header - Shown only on mobile */}
                {showLogo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="md:hidden mb-6 text-center"
                    >
                        <h1 className="text-xl font-bold text-cyan-400 mb-2">AbishekOS v1.0.0</h1>
                        <p className="text-xs text-cyan-400/70">Hyperland Inspired Portfolio</p>
                    </motion.div>
                )}

                {/* Boot Logs */}
                <div className="font-mono text-xs md:text-sm">
                    {logs.map((log, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1 }}
                            className="mb-0.5 flex items-start flex-wrap"
                        >
                            <span className="text-gray-500 mr-2 inline-block min-w-[60px] md:min-w-[80px]">
                                [ {log.timestamp.toFixed(6)} ]
                            </span>
                            <span className="text-green-500 mr-2 inline-block min-w-[35px] md:min-w-[45px]">
                                [{log.status}]
                            </span>
                            <span className="text-gray-300 break-all">{log.message}</span>
                        </motion.div>
                    ))}

                    {/* Cursor */}
                    {logs.length > 0 && (
                        <div className="mt-2 flex items-center">
                            <span className="text-gray-500 mr-2 inline-block min-w-[60px] md:min-w-[80px]">
                                [ {((Date.now() - startTime) / 1000).toFixed(6)} ]
                            </span>
                            <div className="animate-pulse text-cyan-400">▊</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
