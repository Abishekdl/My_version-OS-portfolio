import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Monitor, Moon, Sun, Info, Brain, Code, Users, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const wallpapers = [
    "/arch_wallpaper.png",
    "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2070",
    "/wallpaper3.png",
];

const aboutCards = [
    {
        title: "AI Enthusiast",
        description: "Building intelligent systems with deep learning and neural networks",
        icon: Brain,
        color: "bg-gradient-to-br from-pink-500 to-rose-500",
        delay: 0.1
    },
    {
        title: "Full-Stack Developer",
        description: "Creating end-to-end solutions with modern web technologies",
        icon: Code,
        color: "bg-gradient-to-br from-blue-500 to-cyan-500",
        delay: 0.2
    },
    {
        title: "Team Player",
        description: "Organizing workshops and collaborating on innovative projects",
        icon: Users,
        color: "bg-gradient-to-br from-green-500 to-emerald-500",
        delay: 0.3
    }
];

export const Settings: React.FC = () => {
    const { theme, setTheme, setWallpaper: setThemeWallpaper } = useThemeStore();
    const [activeTab, setActiveTab] = React.useState<'appearance' | 'about'>('appearance');
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="h-full bg-gray-50 dark:bg-gray-900 flex text-gray-900 dark:text-gray-100 relative overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                absolute md:relative inset-y-0 left-0 z-30
                w-64 md:w-48 bg-white dark:bg-gray-800 
                border-r border-gray-200 dark:border-gray-700 
                p-4 transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex items-center justify-between mb-6 md:mb-4">
                    <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">System</h2>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>
                <div className="space-y-1">
                    <button
                        onClick={() => {
                            setActiveTab('appearance');
                            setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${activeTab === 'appearance' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        <Monitor size={16} /> Appearance
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('about');
                            setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${activeTab === 'about' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        <Info size={16} /> About
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-auto">
                {activeTab === 'appearance' ? (
                    <>
                        <div className="flex items-center gap-4 mb-8">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                            <h1 className="text-2xl font-bold">Appearance</h1>
                        </div>

                        {/* Theme */}
                        <section className="mb-8">
                            <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">Theme</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="w-24 h-16 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                                        <Sun size={24} className="text-gray-400" />
                                    </div>
                                    <span className="text-sm font-medium">Light</span>
                                </button>

                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-gray-800 text-white' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="w-24 h-16 bg-gray-900 border border-gray-700 rounded-lg shadow-sm flex items-center justify-center">
                                        <Moon size={24} className="text-gray-400" />
                                    </div>
                                    <span className="text-sm font-medium">Dark</span>
                                </button>
                            </div>
                        </section>

                        {/* Wallpaper */}
                        <section>
                            <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">Wallpaper</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {wallpapers.map((wp, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setThemeWallpaper(wp)}
                                        className="relative group cursor-pointer rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-400 transition-all"
                                    >
                                        <img src={wp} alt={`Wallpaper ${i + 1}`} className="w-full h-32 object-cover" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">Set Wallpaper</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                            <h1 className="text-2xl font-bold">About</h1>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                    A
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">AbishekOS</h2>
                                    <p className="text-gray-500 dark:text-gray-400">Version 1.0.0</p>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                A web-based portfolio operating system built with React, TypeScript, and Tailwind CSS.
                                Designed to showcase projects and skills in an interactive, desktop-like environment.
                            </p>

                            {/* Interactive Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {aboutCards.map((card, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: card.delay }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-500/30 transition-all cursor-default group"
                                    >
                                        <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <card.icon className="text-white" size={24} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Built by Abishek</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    I'm Abishek — a developer powered by curiosity, creativity, and unlimited Coffee ☕.
                                    I build things that pretend to be operating systems, break them, fix them, upgrade them… then break them again.
                                    If something looks normal, I'll make it unique.
                                    If it already looks unique, congratulations — it's about to get version 2.0 😉.
                                </p>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-500/20"
                            >
                                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Open to Collaboration</h3>
                                <p className="text-blue-600 dark:text-blue-400 text-sm">
                                    I'm always interested in working on exciting new projects.
                                    If you have an idea or want to collaborate, feel free to reach out!
                                </p>
                            </motion.div>
                        </div>

                        <div className="text-center text-gray-400 text-sm">
                            &copy; 2025 Abishek D. All rights reserved.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
