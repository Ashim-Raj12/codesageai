import React from 'react';
import { FileText, Pin, Folder, Bookmark } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ExplorerFile {
  id: string;
  name: string;
  lang: string;
  isPinned?: boolean;
}

interface RecentFilesProps {
  activeFileId?: string;
  onSelectFile: (fileId: string) => void;
}

export const RecentFiles: React.FC<RecentFilesProps> = ({
  activeFileId,
  onSelectFile,
}) => {
  const pinnedFiles: ExplorerFile[] = [
    { id: 'typescript', name: 'auth-handler.ts', lang: 'TypeScript', isPinned: true },
    { id: 'python', name: 'etl-worker.py', lang: 'Python', isPinned: true },
    { id: 'go', name: 'main.go', lang: 'Go', isPinned: true },
  ];

  const recentFiles: ExplorerFile[] = [
    { id: 'rust', name: 'parser.rs', lang: 'Rust' },
    { id: 'java', name: 'BillingService.java', lang: 'Java' },
    { id: 'json', name: 'package.json', lang: 'JSON' },
  ];

  const renderFileList = (files: ExplorerFile[], sectionTitle: string, icon: any) => (
    <div className="space-y-2">
      <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider px-2 block">
        {sectionTitle}
      </span>
      <div className="space-y-0.5">
        {files.map((file) => {
          const isActive = file.id === activeFileId;
          return (
            <button
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              className={cn(
                'flex w-full items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold transition-colors cursor-pointer select-none',
                isActive
                  ? 'bg-zinc-150 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-100 font-bold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
              )}
            >
              {icon}
              <span className="truncate flex-1 font-mono">{file.name}</span>
              <span className="text-[9px] font-semibold text-zinc-400 px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                {file.lang}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-56 shrink-0 flex flex-col gap-6 p-3 bg-zinc-50/50 dark:bg-zinc-950/20 border-r border-zinc-200 dark:border-zinc-900/80 min-h-[480px] font-sans">
      
      {/* Pinned Files */}
      {renderFileList(pinnedFiles, 'Pinned Files', <Pin className="h-3.5 w-3.5 text-violet-500 fill-current" />)}

      {/* Recent Files */}
      {renderFileList(recentFiles, 'Recent Files', <FileText className="h-3.5 w-3.5 text-zinc-400" />)}

      {/* Projects */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider px-2 block">
          Workspace Projects
        </span>
        <div className="space-y-0.5">
          {['codesage-api', 'frontend-dashboard'].map((proj) => (
            <div
              key={proj}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-zinc-400 select-none cursor-not-allowed"
            >
              <Folder className="h-3.5 w-3.5" />
              <span className="truncate">{proj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider px-2 block">
          Review Templates
        </span>
        <div className="space-y-0.5">
          {['Security Audit', 'Performance Optimization'].map((temp) => (
            <div
              key={temp}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-zinc-400 select-none cursor-not-allowed"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span className="truncate">{temp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
