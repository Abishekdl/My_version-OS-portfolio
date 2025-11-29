import React from 'react';
import { Terminal, Globe, Folder, FileText, Cpu, Award, Github, Linkedin, Settings, GraduationCap, Mail, Code } from 'lucide-react';
import { useWindowStore } from '../../store/useWindowStore';
import { getAppComponent } from '../apps/AppRegistry';
import { AppIcon } from './AppIcon';

const apps = [
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'text-green-400' },
    { id: 'vscode', title: 'VS Code', icon: Code, color: 'text-blue-500' },
    { id: 'browser', title: 'Browser', icon: Globe, color: 'text-blue-400' },
    { id: 'files', title: 'Projects', icon: Folder, color: 'text-yellow-400' },
    { id: 'notepad', title: 'Resume', icon: FileText, color: 'text-gray-200' },
    { id: 'skills', title: 'Skills', icon: Cpu, color: 'text-purple-400' },
    { id: 'achievements', title: 'Awards', icon: Award, color: 'text-yellow-500' },
    { id: 'contact', title: 'Contact', icon: Mail, color: 'text-red-400' },
    { id: 'github', title: 'GitHub', icon: Github, color: 'text-white' },
    { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { id: 'learning3', title: 'Learning Journey', icon: GraduationCap, color: 'text-cyan-400' },
    { id: 'settings', title: 'Settings', icon: Settings, color: 'text-gray-400' },
];

export const Dock: React.FC = () => {
    const { windows } = useWindowStore();

    // Hide dock if any window is maximized
    const hasMaximizedWindow = windows.some(w => w.isMaximized);

    if (hasMaximizedWindow) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-full px-4 md:w-auto md:px-0">
            <div className="flex items-end gap-2 bg-gray-900/40 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl overflow-x-auto md:overflow-visible no-scrollbar w-full md:w-auto justify-start md:justify-center">
                {apps.map((app) => {
                    const isOpen = windows.some(w => w.id === app.id);
                    return (
                        <AppIcon
                            key={app.id}
                            id={app.id}
                            title={app.title}
                            icon={app.icon}
                            color={app.color}
                            isOpen={isOpen}
                            onClick={() => {
                                const { toggleWindow } = useWindowStore.getState();
                                toggleWindow(app.id, app.title, app.id, getAppComponent(app.id));
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
