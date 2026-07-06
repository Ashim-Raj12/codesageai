import React from 'react';
import { Shield, ShieldAlert, Zap, Clock, Code } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface MiniMetricsProps {
  securityScore: number;
  qualityScore: number;
  performanceScore: number;
  complexityScore: number;
  reviewTimeMinutes: number;
}

export const MiniMetrics: React.FC<MiniMetricsProps> = ({
  securityScore,
  qualityScore,
  performanceScore,
  complexityScore,
  reviewTimeMinutes,
}) => {
  const getBadgeVariant = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  return (
    <div className="w-56 shrink-0 flex flex-col gap-5 p-4 bg-zinc-50/50 dark:bg-zinc-950/20 border-l border-zinc-200 dark:border-zinc-900/80 min-h-[480px] font-sans">
      <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider block">
        Workspace Metrics
      </span>

      <div className="space-y-4">
        {/* Quality Score */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" /> Quality
            </span>
            <Badge variant={getBadgeVariant(qualityScore)} className="text-[9px] font-mono font-bold leading-none py-0.5">
              {qualityScore}%
            </Badge>
          </div>
        </div>

        {/* Security Score */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" /> Security
            </span>
            <Badge variant={getBadgeVariant(securityScore)} className="text-[9px] font-mono font-bold leading-none py-0.5">
              {securityScore}%
            </Badge>
          </div>
        </div>

        {/* Performance Score */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Performance
            </span>
            <Badge variant={getBadgeVariant(performanceScore)} className="text-[9px] font-mono font-bold leading-none py-0.5">
              {performanceScore}%
            </Badge>
          </div>
        </div>

        {/* Complexity Score */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" /> Complexity
            </span>
            <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
              {complexityScore} / 100
            </span>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-900/60 my-2 pt-2" />

        {/* Review Time */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Review Time
            </span>
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 font-mono">
              ~{reviewTimeMinutes} mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
