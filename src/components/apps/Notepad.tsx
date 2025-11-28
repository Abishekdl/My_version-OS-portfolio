import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomIn, ZoomOut, Maximize2, Download, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const Notepad: React.FC = () => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                // Check if mobile (width < 768px)
                if (containerWidth < 768) {
                    // Calculate scale to fit width (assuming A4 width ~600px at scale 1)
                    // Subtract padding (p-4 = 16px * 2 = 32px on mobile)
                    const availableWidth = containerWidth - 32;
                    const newScale = Math.min(1, availableWidth / 600);
                    setScale(newScale);
                } else {
                    // Optional: Reset to 1.0 on desktop if needed, or keep current
                    // For now, we only enforce fit-width on mobile
                }
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setLoading(false);
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
    const handleFitWidth = () => setScale(1.0);

    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => {
            const newPage = prevPageNumber + offset;
            return Math.max(1, Math.min(newPage, numPages || 1));
        });
    };

    return (
        <div className="h-full w-full flex flex-col bg-gray-900 text-white">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 shadow-md z-10">
                <div className="flex items-center gap-2">
                    <button onClick={handleZoomOut} className="p-1.5 hover:bg-gray-700 rounded transition-colors" title="Zoom Out">
                        <ZoomOut size={18} />
                    </button>
                    <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={handleZoomIn} className="p-1.5 hover:bg-gray-700 rounded transition-colors" title="Zoom In">
                        <ZoomIn size={18} />
                    </button>
                    <div className="w-px h-5 bg-gray-700 mx-2" />
                    <button onClick={handleFitWidth} className="p-1.5 hover:bg-gray-700 rounded transition-colors" title="Reset Zoom">
                        <Maximize2 size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    {numPages && numPages > 1 && (
                        <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-2 py-1">
                            <button
                                onClick={() => changePage(-1)}
                                disabled={pageNumber <= 1}
                                className="p-1 hover:bg-gray-600 rounded disabled:opacity-50"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-sm">
                                {pageNumber} / {numPages}
                            </span>
                            <button
                                onClick={() => changePage(1)}
                                disabled={pageNumber >= numPages}
                                className="p-1 hover:bg-gray-600 rounded disabled:opacity-50"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                    <span className="text-sm font-medium text-gray-300 hidden sm:block">Resume.pdf</span>
                </div>

                <div>
                    <a
                        href="/Abishek_resume.pdf"
                        download
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Download</span>
                    </a>
                </div>
            </div>

            {/* PDF Viewer */}
            <div ref={containerRef} className="flex-1 overflow-auto flex justify-center p-4 md:p-8 bg-gray-900/50 backdrop-blur-sm relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                    </div>
                )}

                <Document
                    file="/Abishek_resume.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={null}
                    className="shadow-2xl"
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-2xl"
                        loading={null}
                    />
                </Document>
            </div>
        </div>
    );
};
