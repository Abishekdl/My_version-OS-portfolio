import React, { useState, useEffect, useRef } from 'react';
import { useWindowStore } from '../../store/useWindowStore';

interface CommandHistory {
    command: string;
    output: React.ReactNode;
}

export const Terminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { closeWindow } = useWindowStore();

    useEffect(() => {
        inputRef.current?.focus();
        setHistory([{
            command: '',
            output: (
                <div className="mb-2">
                    <div className="text-green-400">Welcome to AbishekOS v1.0.0</div>
                    <div className="text-gray-400">Type 'help' to see available commands.</div>
                </div>
            )
        }]);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode;

        switch (trimmedCmd) {
            case 'help':
                output = (
                    <div className="space-y-4">
                        <div className="text-cyan-400 font-bold mb-2">Available Commands:</div>
                        <div className="grid grid-cols-1 gap-1 text-gray-300 ml-2">
                            <div><span className="text-yellow-400">help</span> - Show available commands</div>
                            <div><span className="text-yellow-400">whoami</span> - Display user info</div>
                            <div><span className="text-yellow-400">archfetch</span> - System info</div>
                            <div><span className="text-yellow-400">bio</span> - Developer biography</div>
                            <div><span className="text-yellow-400">skills</span> - List technical skills</div>
                            <div><span className="text-yellow-400">projects</span> - Show project portfolio</div>
                            <div><span className="text-yellow-400">social</span> - Display social links</div>

                            <div><span className="text-yellow-400">shortcuts</span> - Show keyboard shortcuts</div>
                            <div><span className="text-yellow-400">clear</span> - Clear terminal</div>
                            <div><span className="text-yellow-400">exit</span> - Close terminal</div>
                        </div>
                    </div>
                );
                break;
            case 'whoami':
                output = <div className="text-blue-400">guest@abishekos</div>;
                break;
            case 'bio':
                output = (
                    <div className="text-gray-300 max-w-md break-words">
                        I am a Full Stack Developer passionate about building interactive web experiences.
                        I love React, TypeScript, and modern web technologies.
                    </div>
                );
                break;
            case 'skills':
                output = (
                    <div className="text-gray-300">
                        <div className="break-words">Frontend: React, TypeScript, Tailwind CSS</div>
                        <div className="break-words">Backend: Node.js, Python, Go</div>
                        <div className="break-words">Tools: Git, Docker, Linux</div>
                    </div>
                );
                break;
            case 'projects':
                output = (
                    <div className="text-gray-300 space-y-2">
                        <div className="text-cyan-400 font-bold">📁 Featured Projects:</div>
                        <div className="ml-2">
                            <div className="text-yellow-400">1. AbishekOS</div>
                            <div className="text-sm ml-2 text-gray-400 break-words">Linux-style portfolio OS built with React & TypeScript</div>
                        </div>
                        <div className="ml-2">
                            <div className="text-yellow-400">2. Fruit Detection System</div>
                            <div className="text-sm ml-2 text-gray-400 break-words">ML-powered fruit classification system</div>
                        </div>
                        <div className="ml-2">
                            <div className="text-yellow-400">3. Employee Manager App</div>
                            <div className="text-sm ml-2 text-gray-400 break-words">Full-stack employee management solution</div>
                        </div>
                        <div className="ml-2">
                            <div className="text-yellow-400">4. Campus Monitoring System</div>
                            <div className="text-sm ml-2 text-gray-400 break-words">Real-time campus security monitoring</div>
                        </div>
                        <div className="text-sm text-gray-500 mt-2 break-words">💡 Open Files app (Ctrl+Shift+F) for more details</div>
                    </div>
                );
                break;
            case 'social':
                output = (
                    <div className="flex flex-col gap-1">
                        <a href="https://github.com/Abishekdl" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-words">GitHub</a>
                        <a href="https://www.linkedin.com/in/abishek-d-27983b249/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-words">LinkedIn</a>
                        <a href="mailto:abishekofficial2003@gmail.com" className="text-blue-400 hover:underline break-words">Email</a>
                    </div>
                );
                break;
            case 'shortcuts':
                output = (
                    <div className="space-y-2">
                        <div className="text-cyan-400 font-bold mb-2">⌨️ Keyboard Shortcuts:</div>
                        <div className="grid grid-cols-1 gap-1 text-gray-300 ml-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between max-w-md">
                                <span>Open App Launcher</span>
                                <span className="text-yellow-400">Super + Space</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between max-w-md">
                                <span>Lock Screen</span>
                                <span className="text-yellow-400">Ctrl + Shift + L</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between max-w-md">
                                <span>Power Menu</span>
                                <span className="text-yellow-400">Alt + Shift + P</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between max-w-md">
                                <span>Show Shortcuts</span>
                                <span className="text-yellow-400">Ctrl + Shift + /</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between max-w-md">
                                <span>Open Terminal</span>
                                <span className="text-yellow-400">Alt + Shift + T</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between max-w-md">
                                <span>Open Browser</span>
                                <span className="text-yellow-400">Alt + Shift + B</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between max-w-md">
                                <span>Open Files</span>
                                <span className="text-yellow-400">Alt + Shift + F</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between max-w-md">
                                <span>Close Active Window</span>
                                <span className="text-yellow-400">Alt + Shift + W</span>
                            </div>
                        </div>
                    </div>
                );
                break;
            case 'archfetch':
                output = (
                    <div className="flex flex-col sm:flex-row gap-4 font-mono text-sm">
                        <div className="text-blue-500 hidden sm:block">
                            {`
      /\\
     /  \\
    /    \\
   /      \\
  /   ,,   \\
 /   |  |   \\
/_-''    ''-_\\
              `}
                        </div>
                        <div className="flex flex-col justify-center">
                            <div><span className="text-blue-400">OS:</span> AbishekOS Linux x86_64</div>
                            <div><span className="text-blue-400">Host:</span> Web Browser</div>
                            <div><span className="text-blue-400">Kernel:</span> 1.0.0</div>
                            <div><span className="text-blue-400">Uptime:</span> Just now</div>
                            <div><span className="text-blue-400">Packages:</span> 9 (npm)</div>
                            <div><span className="text-blue-400">Shell:</span> zsh</div>
                            <div><span className="text-blue-400">Resolution:</span> 1920x1080</div>
                            <div><span className="text-blue-400">DE:</span> React Desktop</div>
                            <div><span className="text-blue-400">WM:</span> Framer Motion</div>
                        </div>
                    </div>
                );
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'exit':
                closeWindow('terminal');
                return;
            case '':
                return;
            default:
                output = <div className="text-red-400 break-words">Command not found: {cmd}</div>;
        }

        setHistory(prev => [...prev, { command: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div
            className="h-full w-full bg-black/90 text-green-500 font-mono overflow-auto text-sm"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="p-2 md:p-4">
                {history.map((item, i) => (
                    <div key={i} className="mb-2">
                        {item.command && (
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-blue-400">➜</span>
                                    <span className="text-cyan-400">~</span>
                                </div>
                                <span className="text-gray-400 break-all">{item.command}</span>
                            </div>
                        )}
                        <div className="ml-0 md:ml-4 mt-1 md:mt-0">{item.output}</div>
                    </div>
                ))}

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-blue-400">➜</span>
                        <span className="text-cyan-400">~</span>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none flex-1 text-gray-200 min-w-0"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
