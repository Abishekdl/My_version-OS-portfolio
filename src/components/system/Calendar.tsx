import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    if (!isOpen) return null;

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="fixed top-14 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl w-80 text-white"
            >
                <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-lg font-semibold">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-medium text-gray-400">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, idx) => (
                        <div
                            key={idx}
                            className={`
                aspect-square flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors
                ${!isSameMonth(day, monthStart) ? 'text-gray-600' : ''}
                ${isSameDay(day, selectedDate) ? 'bg-blue-600 text-white font-bold' : 'hover:bg-white/10'}
                ${isSameDay(day, new Date()) && !isSameDay(day, selectedDate) ? 'border border-blue-500' : ''}
              `}
                            onClick={() => setSelectedDate(day)}
                        >
                            {format(day, 'd')}
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-medium">{format(selectedDate, 'EEEE, MMMM d')}</div>
                    <div className="text-xs text-gray-400 mt-1">No events</div>
                </div>
            </motion.div>
        </>
    );
};
