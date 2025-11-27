import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search, Plus, X, Globe } from 'lucide-react';

interface BrowserProps {
    initialUrl?: string;
}

interface Tab {
    id: string;
    title: string;
    url: string;
    history: string[];
    historyIndex: number;
    isLoading: boolean;
}

const MAX_TABS = 5;

export const Browser: React.FC<BrowserProps> = ({ initialUrl }) => {
    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: '1',
            title: 'New Tab',
            url: initialUrl || 'https://www.google.com/webhp?igu=1',
            history: [initialUrl || 'https://www.google.com/webhp?igu=1'],
            historyIndex: 0,
            isLoading: false,
        },
    ]);
    const [activeTabId, setActiveTabId] = useState('1');
    const [urlInput, setUrlInput] = useState(initialUrl || 'https://www.google.com/webhp?igu=1');

    const activeTab = tabs.find(t => t.id === activeTabId);

    const createNewTab = () => {
        if (tabs.length >= MAX_TABS) {
            return; // Max tabs reached
        }
        const newTabId = Date.now().toString();
        const newTab: Tab = {
            id: newTabId,
            title: 'New Tab',
            url: 'https://www.google.com/webhp?igu=1',
            history: ['https://www.google.com/webhp?igu=1'],
            historyIndex: 0,
            isLoading: false,
        };
        setTabs([...tabs, newTab]);
        setActiveTabId(newTabId);
        setUrlInput('https://www.google.com/webhp?igu=1');
    };

    const closeTab = (tabId: string) => {
        if (tabs.length === 1) return; // Don't close last tab

        const newTabs = tabs.filter(t => t.id !== tabId);
        setTabs(newTabs);

        if (activeTabId === tabId) {
            setActiveTabId(newTabs[0].id);
            setUrlInput(newTabs[0].url);
        }
    };

    const switchTab = (tabId: string) => {
        setActiveTabId(tabId);
        const tab = tabs.find(t => t.id === tabId);
        if (tab) {
            setUrlInput(tab.url);
        }
    };

    const navigateTo = (url: string) => {
        if (!activeTab) return;

        // Process URL - if it looks like a search query, convert to Google search
        let finalUrl = url;

        // Check if URL doesn't have protocol
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            // Check if it's a search query (has spaces or no dots)
            if (url.includes(' ') || !url.includes('.')) {
                // Convert to Google search
                finalUrl = `https://www.google.com/search?igu=1&q=${encodeURIComponent(url)}`;
            } else {
                // Add https:// to domain
                finalUrl = `https://${url}`;
            }
        }

        setTabs(tabs.map(tab => {
            if (tab.id === activeTabId) {
                const newHistory = tab.history.slice(0, tab.historyIndex + 1);
                newHistory.push(finalUrl);
                return {
                    ...tab,
                    url: finalUrl,
                    history: newHistory,
                    historyIndex: newHistory.length - 1,
                    isLoading: true,
                };
            }
            return tab;
        }));

        setUrlInput(finalUrl);

        // Simulate loading
        setTimeout(() => {
            setTabs(tabs => tabs.map(tab =>
                tab.id === activeTabId ? { ...tab, isLoading: false } : tab
            ));
        }, 1000);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigateTo(urlInput);
    };

    const goBack = () => {
        if (!activeTab || activeTab.historyIndex === 0) return;

        const newIndex = activeTab.historyIndex - 1;
        const prevUrl = activeTab.history[newIndex];

        setTabs(tabs.map(tab =>
            tab.id === activeTabId
                ? { ...tab, url: prevUrl, historyIndex: newIndex }
                : tab
        ));
        setUrlInput(prevUrl);
    };

    const goForward = () => {
        if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;

        const newIndex = activeTab.historyIndex + 1;
        const nextUrl = activeTab.history[newIndex];

        setTabs(tabs.map(tab =>
            tab.id === activeTabId
                ? { ...tab, url: nextUrl, historyIndex: newIndex }
                : tab
        ));
        setUrlInput(nextUrl);
    };

    const refresh = () => {
        if (!activeTab) return;

        setTabs(tabs.map(tab =>
            tab.id === activeTabId ? { ...tab, isLoading: true } : tab
        ));

        setTimeout(() => {
            setTabs(tabs => tabs.map(tab =>
                tab.id === activeTabId ? { ...tab, isLoading: false } : tab
            ));
        }, 1000);
    };

    if (!activeTab) return null;

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900">
            {/* Tab Bar */}
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => switchTab(tab.id)}
                        className={`group flex items-center gap-2 px-3 py-2 rounded-t-lg cursor-pointer transition-colors min-w-[120px] max-w-[200px] ${tab.id === activeTabId
                                ? 'bg-white dark:bg-gray-900 border-t border-x border-gray-200 dark:border-gray-700'
                                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        <Globe size={14} className="text-gray-500 flex-shrink-0" />
                        <span className="text-sm truncate flex-1 dark:text-gray-200">
                            {tab.title}
                        </span>
                        {tabs.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeTab(tab.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-opacity"
                            >
                                <X size={12} className="dark:text-gray-300" />
                            </button>
                        )}
                    </div>
                ))}
                {tabs.length < MAX_TABS && (
                    <button
                        onClick={createNewTab}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        title="New Tab"
                    >
                        <Plus size={16} className="text-gray-600 dark:text-gray-400" />
                    </button>
                )}
            </div>

            {/* Browser Toolbar */}
            <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex gap-1">
                    <button
                        onClick={goBack}
                        disabled={activeTab.historyIndex === 0}
                        className={`p-1.5 rounded ${activeTab.historyIndex === 0
                                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <button
                        onClick={goForward}
                        disabled={activeTab.historyIndex >= activeTab.history.length - 1}
                        className={`p-1.5 rounded ${activeTab.historyIndex >= activeTab.history.length - 1
                                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                    >
                        <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={refresh}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
                    >
                        <RotateCw size={16} className={activeTab.isLoading ? "animate-spin" : ""} />
                    </button>
                </div>

                <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5">
                    <Search size={14} className="text-gray-400" />
                    <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="flex-1 outline-none bg-transparent text-gray-700 dark:text-gray-200 text-sm"
                        placeholder="Search Google or type a URL"
                    />
                </form>
            </div>

            {/* Browser Content */}
            <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900 relative">
                {activeTab.isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-10">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <iframe
                    key={activeTab.id} // Force re-render when tab changes
                    src={activeTab.url}
                    className="w-full h-full border-none"
                    title="Browser Content"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
                />
            </div>
        </div>
    );
};
