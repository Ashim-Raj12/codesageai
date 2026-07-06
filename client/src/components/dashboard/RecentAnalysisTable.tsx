import React, { useState } from 'react';
import { MoreHorizontal, FileText, CheckCircle2, Loader2, AlertCircle, PencilLine, Trash2, Share2, Copy } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export interface AnalysisRow {
  id: string;
  language: string;
  project: string;
  qualityScore: number;
  date: string;
  status: 'Completed' | 'Running' | 'Failed' | 'Draft';
}

interface RecentAnalysisTableProps {
  data: AnalysisRow[];
  onOpen?: (row: AnalysisRow) => void;
  onDelete?: (id: string) => void;
  onShare?: (row: AnalysisRow) => void;
  onDuplicate?: (row: AnalysisRow) => void;
}

export const RecentAnalysisTable: React.FC<RecentAnalysisTableProps> = ({
  data,
  onOpen,
  onDelete,
  onShare,
  onDuplicate,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatusBadge = (status: AnalysisRow['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <Badge variant="success" className="gap-1 font-mono text-[9px] uppercase">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </Badge>
        );
      case 'Running':
        return (
          <Badge variant="info" className="gap-1 font-mono text-[9px] uppercase">
            <Loader2 className="h-3 w-3 animate-spin" /> Running
          </Badge>
        );
      case 'Failed':
        return (
          <Badge variant="error" className="gap-1 font-mono text-[9px] uppercase">
            <AlertCircle className="h-3 w-3" /> Failed
          </Badge>
        );
      case 'Draft':
        return (
          <Badge variant="default" className="gap-1 font-mono text-[9px] uppercase bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            <PencilLine className="h-3 w-3" /> Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500 font-bold';
    if (score >= 70) return 'text-amber-500 font-bold';
    return 'text-red-500 font-bold';
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-xs">
      <table className="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-900 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-900/10">
            <th className="py-3.5 px-4 font-sans font-bold">Project File</th>
            <th className="py-3.5 px-4 font-sans font-bold">Language</th>
            <th className="py-3.5 px-4 font-sans font-bold">Quality Score</th>
            <th className="py-3.5 px-4 font-sans font-bold">Date Scanned</th>
            <th className="py-3.5 px-4 font-sans font-bold">Status</th>
            <th className="py-3.5 px-4 font-sans font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-900/60">
          {data.map((row) => (
            <tr
              key={row.id}
              className="text-xs hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 transition-colors"
            >
              {/* Project File Column */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-zinc-400 shrink-0" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono truncate max-w-[150px] sm:max-w-[200px]" title={row.project}>
                    {row.project}
                  </span>
                </div>
              </td>

              {/* Language Badge */}
              <td className="py-3 px-4 font-medium text-zinc-600 dark:text-zinc-400">
                {row.language}
              </td>

              {/* Quality Score */}
              <td className="py-3 px-4">
                <span className={cn('font-mono text-sm', getScoreColor(row.qualityScore))}>
                  {row.status === 'Running' || row.status === 'Failed' ? '—' : `${row.qualityScore}%`}
                </span>
              </td>

              {/* Date */}
              <td className="py-3 px-4 text-zinc-500 dark:text-zinc-500 font-mono">
                {row.date}
              </td>

              {/* Status */}
              <td className="py-3 px-4">
                {getStatusBadge(row.status)}
              </td>

              {/* Row Action Items */}
              <td className="py-3 px-4 text-right relative">
                <div className="flex items-center justify-end gap-1.5">
                  {onOpen && (
                    <button
                      onClick={() => onOpen(row)}
                      className="text-[10px] font-semibold bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-md px-2 py-1 transition-colors cursor-pointer"
                    >
                      Open
                    </button>
                  )}

                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === row.id ? null : row.id)}
                      className="p-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                      title="More actions"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>

                    {/* Popover actions list */}
                    {activeMenu === row.id && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setActiveMenu(null)}
                        />
                        <div className="absolute right-0 mt-1 w-32 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md z-40 text-left">
                          {onDuplicate && (
                            <button
                              onClick={() => {
                                onDuplicate(row);
                                setActiveMenu(null);
                              }}
                              className="flex w-full items-center gap-2 px-2.5 py-1.5 text-[11px] font-semibold rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
                            >
                              <Copy className="h-3.5 w-3.5" /> Duplicate
                            </button>
                          )}
                          {onShare && (
                            <button
                              onClick={() => {
                                onShare(row);
                                setActiveMenu(null);
                              }}
                              className="flex w-full items-center gap-2 px-2.5 py-1.5 text-[11px] font-semibold rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
                            >
                              <Share2 className="h-3.5 w-3.5" /> Share
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => {
                                onDelete(row.id);
                                setActiveMenu(null);
                              }}
                              className="flex w-full items-center gap-2 px-2.5 py-1.5 text-[11px] font-semibold rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
