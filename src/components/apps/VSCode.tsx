import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
    FileCode,
    Folder,
    ChevronRight,
    ChevronDown,
    Search,
    GitBranch,
    Settings,
    X,
    File as FileIcon
} from 'lucide-react';

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    content?: string;
    language?: string;
    children?: FileNode[];
}

const sampleProject: FileNode = {
    name: 'portfolio',
    type: 'folder',
    children: [
        {
            name: 'src',
            type: 'folder',
            children: [
                {
                    name: 'App.tsx',
                    type: 'file',
                    language: 'typescript',
                    content: `import React from 'react';
import { BootScreen } from './components/system/BootScreen';
import { LoginScreen } from './components/system/LoginScreen';
import { Desktop } from './components/desktop/Desktop';
import { useSystemStore } from './store/useSystemStore';

function App() {
  const { bootComplete, loggedIn } = useSystemStore();

  if (!bootComplete) return <BootScreen />;
  if (!loggedIn) return <LoginScreen />;
  
  return <Desktop />;
}

export default App;`
                },
                {
                    name: 'index.css',
                    type: 'file',
                    language: 'css',
                    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}`
                },
                {
                    name: 'components',
                    type: 'folder',
                    children: [
                        {
                            name: 'Desktop.tsx',
                            type: 'file',
                            language: 'typescript',
                            content: `import React from 'react';
import { Taskbar } from './Taskbar';
import { Dock } from './Dock';
import { WindowManager } from './WindowManager';

export const Desktop: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <Taskbar />
      <WindowManager />
      <Dock />
    </div>
  );
};`
                        }
                    ]
                }
            ]
        },
        {
            name: 'package.json',
            type: 'file',
            language: 'json',
            content: `{
  "name": "portfolio_1",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}`
        },
        {
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# AbishekOS Portfolio

A modern, interactive portfolio built as a web-based operating system.

## Features

- 🖥️ Desktop environment with window management
- 📁 File explorer
- 💻 Terminal with Linux commands
- 📧 Mail client
- 🎨 Theme customization
- And much more!

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Framer Motion
- Zustand`
        }
    ]
};

export const VSCode: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['portfolio', 'src']));
    const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');

    const toggleFolder = (path: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(path)) {
            newExpanded.delete(path);
        } else {
            newExpanded.add(path);
        }
        setExpandedFolders(newExpanded);
    };

    const renderFileTree = (node: FileNode, path: string = '', level: number = 0): React.ReactNode[] => {
        const currentPath = path ? `${path}/${node.name}` : node.name;
        const isExpanded = expandedFolders.has(currentPath);

        if (node.type === 'folder') {
            return [
                <div key={currentPath}>
                    <div
                        onClick={() => toggleFolder(currentPath)}
                        className="flex items-center gap-1 px-2 py-1 hover:bg-gray-700 cursor-pointer text-sm"
                        style={{ paddingLeft: `${level * 12 + 8}px` }}
                    >
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <Folder size={14} className="text-blue-400" />
                        <span className="text-gray-200">{node.name}</span>
                    </div>
                    {isExpanded && node.children?.flatMap(child => renderFileTree(child, currentPath, level + 1))}
                </div>
            ];
        } else {
            return [
                <div
                    key={currentPath}
                    onClick={() => setSelectedFile(node)}
                    className={`flex items-center gap-1 px-2 py-1 hover:bg-gray-700 cursor-pointer text-sm ${selectedFile?.name === node.name ? 'bg-gray-700' : ''
                        }`}
                    style={{ paddingLeft: `${level * 12 + 24}px` }}
                >
                    <FileIcon size={14} className="text-gray-400" />
                    <span className="text-gray-200">{node.name}</span>
                </div>
            ];
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e]">
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-1 bg-[#323233] text-gray-300 text-xs">
                <div className="flex items-center gap-4">
                    <span className="font-medium">Visual Studio Code</span>
                    <div className="flex gap-3">
                        <span className="hover:text-white cursor-pointer">File</span>
                        <span className="hover:text-white cursor-pointer">Edit</span>
                        <span className="hover:text-white cursor-pointer">View</span>
                        <span className="hover:text-white cursor-pointer">Go</span>
                        <span className="hover:text-white cursor-pointer">Run</span>
                        <span className="hover:text-white cursor-pointer">Terminal</span>
                        <span className="hover:text-white cursor-pointer">Help</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
                        className="hover:bg-gray-600 p-1 rounded"
                    >
                        <Settings size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Activity Bar */}
                <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-2">
                    <div className="p-2 bg-[#1e1e1e] rounded">
                        <Folder size={20} className="text-gray-300" />
                    </div>
                    <div className="p-2 hover:bg-[#1e1e1e] rounded cursor-pointer">
                        <Search size={20} className="text-gray-400" />
                    </div>
                    <div className="p-2 hover:bg-[#1e1e1e] rounded cursor-pointer">
                        <GitBranch size={20} className="text-gray-400" />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-64 bg-[#252526] flex flex-col">
                    <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide border-b border-gray-700">
                        Explorer
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        {renderFileTree(sampleProject)}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col">
                    {selectedFile ? (
                        <>
                            {/* Tab Bar */}
                            <div className="flex items-center bg-[#252526] border-b border-gray-700">
                                <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-r border-gray-700">
                                    <FileIcon size={14} className="text-gray-400" />
                                    <span className="text-sm text-gray-200">{selectedFile.name}</span>
                                    <button className="hover:bg-gray-600 rounded p-0.5">
                                        <X size={12} className="text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Editor */}
                            <div className="flex-1">
                                <Editor
                                    height="100%"
                                    defaultLanguage={selectedFile.language || 'typescript'}
                                    language={selectedFile.language || 'typescript'}
                                    value={selectedFile.content || '// Select a file to view its contents'}
                                    theme={theme}
                                    options={{
                                        minimap: { enabled: true },
                                        fontSize: 14,
                                        lineNumbers: 'on',
                                        roundedSelection: false,
                                        scrollBeyondLastLine: false,
                                        readOnly: true,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <FileCode size={64} className="mx-auto mb-4 opacity-50" />
                                <p className="text-lg">Select a file to view</p>
                                <p className="text-sm mt-2">Choose a file from the explorer</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between px-4 py-1 bg-[#007acc] text-white text-xs">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <GitBranch size={12} />
                        <span>main</span>
                    </div>
                    <span>⚠ 0 ✓ 0</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>Ln {selectedFile ? '1' : '-'}, Col 1</span>
                    <span>UTF-8</span>
                    <span>{selectedFile?.language?.toUpperCase() || 'Plain Text'}</span>
                </div>
            </div>
        </div>
    );
};
