import React, { useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface UploadZoneProps {
  onFileLoaded: (content: string, name: string, language: string) => void;
  onClose: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileLoaded,
  onClose,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getLanguageFromExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const mappings: Record<string, string> = {
      py: 'python',
      js: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      go: 'go',
      rs: 'rust',
      php: 'php',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
    };
    return mappings[ext || ''] || 'plaintext';
  };

  const handleFileProcess = (file: File) => {
    setError('');
    
    // File size constraint (max 500kb)
    if (file.size > 512000) {
      setError('File size too large. Maximum file size is 500KB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lang = getLanguageFromExtension(file.name);
      onFileLoaded(text, file.name, lang);
      onClose();
    };
    reader.onerror = () => {
      setError('Failed to read file contents.');
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative max-w-md w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-violet-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">Upload File</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Drop zone box */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer select-none ${
            isDragActive
              ? 'border-violet-500 bg-violet-500/[0.02]'
              : 'border-zinc-250 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/10'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            accept=".py,.js,.ts,.tsx,.java,.cpp,.c,.go,.rs,.php,.html,.css,.json,.md"
          />
          <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
            <FileText className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Drag & Drop file here, or <span className="text-violet-500">browse files</span>
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal max-w-xs">
              Supports .py, .js, .ts, .java, .go, .rs, .json, .md etc. up to 500KB.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
