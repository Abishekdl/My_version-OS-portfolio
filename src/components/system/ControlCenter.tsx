import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Volume2, Sun, Battery, Bluetooth, Monitor } from 'lucide-react';

interface ControlCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose }) => {
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
    const [brightness, setBrightness] = useState(100);
    const [volume, setVolume] = useState(75);

    // Apply brightness to the entire page
    React.useEffect(() => {
        document.documentElement.style.filter = `brightness(${brightness}%)`;
        return () => {
            document.documentElement.style.filter = '';
        };
    }, [brightness]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-14 right-4 w-80 bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 z-50 text-white"
                    >
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {/* Connectivity Toggles */}
                            <div className="bg-gray-800/50 rounded-xl p-3 flex flex-col gap-3">
                                <button
                                    onClick={() => setWifiEnabled(!wifiEnabled)}
                                    className={`flex items-center gap-3 p-2 rounded-lg transition-all ${wifiEnabled ? 'bg-blue-500 text-white' : 'bg-gray-700/50 text-gray-400'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${wifiEnabled ? 'bg-white/20' : 'bg-gray-600/50'}`}>
                                        <Wifi size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium">Wi-Fi</div>
                                        <div className="text-xs opacity-70">{wifiEnabled ? 'Home Network' : 'Off'}</div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                                    className={`flex items-center gap-3 p-2 rounded-lg transition-all ${bluetoothEnabled ? 'bg-blue-500 text-white' : 'bg-gray-700/50 text-gray-400'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bluetoothEnabled ? 'bg-white/20' : 'bg-gray-600/50'}`}>
                                        <Bluetooth size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium">Bluetooth</div>
                                        <div className="text-xs opacity-70">{bluetoothEnabled ? 'On' : 'Off'}</div>
                                    </div>
                                </button>
                            </div>

                            {/* System Status */}
                            <div className="grid grid-rows-2 gap-3">
                                <div className="bg-gray-800/50 rounded-xl p-3 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
                                        <Monitor size={16} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">Display</div>
                                        <div className="text-xs text-gray-400">Generic PnP</div>
                                    </div>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-3 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                                        <Battery size={16} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">Battery</div>
                                        <div className="text-xs text-gray-400">100%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sliders */}
                        <div className="space-y-4 bg-gray-800/30 rounded-xl p-4 border border-white/5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-gray-400 font-medium uppercase tracking-wider">
                                    <span>Display</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-800/50 p-2 rounded-lg border border-white/5">
                                    <Sun size={18} className="text-gray-400" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={brightness}
                                        onChange={(e) => setBrightness(parseInt(e.target.value))}
                                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-gray-400 font-medium uppercase tracking-wider">
                                    <span>Sound</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-800/50 p-2 rounded-lg border border-white/5">
                                    <Volume2 size={18} className="text-gray-400" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={(e) => setVolume(parseInt(e.target.value))}
                                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
