import React, { useState } from 'react';
import { Mail as MailIcon, Inbox, Send, File, Trash2, Star, Pencil, X, Paperclip } from 'lucide-react';

interface Email {
    id: number;
    from: string;
    subject: string;
    preview: string;
    body: string;
    timestamp: string;
    isRead: boolean;
    isStarred: boolean;
}

const sampleEmails: Email[] = [
    {
        id: 1,
        from: 'Abishek',
        subject: 'Welcome to My Portfolio!',
        preview: 'Thanks for visiting my portfolio. Feel free to explore my projects...',
        body: `Hi there!\n\nThanks for visiting my portfolio! I'm excited to share my work with you.\n\nFeel free to explore my projects, skills, and achievements. If you'd like to collaborate or have any questions, don't hesitate to reach out using the compose feature.\n\nBest regards,\nAbishek`,
        timestamp: '10:30 AM',
        isRead: false,
        isStarred: true
    },
    {
        id: 2,
        from: 'GitHub',
        subject: 'Your latest contributions',
        preview: 'You have 15 new stars on your repositories this week...',
        body: `Hello!\n\nGreat work on your recent contributions! Your repositories have gained significant attention.\n\nKeep up the excellent work!\n\nGitHub Team`,
        timestamp: 'Yesterday',
        isRead: true,
        isStarred: false
    },
    {
        id: 3,
        from: 'LinkedIn',
        subject: 'New connection request',
        preview: 'You have 3 new connection requests waiting for your approval...',
        body: `Hi,\n\nYour profile has been viewed by several recruiters this week. You have new connection requests from professionals in your field.\n\nBest,\nLinkedIn`,
        timestamp: '2 days ago',
        isRead: true,
        isStarred: false
    }
];

export const Mail: React.FC = () => {
    const [selectedFolder, setSelectedFolder] = useState('inbox');
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [showCompose, setShowCompose] = useState(false);
    const [emails, setEmails] = useState<Email[]>(sampleEmails);

    // Compose form state
    const [composeTo, setComposeTo] = useState('');
    const [composeSubject, setComposeSubject] = useState('');
    const [composeBody, setComposeBody] = useState('');
    const [sending, setSending] = useState(false);

    const folders = [
        { id: 'inbox', label: 'Inbox', icon: Inbox, count: emails.filter(e => !e.isRead).length },
        { id: 'sent', label: 'Sent', icon: Send, count: 0 },
        { id: 'drafts', label: 'Drafts', icon: File, count: 0 },
        { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
    ];

    const handleEmailClick = (email: Email) => {
        setSelectedEmail(email);
        setEmails(emails.map(e => e.id === email.id ? { ...e, isRead: true } : e));
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        // Create mailto link
        const mailtoLink = `mailto:abishekofficial2003@gmail.com?subject=${encodeURIComponent(composeSubject)}&body=${encodeURIComponent(`From: ${composeTo}\n\n${composeBody}`)}`;
        window.location.href = mailtoLink;

        setTimeout(() => {
            setSending(false);
            setShowCompose(false);
            setComposeTo('');
            setComposeSubject('');
            setComposeBody('');
        }, 1000);
    };

    const toggleStar = (emailId: number) => {
        setEmails(emails.map(e => e.id === emailId ? { ...e, isStarred: !e.isStarred } : e));
    };

    return (
        <div className="h-full flex bg-white dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4">
                    <button
                        onClick={() => setShowCompose(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <Pencil size={18} />
                        Compose
                    </button>
                </div>

                <nav className="flex-1 px-2">
                    {folders.map(folder => {
                        const Icon = folder.icon;
                        return (
                            <button
                                key={folder.id}
                                onClick={() => setSelectedFolder(folder.id)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors ${selectedFolder === folder.id
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} />
                                    <span>{folder.label}</span>
                                </div>
                                {folder.count > 0 && (
                                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                        {folder.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Email List */}
            <div className="w-96 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold dark:text-white">Inbox</h2>
                </div>
                <div className="flex-1 overflow-auto">
                    {emails.map(email => (
                        <div
                            key={email.id}
                            onClick={() => handleEmailClick(email)}
                            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors ${selectedEmail?.id === email.id
                                ? 'bg-blue-50 dark:bg-blue-900/20'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                } ${!email.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-1">
                                <span className={`font-medium dark:text-white ${!email.isRead ? 'font-bold' : ''}`}>
                                    {email.from}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{email.timestamp}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleStar(email.id);
                                        }}
                                        className="hover:scale-110 transition-transform"
                                    >
                                        <Star
                                            size={16}
                                            className={email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className={`text-sm mb-1 dark:text-gray-200 ${!email.isRead ? 'font-semibold' : ''}`}>
                                {email.subject}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {email.preview}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Email Content / Compose */}
            <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
                {selectedEmail && !showCompose ? (
                    <>
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <h1 className="text-2xl font-bold mb-2 dark:text-white">{selectedEmail.subject}</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium dark:text-gray-300">{selectedEmail.from}</span>
                                <span>•</span>
                                <span>{selectedEmail.timestamp}</span>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-auto">
                            <div className="prose dark:prose-invert max-w-none">
                                {selectedEmail.body.split('\n').map((line, i) => (
                                    <p key={i} className="mb-2 dark:text-gray-300">{line}</p>
                                ))}
                            </div>
                        </div>
                    </>
                ) : showCompose ? (
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <h2 className="text-lg font-semibold dark:text-white">New Message</h2>
                            <button
                                onClick={() => setShowCompose(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <X size={20} className="dark:text-gray-300" />
                            </button>
                        </div>
                        <form onSubmit={handleSend} className="flex-1 flex flex-col p-6 bg-white dark:bg-gray-800">
                            <div className="space-y-4 mb-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <label className="text-sm text-gray-600 dark:text-gray-400 w-16">To:</label>
                                    <input
                                        type="email"
                                        value={composeTo}
                                        onChange={(e) => setComposeTo(e.target.value)}
                                        className="flex-1 outline-none bg-transparent dark:text-white"
                                        placeholder="recipient@example.com"
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <label className="text-sm text-gray-600 dark:text-gray-400 w-16">Subject:</label>
                                    <input
                                        type="text"
                                        value={composeSubject}
                                        onChange={(e) => setComposeSubject(e.target.value)}
                                        className="flex-1 outline-none bg-transparent dark:text-white"
                                        placeholder="Email subject"
                                        required
                                    />
                                </div>
                            </div>
                            <textarea
                                value={composeBody}
                                onChange={(e) => setComposeBody(e.target.value)}
                                className="flex-1 p-3 outline-none resize-none bg-gray-50 dark:bg-gray-900 dark:text-white rounded-lg"
                                placeholder="Type your message here..."
                                required
                            />
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <Paperclip size={18} />
                                    Attach
                                </button>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                                >
                                    <Send size={18} />
                                    {sending ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-600">
                        <div className="text-center">
                            <MailIcon size={64} className="mx-auto mb-4 opacity-50" />
                            <p>Select an email to read</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
