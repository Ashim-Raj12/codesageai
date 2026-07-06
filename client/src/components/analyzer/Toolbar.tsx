import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  Upload,
  Clipboard,
  AlignLeft,
  FileCode,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ToolbarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  editorTheme: string;
  onThemeChange: (theme: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  wordWrap: boolean;
  onWordWrapChange: (wrap: boolean) => void;
  onUpload: () => void;
  onPaste: () => void;
  onClear: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  language,
  onLanguageChange,
  editorTheme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  wordWrap,
  onWordWrapChange,
  onUpload,
  onPaste,
  onClear,
  onCopy,
  onDownload,
  onAnalyze,
  isAnalyzing,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languages = [
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'php', label: 'PHP' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'markdown', label: 'Markdown' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-xl shadow-xs">
      
      {/* Configuration Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Language selector */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1 text-xs">
          <FileCode className="h-4 w-4 text-zinc-400" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-transparent border-none outline-none text-zinc-700 dark:text-zinc-300 font-medium cursor-pointer"
            title="Language selector"
          >
            {languages.map((l) => (
              <option key={l.value} value={l.value} className="bg-white dark:bg-zinc-950">
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Theme select */}
        <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs">
          <select
            value={editorTheme}
            onChange={(e) => onThemeChange(e.target.value)}
            className="bg-transparent border-none outline-none text-zinc-700 dark:text-zinc-300 font-semibold cursor-pointer"
            title="Theme selector"
          >
            <option value="vs-dark" className="bg-white dark:bg-zinc-950">vs-dark</option>
            <option value="light" className="bg-white dark:bg-zinc-950">vs-light</option>
          </select>
        </div>

        {/* Font size */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1 text-xs">
          <span className="text-zinc-400 font-semibold">Size</span>
          <select
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="bg-transparent border-none outline-none text-zinc-700 dark:text-zinc-300 font-mono font-semibold cursor-pointer"
            title="Font size"
          >
            {[12, 13, 14, 15, 16, 18, 20].map((sz) => (
              <option key={sz} value={sz} className="bg-white dark:bg-zinc-950">
                {sz}px
              </option>
            ))}
          </select>
        </div>

        {/* Word wrap */}
        <button
          onClick={() => onWordWrapChange(!wordWrap)}
          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
            wordWrap
              ? 'bg-violet-50 border-violet-100 text-violet-600 dark:bg-violet-950/20 dark:border-violet-900/30 dark:text-violet-400'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
          title="Toggle Word Wrap"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={onUpload}
          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title="Upload File"
        >
          <Upload className="h-4 w-4" />
        </button>
        <button
          onClick={onPaste}
          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title="Paste Code"
        >
          <Clipboard className="h-4 w-4" />
        </button>
        <button
          onClick={onClear}
          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title="Clear Sandbox"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title="Copy Code"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
        <button
          onClick={onDownload}
          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title="Download Script"
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

        <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-1.5" />

        <Button
          onClick={onAnalyze}
          isLoading={isAnalyzing}
          variant="primary"
          size="sm"
          className="gap-1.5 shadow-sm"
        >
          <Play className="h-3.5 w-3.5 fill-current" /> Analyze Code
        </Button>
      </div>

    </div>
  );
};
