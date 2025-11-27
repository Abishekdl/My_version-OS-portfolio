import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Battery, Wifi, Volume2, Search, Power } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';

import { ControlCenter } from '../system/ControlCenter';

interface TaskbarProps {
    onCalendarClick?: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ onCalendarClick }) => {
    const [time, setTime] = useState(new Date());
    const [isControlCenterOpen, setControlCenterOpen] = useState(false);
    const { setPowerMenuOpen, setLauncherOpen } = useSystemStore();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className="h-12 bg-gray-900/80 backdrop-blur-md text-white flex items-center justify-between px-2 md:px-4 fixed top-0 w-full z-50 border-b border-white/5">
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => setLauncherOpen(true)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Search size={18} />
                    </button>
                    <div className="text-sm font-medium hidden md:block">Workspaces</div>
                </div>

                <div
                    className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium hover:bg-white/10 px-3 py-1 rounded-md transition-colors cursor-pointer"
                    onClick={onCalendarClick}
                >
                    {format(time, 'MMM d HH:mm')}
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <div
                        className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors cursor-pointer ${isControlCenterOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        onClick={() => setControlCenterOpen(!isControlCenterOpen)}
                    >
                        <Wifi size={16} className="hidden md:block" />
                        <Volume2 size={16} className="hidden md:block" />
                        <Battery size={16} />
                    </div>
                    <button
                        onClick={() => setPowerMenuOpen(true)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Power size={18} />
                    </button>
                </div>
            </div>

            <ControlCenter
                isOpen={isControlCenterOpen}
                onClose={() => setControlCenterOpen(false)}
            />
        </>
    );
};
