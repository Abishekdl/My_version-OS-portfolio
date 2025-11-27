import React from 'react';
import { Terminal, Globe, Folder, FileText, Cpu, Award, Github, Linkedin, Settings, GraduationCap } from 'lucide-react';
import { useWindowStore } from '../../store/useWindowStore';
import { getAppComponent } from '../apps/AppRegistry';

const apps = [
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'text-green-400' },
    { id: 'browser', title: 'Browser', icon: Globe, color: 'text-blue-400' },
    { id: 'files', title: 'Projects', icon: Folder, color: 'text-yellow-400' },
    { id: 'notepad', title: 'Resume', icon: FileText, color: 'text-gray-200' },
    { id: 'skills', title: 'Skills', icon: Cpu, color: 'text-purple-400' },
    { id: 'achievements', title: 'Awards', icon: Award, color: 'text-yellow-500' },
    { id: 'github', title: 'GitHub', icon: Github, color: 'text-white' },
    { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { id: 'learning3', title: 'Learning Journey', icon: GraduationCap, color: 'text-cyan-400' },
    { id: 'settings', title: 'Settings', icon: Settings, color: 'text-gray-400' },
];

export const DesktopIcons: React.FC = () => {
    const { openWindow } = useWindowStore();

    const handleOpen = (app: any) => {
        openWindow(app.id, app.title, app.id, getAppComponent(app.id));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4 pt-16 w-fit">
            {apps.map((app) => (
                <div
                    key={app.id}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group w-24"
                    onDoubleClick={() => handleOpen(app)}
                >
                    <div className={`p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm shadow-lg group-hover:scale-105 transition-transform ${app.color}`}>
                        <app.icon size={32} />
                    </div>
                    <span className="text-xs text-white text-center font-medium drop-shadow-md">{app.title}</span>
                </div>
            ))}
        </div>
    );
};
