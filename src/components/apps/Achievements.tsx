import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Medal, Crown, Zap, ExternalLink } from 'lucide-react';
import { useWindowStore } from '../../store/useWindowStore';
import { Browser } from './Browser';

const achievements = [
    {
        id: 1,
        title: "Switchathon Winner",
        organization: "Hackathon 2024",
        date: "2024",
        description: "First place winner in college-level coding competition.",
        icon: Trophy,
        color: "bg-yellow-100 text-yellow-600",
        certificateUrl: "https://drive.google.com/file/d/1ENNRiZEKvM5p8wB1yee0WA-61IkUSxCe/preview" // Changed to preview for embedding
    },
    {
        id: 2,
        title: "AWS Cloud Practitioner",
        organization: "AWS Educate",
        date: "2024",
        description: "Certified in cloud computing fundamentals and AWS services.",
        icon: Medal,
        color: "bg-blue-100 text-blue-600",
        certificateUrl: "https://drive.google.com/file/d/1EKIZRnx-ptcOX-xmOMh815_rEetUjMKO/preview"
    },
    {
        id: 3,
        title: "UI/UX Webinar Certificate",
        organization: "Adobe x Campus Event",
        date: "2023",
        description: "Completed advanced UI/UX design principles workshop.",
        icon: Star,
        color: "bg-pink-100 text-pink-600",
        certificateUrl: "https://drive.google.com/file/d/1EJVx8poygbOzdEwASlh2drcumC6z_eSR/preview"
    },
    {
        id: 4,
        title: "ESP Workshop Attendee",
        organization: "IoT with ESP",
        date: "2023",
        description: "Attended comprehensive hands-on session learning real-time ESP programming and IoT fundamentals.",
        icon: Zap,
        color: "bg-green-100 text-green-600",
        certificateUrl: "https://drive.google.com/file/d/1EQf_Z-x-MHctZuAlr0eAMaYB5LB5Yu5j/preview"
    },
    {
        id: 5,
        title: "Ethical Hacking Workshop Organizer",
        organization: "3-Day Cybersecurity Event",
        date: "2022",
        description: "Organized and led a comprehensive 3-day ethical hacking workshop covering penetration testing and security fundamentals.",
        icon: Crown,
        color: "bg-red-100 text-red-600",
        certificateUrl: "#"
    }
];

export const Achievements: React.FC = () => {
    const { openWindow } = useWindowStore();

    const handleViewCertificate = (item: typeof achievements[0]) => {
        if (item.certificateUrl === '#') return;

        openWindow(
            `certificate-${item.id}`,
            `Certificate: ${item.title}`,
            'browser',
            <Browser initialUrl={item.certificateUrl} />
        );
    };

    return (
        <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-auto transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Achievements & Leadership</h1>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                    <div className="space-y-8">
                        {achievements.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-20"
                            >
                                {/* Timeline Dot */}
                                <div className={`absolute left-0 w-16 h-16 rounded-full ${item.color} flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-sm z-10`}>
                                    <item.icon size={24} />
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                                        <span className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                                            {item.date}
                                        </span>
                                    </div>
                                    <div className="text-blue-600 dark:text-blue-400 font-medium mb-2">{item.organization}</div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>

                                    <button
                                        onClick={() => handleViewCertificate(item)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <ExternalLink size={14} />
                                        View Certificate
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
