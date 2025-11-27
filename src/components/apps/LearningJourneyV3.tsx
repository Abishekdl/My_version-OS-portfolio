import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, GraduationCap, Code, Database, Layers, Cpu } from 'lucide-react';

interface YearSection {
    id: string;
    year: string;
    title: string;
    subtitle: string;
    points: string[];
    icon: React.ElementType;
    color: string;
}

const timelineData: YearSection[] = [
    {
        id: '2021',
        year: '2021',
        title: 'Beginning',
        subtitle: 'Started with C Programming',
        points: [
            'C Programming Basics',
            'Memory, Pointers, Loops',
            'Solved basic algorithm problems'
        ],
        icon: Code,
        color: 'text-blue-400'
    },
    {
        id: '2022',
        year: '2022',
        title: 'OOP Mindset',
        subtitle: 'Learned C++ & Object-Oriented Concepts',
        points: [
            'Classes & Objects',
            'Inheritance, Abstraction',
            'Basic Data Structures'
        ],
        icon: Layers,
        color: 'text-indigo-400'
    },
    {
        id: '2023',
        year: '2023',
        title: 'DSA & Java Era',
        subtitle: 'Deep Data Structures Training + Java',
        points: [
            'Linked Lists, Trees, Graphs',
            'Sorting, Searching',
            'Basic Java Frameworks'
        ],
        icon: Database,
        color: 'text-orange-400'
    },
    {
        id: '2024',
        year: '2024',
        title: 'Full Stack Development',
        subtitle: 'Became a complete Multi-Stack Developer',
        points: [
            'Python',
            'React & Angular',
            'Node.js + REST APIs',
            'Docker, Git'
        ],
        icon: GraduationCap,
        color: 'text-green-400'
    },
    {
        id: '2025',
        year: '2025',
        title: 'AI + OS Focus',
        subtitle: 'Learning OS & building faster using AI tools',
        points: [
            'Advanced OS Concepts',
            'ChatGPT + GitHub Copilot',
            'AI-assisted Development'
        ],
        icon: Cpu,
        color: 'text-purple-400'
    }
];

export const LearningJourneyV3: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string>('2025');

    const activeSection = timelineData.find(s => s.id === selectedYear) || timelineData[timelineData.length - 1];

    return (
        <div className="flex h-full w-full bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white overflow-hidden font-sans transition-colors duration-300">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-slate-900/50 border-r border-gray-200 dark:border-white/10 flex flex-col backdrop-blur-xl transition-colors duration-300">
                <div className="p-6 border-b border-gray-200 dark:border-white/5">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                        Timeline
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Your Learning Journey</p>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    {timelineData.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedYear(item.id)}
                            className={`w-full px-6 py-3 flex items-center justify-between transition-all duration-200 group ${selectedYear === item.id
                                ? 'bg-blue-50 dark:bg-blue-500/10 border-l-2 border-blue-500 dark:border-blue-400'
                                : 'hover:bg-gray-100 dark:hover:bg-white/5 border-l-2 border-transparent'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-medium ${selectedYear === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-200'
                                    }`}>
                                    {item.year}
                                </span>
                                <span className={`text-xs ${selectedYear === item.id ? 'text-gray-400 dark:text-slate-300' : 'text-gray-400 dark:text-slate-500'
                                    }`}>
                                    {item.title.split('—')[0]}
                                </span>
                            </div>
                            {selectedYear === item.id && (
                                <motion.div layoutId="active-indicator">
                                    <ChevronRight size={14} className="text-blue-600 dark:text-blue-400" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative overflow-hidden bg-gray-50/50 dark:bg-slate-900/30 transition-colors duration-300">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection.id}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 p-12 flex flex-col justify-center max-w-4xl mx-auto"
                    >
                        <div className="mb-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center gap-4 mb-4"
                            >
                                <div className={`p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 ${activeSection.color} shadow-sm dark:shadow-none`}>
                                    <activeSection.icon size={32} />
                                </div>
                                <span className="text-5xl font-bold text-gray-200 dark:text-white/10 select-none transition-colors duration-300">
                                    {activeSection.year}
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300"
                            >
                                {activeSection.title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl text-gray-500 dark:text-slate-400 font-light transition-colors duration-300"
                            >
                                {activeSection.subtitle}
                            </motion.p>
                        </div>

                        <div className="grid gap-4">
                            {activeSection.points.map((point, index) => (
                                <motion.div
                                    key={point}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (index * 0.1) }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/10 transition-colors group cursor-default shadow-sm dark:shadow-none"
                                >
                                    <div className="w-2 h-2 rounded-full bg-blue-500/50 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors" />
                                    <span className="text-gray-600 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                        {point}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
