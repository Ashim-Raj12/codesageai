import React from 'react';
import { cn } from '../../utils/cn';

export type DiagnosticTabId =
  | 'overview'
  | 'bugs'
  | 'security'
  | 'performance'
  | 'quality'
  | 'complexity'
  | 'suggestions'
  | 'optimized'
  | 'refactored'
  | 'documentation'
  | 'tests';

interface AnalysisTabsProps {
  activeTab: DiagnosticTabId;
  onChangeTab: (tab: DiagnosticTabId) => void;
  counts?: Record<string, number>;
}

export const AnalysisTabs: React.FC<AnalysisTabsProps> = ({
  activeTab,
  onChangeTab,
  counts = {},
}) => {
  const tabsList: { id: DiagnosticTabId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'bugs', label: 'Bug Detection' },
    { id: 'security', label: 'Security' },
    { id: 'performance', label: 'Performance' },
    { id: 'quality', label: 'Code Quality' },
    { id: 'complexity', label: 'Complexity' },
    { id: 'suggestions', label: 'Suggestions' },
    { id: 'optimized', label: 'Optimized Code' },
    { id: 'refactored', label: 'Refactored Code' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'tests', label: 'Unit Tests' },
  ];

  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-900 overflow-x-auto scrollbar-none gap-2 px-4 py-1.5 bg-zinc-50 dark:bg-zinc-950/60 transition-colors">
      {tabsList.map((t) => {
        const countVal = counts[t.id];
        const isActive = activeTab === t.id;

        return (
          <button
            key={t.id}
            onClick={() => onChangeTab(t.id)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0',
              isActive
                ? 'border-violet-500 text-zinc-950 dark:text-zinc-50 font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            )}
          >
            <span>{t.label}</span>
            {countVal !== undefined && countVal > 0 && (
              <span className={cn(
                'text-[9px] px-1 py-0.2 rounded-full font-mono font-bold leading-none',
                isActive 
                  ? 'bg-violet-500 text-white' 
                  : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
              )}>
                {countVal}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
