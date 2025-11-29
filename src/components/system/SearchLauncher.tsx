import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Globe, Folder, FileText, Cpu, Award, Github, Linkedin, Settings, GraduationCap } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';
import { useWindowStore } from '../../store/useWindowStore';
import { getAppComponent } from '../apps/AppRegistry';
import { motion } from 'framer-motion';

const apps = [
    { id: 'terminal', title: 'Terminal', icon: Terminal, description: 'Command Line Interface' },
    { id: 'browser', title: 'Browser', icon: Globe, description: 'Internet Browser' },
    { id: 'files', title: 'Projects', icon: Folder, description: 'My Portfolio Projects' },
    { id: 'notepad', title: 'Resume', icon: FileText, description: 'View my Resume' },
    { id: 'skills', title: 'Skills', icon: Cpu, description: 'Technical Skills' },
    { id: 'achievements', title: 'Awards', icon: Award, description: 'Honors & Awards' },
    { id: 'github', title: 'GitHub', icon: Github, description: 'Code Repositories' },
    { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, description: 'Professional Profile' },
    { id: 'learning3', title: 'Learning Journey', icon: GraduationCap, description: 'My Learning Timeline' },
    { id: 'settings', title: 'Settings', icon: Settings, description: 'System Preferences' },
];

export const SearchLauncher: React.FC = () => {
    const { isLauncherOpen, setLauncherOpen } = useSystemStore();
    const { toggleWindow } = useWindowStore();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredApps = apps.filter(app =>
        app.title.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isLauncherOpen) {
            inputRef.current?.focus();
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isLauncherOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => Math.min(prev + 1, filteredApps.length - 1));
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
            if (filteredApps[selectedIndex]) {
                const app = filteredApps[selectedIndex];
                toggleWindow(app.id, app.title, app.id, getAppComponent(app.id));
                setLauncherOpen(false);
            }
        } else if (e.key === 'Escape') {
            setLauncherOpen(false);
        }
    };

    if (!isLauncherOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={() => setLauncherOpen(false)}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-[600px] bg-gray-900/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center gap-4 p-4 border-b border-white/10">
                    <Search className="text-gray-400" size={24} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search apps..."
                        className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-gray-500"
                        autoFocus
                    />
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    {filteredApps.map((app, index) => (
                        <div
                            key={app.id}
                            className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${index === selectedIndex ? 'bg-blue-600/20' : 'hover:bg-white/5'
                                }`}
                            onClick={() => {
                                toggleWindow(app.id, app.title, app.id, getAppComponent(app.id));
                                setLauncherOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <div className="p-2 bg-gray-800 rounded-lg">
                                <app.icon size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="text-white font-medium">{app.title}</div>
                                <div className="text-gray-400 text-sm">{app.description}</div>
                            </div>
                        </div>
                    ))}
                    {filteredApps.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No results found
                        </div>
                    )}
                </div>

                <div className="px-4 py-2 bg-black/20 text-xs text-gray-500 flex justify-between">
                    <div className="flex gap-2">
                        <span>↑↓ Navigate</span>
                        <span>↵ Open</span>
                    </div>
                    <span>esc Close</span>
                </div>
            </motion.div>
        </div>
    );
};
