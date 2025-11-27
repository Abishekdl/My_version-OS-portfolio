import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, Terminal, Cloud } from 'lucide-react';

const skillCategories = [
    {
        title: "Frontend",
        icon: Layout,
        color: "text-blue-500",
        skills: ["React", "Tailwind CSS", "Redux"]
    },
    {
        title: "Backend",
        icon: Server,
        color: "text-green-500",
        skills: ["Node.js", "Express", "Python", "REST APIs"]
    },
    {
        title: "Database",
        icon: Database,
        color: "text-yellow-500",
        skills: ["PostgreSQL", "MongoDB", "CockroachDB", "Redis", "MySQL", "Supabase"]
    },
    {
        title: "DevOps",
        icon: Cloud,
        color: "text-purple-500",
        skills: ["Docker", "Kubernetes", "AWS", "Linux"]
    },
    {
        title: "Tools",
        icon: Terminal,
        color: "text-gray-500",
        skills: ["Git", "VS Code", "Postman", "Vercel"]
    },
    {
        title: "Languages",
        icon: Code,
        color: "text-red-500",
        skills: ["JavaScript", "Python", "C++", "SQL"]
    }
];

export const Skills: React.FC = () => {
    return (
        <div className="h-full bg-gray-50 dark:bg-gray-900 p-6 overflow-auto transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Technical Skills</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 ${category.color}`}>
                                    <category.icon size={24} />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{category.title}</h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
