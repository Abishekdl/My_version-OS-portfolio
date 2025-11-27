import React, { useState, useEffect } from 'react';
import { Folder, Home, Code, File, Loader, Plus, FileText, Trash2, Edit2, X, Save, ArrowLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    color: string;
    html_url: string;
}

interface FileItem {
    id: string;
    parentId: string | null;
    name: string;
    type: 'folder' | 'file';
    content?: string; // For text files
    date: string;
}

const PROJECT_DESCRIPTIONS: Record<string, string> = {
    "portfolio_1": "A personal portfolio operating system built with React, TypeScript, and Tailwind CSS, featuring a desktop environment, window management, and various apps.",
    "Abishekdl": "My personal GitHub profile repository.",
    "learning-react": "A collection of small projects and experiments to learn React concepts.",
    // Add more mappings as needed based on actual repo names
};

export const Files: React.FC = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // File System State
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
    const [files, setFiles] = useState<FileItem[]>([
        { id: '1', parentId: null, name: 'Project Ideas', type: 'folder', date: '2024-11-20' },
        { id: '2', parentId: null, name: 'Notes', type: 'folder', date: '2024-11-22' },
        { id: '3', parentId: null, name: 'Budget.txt', type: 'file', content: 'Groceries: $50\nRent: $1000', date: '2024-11-25' },
        { id: '4', parentId: '1', name: 'App Idea.txt', type: 'file', content: 'A cool new app idea...', date: '2024-11-26' },
    ]);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [openFile, setOpenFile] = useState<FileItem | null>(null);
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/Abishekdl/repos?sort=updated&per_page=12');
                if (!response.ok) throw new Error('Failed to fetch projects');

                const data = await response.json();

                const mappedProjects = data.map((repo: any, index: number) => {
                    const colors = [
                        "bg-orange-100 text-orange-600",
                        "bg-blue-100 text-blue-600",
                        "bg-green-100 text-green-600",
                        "bg-purple-100 text-purple-600",
                        "bg-pink-100 text-pink-600",
                        "bg-indigo-100 text-indigo-600"
                    ];

                    return {
                        id: repo.id,
                        title: repo.name,
                        description: PROJECT_DESCRIPTIONS[repo.name] || repo.description || "A cool project built with passion and code.",
                        tech: [repo.language || "Code"],
                        color: colors[index % colors.length],
                        html_url: repo.html_url
                    };
                });

                setProjects(mappedProjects);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // File System Actions
    const createFolder = () => {
        const newFolder: FileItem = {
            id: Date.now().toString(),
            parentId: currentFolderId,
            name: 'New Folder',
            type: 'folder',
            date: new Date().toISOString().split('T')[0]
        };
        setFiles([...files, newFolder]);
        setEditingId(newFolder.id);
        setEditName('New Folder');
    };

    const createFile = () => {
        const newFile: FileItem = {
            id: Date.now().toString(),
            parentId: currentFolderId,
            name: 'New Text Document.txt',
            type: 'file',
            content: '',
            date: new Date().toISOString().split('T')[0]
        };
        setFiles([...files, newFile]);
        setEditingId(newFile.id);
        setEditName('New Text Document.txt');
    };

    const deleteItem = (id: string) => {
        // Recursively delete children if it's a folder
        const deleteRecursive = (itemId: string, currentFiles: FileItem[]): FileItem[] => {
            const children = currentFiles.filter(f => f.parentId === itemId);
            let remaining = currentFiles.filter(f => f.id !== itemId);

            children.forEach(child => {
                remaining = deleteRecursive(child.id, remaining);
            });

            return remaining;
        };

        setFiles(deleteRecursive(id, files));
    };

    const startRenaming = (file: FileItem) => {
        setEditingId(file.id);
        setEditName(file.name);
    };

    const saveRename = () => {
        if (editingId) {
            setFiles(files.map(f => f.id === editingId ? { ...f, name: editName } : f));
            setEditingId(null);
        }
    };

    const handleFileClick = (file: FileItem) => {
        if (file.type === 'folder') {
            setCurrentFolderId(file.id);
        } else {
            setOpenFile(file);
            setFileContent(file.content || '');
        }
    };

    const saveFileContent = () => {
        if (openFile) {
            setFiles(files.map(f => f.id === openFile.id ? { ...f, content: fileContent } : f));
            setOpenFile(null);
        }
    };

    const navigateUp = () => {
        if (currentFolderId) {
            const currentFolder = files.find(f => f.id === currentFolderId);
            setCurrentFolderId(currentFolder?.parentId || null);
        }
    };

    const getCurrentPath = () => {
        const path = [];
        let current = files.find(f => f.id === currentFolderId);
        while (current) {
            path.unshift(current);
            current = files.find(f => f.id === current?.parentId);
        }
        return path;
    };

    const currentFiles = files.filter(f => f.parentId === currentFolderId);

    return (
        <div className="flex h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2">
                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Favorites</div>
                <button
                    onClick={() => { setActiveTab('home'); setCurrentFolderId(null); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${activeTab === 'home' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                    <Home size={16} /> Home
                </button>
                <button
                    onClick={() => { setActiveTab('projects'); setCurrentFolderId(null); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${activeTab === 'projects' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                    <Code size={16} /> Projects
                </button>
                <button
                    onClick={() => { setActiveTab('documents'); setCurrentFolderId(null); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${activeTab === 'documents' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                    <File size={16} /> Documents
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Home size={14} />
                        <span>/</span>
                        <span className="capitalize cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => { setCurrentFolderId(null); }}>{activeTab}</span>

                        {activeTab === 'documents' && getCurrentPath().map(folder => (
                            <React.Fragment key={folder.id}>
                                <ChevronRight size={14} />
                                <span
                                    className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                                    onClick={() => setCurrentFolderId(folder.id)}
                                >
                                    {folder.name}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>

                    {activeTab === 'documents' && (
                        <div className="flex gap-2">
                            {currentFolderId && (
                                <button onClick={navigateUp} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors mr-2">
                                    <ArrowLeft size={14} /> Back
                                </button>
                            )}
                            <button onClick={createFolder} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
                                <Plus size={14} /> New Folder
                            </button>
                            <button onClick={createFile} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
                                <FileText size={14} /> New File
                            </button>
                        </div>
                    )}
                </div>

                {activeTab === 'projects' ? (
                    loading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader className="animate-spin text-blue-500" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <motion.a
                                    key={project.id}
                                    href={project.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
                                >
                                    <div className={`w-12 h-12 rounded-lg ${project.color} flex items-center justify-center mb-4`}>
                                        <Folder size={24} />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2 truncate text-gray-900 dark:text-gray-100" title={project.title}>{project.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 h-10">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    )
                ) : activeTab === 'documents' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {currentFiles.length > 0 ? (
                            currentFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="group relative p-4 rounded-xl hover:bg-blue-50 cursor-pointer flex flex-col items-center gap-2 transition-colors border border-transparent hover:border-blue-100"
                                    onDoubleClick={() => handleFileClick(file)}
                                >
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 z-10">
                                        <button onClick={(e) => { e.stopPropagation(); startRenaming(file); }} className="p-1 hover:bg-white rounded shadow-sm text-gray-600">
                                            <Edit2 size={12} />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); deleteItem(file.id); }} className="p-1 hover:bg-white rounded shadow-sm text-red-500">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>

                                    <div className={`w-16 h-16 flex items-center justify-center rounded-2xl ${file.type === 'folder' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                                        {file.type === 'folder' ? <Folder size={32} fill="currentColor" /> : <FileText size={32} />}
                                    </div>

                                    {editingId === file.id ? (
                                        <input
                                            autoFocus
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            onBlur={saveRename}
                                            onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-full text-center text-sm px-1 py-0.5 border border-blue-400 rounded outline-none"
                                        />
                                    ) : (
                                        <span className="text-sm text-center font-medium text-gray-700 truncate w-full px-1">{file.name}</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
                                <Folder size={48} className="mb-2 opacity-20" />
                                <p className="text-sm">This folder is empty</p>
                            </div>
                        )}
                    </div>
                ) : activeTab === 'home' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div
                            className="group relative p-4 rounded-xl hover:bg-blue-50 cursor-pointer flex flex-col items-center gap-2 transition-colors border border-transparent hover:border-blue-100"
                            onDoubleClick={() => setActiveTab('projects')}
                        >
                            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                <Code size={32} />
                            </div>
                            <span className="text-sm text-center font-medium text-gray-700 truncate w-full px-1">Projects</span>
                        </div>

                        <div
                            className="group relative p-4 rounded-xl hover:bg-blue-50 cursor-pointer flex flex-col items-center gap-2 transition-colors border border-transparent hover:border-blue-100"
                            onDoubleClick={() => setActiveTab('documents')}
                        >
                            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-green-100 text-green-600">
                                <File size={32} />
                            </div>
                            <span className="text-sm text-center font-medium text-gray-700 truncate w-full px-1">Documents</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <Folder size={64} className="mb-4 opacity-20" />
                        <p>This folder is empty</p>
                    </div>
                )}
            </div>

            {/* Simple Notepad Modal */}
            <AnimatePresence>
                {openFile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-50 bg-white flex flex-col"
                    >
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-blue-600" />
                                <span className="font-medium text-sm">{openFile.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={saveFileContent}
                                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 flex items-center gap-1"
                                >
                                    <Save size={12} /> Save
                                </button>
                                <button
                                    onClick={() => setOpenFile(null)}
                                    className="p-1.5 hover:bg-gray-200 rounded text-gray-500"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={fileContent}
                            onChange={(e) => setFileContent(e.target.value)}
                            className="flex-1 p-4 outline-none resize-none font-mono text-sm"
                            placeholder="Type something..."
                            autoFocus
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
