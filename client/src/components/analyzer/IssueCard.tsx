import React, { useState } from 'react';
import { AlertOctagon, Check, Copy, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export interface BugIssue {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  title: string;
  description: string;
  line: number;
  fix: string;
}

interface IssueCardProps {
  issue: BugIssue;
  onCopyFix?: (fix: string) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  onCopyFix,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopyFix) {
      onCopyFix(issue.fix);
    } else {
      navigator.clipboard.writeText(issue.fix);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const severityConfigs = {
    Critical: {
      badge: 'bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
      icon: AlertOctagon,
      border: 'border-l-4 border-l-red-500',
    },
    High: {
      badge: 'bg-orange-50 text-orange-700 border-orange-200/50 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30',
      icon: AlertCircle,
      border: 'border-l-4 border-l-orange-500',
    },
    Medium: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
      icon: AlertTriangle,
      border: 'border-l-4 border-l-amber-500',
    },
    Low: {
      badge: 'bg-sky-50 text-sky-700 border-sky-200/50 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900/30',
      icon: Info,
      border: 'border-l-4 border-l-sky-500',
    },
    Info: {
      badge: 'bg-zinc-150 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800',
      icon: Info,
      border: 'border-l-4 border-l-zinc-500',
    },
  };

  const config = severityConfigs[issue.severity] || severityConfigs.Info;
  const IconComponent = config.icon;

  return (
    <DashboardCard className={cn('p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/60', config.border)}>
      <div className="flex gap-3.5 items-start">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-500">
          <IconComponent className="h-4.5 w-4.5" />
        </div>

        <div className="space-y-3 flex-1 min-w-0">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded shrink-0">
                Line {issue.line}
              </span>
              <Badge variant="default" className={cn('text-[9px] font-bold uppercase tracking-wider', config.badge)}>
                {issue.severity}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate m-0">
              {issue.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-0.5">
              {issue.description}
            </p>
          </div>

          {/* Proposed Fix Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                Recommended Adjustment
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-500 hover:underline cursor-pointer"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy Fix'}</span>
              </button>
            </div>
            <div className="p-3 border border-zinc-150 dark:border-zinc-900/60 bg-zinc-50/60 dark:bg-zinc-950/20 rounded-lg text-[11px] font-mono text-zinc-800 dark:text-zinc-300 leading-normal overflow-x-auto">
              <pre>{issue.fix}</pre>
            </div>
          </div>

        </div>
      </div>
    </DashboardCard>
  );
};
