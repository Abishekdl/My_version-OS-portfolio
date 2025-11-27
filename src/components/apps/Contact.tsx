import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, Github, Linkedin } from 'lucide-react';

export const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        // Create mailto link
        const mailtoSubject = encodeURIComponent(subject || `Contact from ${name}`);
        const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:abishekofficial2003@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        window.location.href = mailtoLink;

        setTimeout(() => {
            setSending(false);
            setSent(true);
            setTimeout(() => {
                setSent(false);
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            }, 3000);
        }, 1000);
    };

    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8 overflow-auto">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <Mail size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Get in Touch</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Have a question or want to work together? Drop me a message!
                    </p>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <a
                        href="mailto:abishekofficial2003@gmail.com"
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
                    >
                        <Mail size={32} className="text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">Email</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">abishekofficial2003@gmail.com</span>
                    </a>
                    <a
                        href="https://github.com/Abishekdl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-gray-800 dark:hover:border-gray-400 transition-all group"
                    >
                        <Github size={32} className="text-gray-800 dark:text-gray-200 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">GitHub</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">@Abishekdl</span>
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-blue-700 dark:hover:border-blue-500 transition-all group"
                    >
                        <Linkedin size={32} className="text-blue-700 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">LinkedIn</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Connect with me</span>
                    </a>
                </div>

                {sent ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 text-center">
                        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            Message Sent Successfully!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Thank you for reaching out. I'll get back to you soon!
                        </p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <User size={16} className="inline mr-2" />
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <Mail size={16} className="inline mr-2" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <MessageSquare size={16} className="inline mr-2" />
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none transition-all"
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            >
                                {sending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
