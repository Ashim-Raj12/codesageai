import React, { useState, useRef, useEffect } from 'react';
import { Share, FileText, Download, Printer, ChevronDown, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface ExportMenuProps {
  onExport: (format: 'pdf' | 'md' | 'json' | 'print') => void;
  onShare: () => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({
  onExport,
  onShare,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportClick = (format: 'pdf' | 'md' | 'json' | 'print') => {
    onExport(format);
    setIsOpen(false);
  };

  const handleShareClick = () => {
    onShare();
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="relative inline-flex gap-2" ref={dropdownRef}>
      {/* Share trigger button */}
      <Button
        onClick={handleShareClick}
        variant="outline"
        size="sm"
        className="gap-1.5"
      >
        {shared ? <Check className="h-4 w-4 text-emerald-500" /> : <Share className="h-4 w-4" />}
        <span>{shared ? 'Link Copied' : 'Share'}</span>
      </Button>

      {/* Export toggle dropdown button */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="gap-1.5 cursor-pointer pr-2.5"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
          <ChevronDown className="h-3 w-3 text-zinc-400" />
        </Button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-35" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-1.5 w-40 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1.5 shadow-md z-40 text-left font-sans">
              <button
                onClick={() => handleExportClick('pdf')}
                className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-red-500" /> Export PDF
              </button>
              <button
                onClick={() => handleExportClick('md')}
                className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-violet-500" /> Export Markdown
              </button>
              <button
                onClick={() => handleExportClick('json')}
                className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-sky-500" /> Export JSON
              </button>
              <div className="border-t border-zinc-100 dark:border-zinc-900/50 my-1" />
              <button
                onClick={() => handleExportClick('print')}
                className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
              >
                <Printer className="h-4 w-4 text-zinc-400" /> Print Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
