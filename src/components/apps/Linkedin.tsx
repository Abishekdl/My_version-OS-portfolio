import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Linkedin: React.FC = () => {
    return (
        <div className="h-full bg-[#f3f2ef] dark:bg-gray-900 overflow-auto text-gray-900 dark:text-gray-100 font-sans">
            {/* Navbar Mock */}
            <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 flex items-center justify-center px-4">
                <div className="max-w-5xl w-full flex items-center gap-4">
                    <div className="text-[#0a66c2] font-bold text-2xl">in</div>
                    <div className="bg-[#eef3f8] dark:bg-gray-700 px-4 py-1.5 rounded-md text-gray-500 dark:text-gray-400 text-sm flex-1 max-w-xs">Search</div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto py-6 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="md:col-span-3 space-y-4">

                    {/* Profile Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                        {/* Banner */}
                        <div className="h-48 bg-gray-900 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-slate-900 opacity-90"></div>
                            {/* Tech Background Effect */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-right z-10">
                                <h1 className="text-4xl font-bold text-white tracking-widest">ABISHEK</h1>
                                <p className="text-xs text-gray-300 tracking-[0.3em] mt-1">SOFTWARE DEVELOPER</p>
                                <p className="text-[10px] text-gray-500 mt-2 max-w-xs uppercase tracking-wider">Technology is best when it brings people together.</p>
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            {/* Avatar */}
                            <div className="relative -mt-24 mb-4 flex justify-between items-end">
                                <div className="w-40 h-40 rounded-full border-4 border-white bg-gray-200 overflow-hidden relative z-10">
                                    <img src="https://github.com/Abishekdl.png" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div className="mb-4 text-gray-500">
                                    {/* Edit Icon placeholder */}
                                </div>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Abishek D</h1>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">(He/Him)</span>
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1 cursor-pointer hover:bg-blue-200 transition-colors">
                                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                            Add verification badge
                                        </span>
                                    </div>
                                    <p className="text-lg text-gray-900 dark:text-gray-100 mt-1">Final year student @ Vellore Institute of Technology.</p>

                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-1">
                                        <span>Vellore, Tamil Nadu, India</span>
                                        <span>·</span>
                                        <span className="text-blue-600 font-bold cursor-pointer hover:underline">Contact info</span>
                                    </div>

                                    <div className="text-blue-600 font-bold text-sm mt-2 cursor-pointer hover:underline">
                                        57 connections
                                    </div>
                                </div>

                                <div className="hidden md:flex items-center gap-2 max-w-[200px]">
                                    <img src="/vit_logo.jpg" alt="VIT" className="w-10 h-10 object-contain" />
                                    <span className="font-semibold text-gray-700 dark:text-gray-300 hover:underline cursor-pointer text-sm leading-tight">Vellore Institute of Technology</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button className="px-4 py-1.5 bg-[#0a66c2] text-white font-semibold rounded-full hover:bg-[#004182] transition-colors">
                                    Open to
                                </button>
                                <button className="px-4 py-1.5 border border-[#0a66c2] text-[#0a66c2] dark:border-blue-400 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                    Add profile section
                                </button>
                                <button className="px-4 py-1.5 border border-gray-600 dark:border-gray-500 text-gray-600 dark:text-gray-400 font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    Resources
                                </button>
                            </div>

                            {/* Open to work card */}
                            <div className="mt-6 bg-[#eef3f8] dark:bg-gray-700 p-4 rounded-lg flex justify-between items-start relative overflow-hidden">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Show recruiters you're open to work — you control who sees this.</p>
                                    <p className="text-blue-600 font-semibold text-sm cursor-pointer hover:underline mt-0.5">Get started</p>
                                </div>
                                <div className="text-gray-500 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition-colors">
                                    <ExternalLink size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">About</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                            An Innoventix mind fueled by curiosity, creativity, and a passion for crafting impactful digital solutions. I bring hands-on experience in full-stack development, intelligent systems, and cloud-native technologies. With a sharp learning curve and a collaborative mindset, I thrive where innovation meets execution. Currently expanding my skills in system design, machine learning models, operating systems, and real-time applications. Eager to contribute as a Software Developer... <span className="text-gray-500 cursor-pointer hover:underline">see more</span>
                        </p>
                    </div>

                    {/* Education */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Education</h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 flex-shrink-0">
                                    <img src="/vit_logo.jpg" alt="VIT" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">Vellore Institute of Technology</h3>
                                    <p className="text-gray-900 dark:text-gray-200 text-sm">Master of Computer Applications - MCA, Computer Application</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Jul 2024 - Jun 2026</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-700"></div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 flex-shrink-0">
                                    <img src="/vit_logo.jpg" alt="VIT" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">Vellore Institute of Technology</h3>
                                    <p className="text-gray-900 dark:text-gray-200 text-sm">Bsc computer science , Computer Systems Networking and Telecommunications</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">2021 - 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-600 dark:text-gray-400">Profile language</h3>
                            <ExternalLink size={16} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">English</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-600 dark:text-gray-400">Public profile & URL</h3>
                            <ExternalLink size={16} className="text-gray-400" />
                        </div>
                        <a
                            href="https://www.linkedin.com/in/abishek-d-27983b249/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 dark:text-gray-400 text-sm truncate hover:text-[#0a66c2] hover:underline block"
                        >
                            www.linkedin.com/in/abishek-d-27983b249
                        </a>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">People also viewed</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">Student at VIT</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">Vellore Institute of Technology</div>
                                        <button className="mt-1 px-3 py-1 rounded-full border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-900 dark:hover:border-gray-500 transition-colors">
                                            Connect
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
