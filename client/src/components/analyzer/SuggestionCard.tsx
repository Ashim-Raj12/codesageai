import React from 'react';
import { Sparkles } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

export interface CodeSuggestion {
  id: string;
  title: string;
  description: string;
  before?: string;
  after?: string;
}

interface SuggestionCardProps {
  suggestion: CodeSuggestion;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
}) => {
  return (
    <DashboardCard className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/60">
      <div className="space-y-3">
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-violet-500/10 text-violet-500">
            <Sparkles className="h-4 w-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-50 m-0">
            {suggestion.title}
          </h4>
        </div>

        {/* Text */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {suggestion.description}
        </p>

        {/* Before / After comparisons */}
        {suggestion.before && suggestion.after && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-[11px]">
            <div className="p-3 border border-red-500/10 dark:border-red-950/20 bg-red-500/[0.02] rounded-lg">
              <span className="text-[9px] text-red-500 uppercase tracking-widest font-bold mb-1 block">Before</span>
              <code className="text-red-600 dark:text-red-400 break-all">{suggestion.before}</code>
            </div>
            <div className="p-3 border border-emerald-500/10 dark:border-emerald-950/20 bg-emerald-500/[0.02] rounded-lg">
              <span className="text-[9px] text-emerald-500 uppercase tracking-widest font-bold mb-1 block">After</span>
              <code className="text-emerald-600 dark:text-emerald-400 break-all">{suggestion.after}</code>
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};
