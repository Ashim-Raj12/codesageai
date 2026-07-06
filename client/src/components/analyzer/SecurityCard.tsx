import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export interface SecurityVulnerability {
  id: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  impact: string;
  fix: string;
}

interface SecurityCardProps {
  vulnerability: SecurityVulnerability;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({
  vulnerability,
}) => {
  const severities = {
    Critical: 'bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
    High: 'bg-orange-50 text-orange-700 border-orange-200/50 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
    Low: 'bg-sky-50 text-sky-700 border-sky-200/50 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900/30',
  };

  return (
    <DashboardCard className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/60">
      <div className="space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900/40 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4.5 w-4.5 text-red-500" />
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-50 m-0 leading-none">
              {vulnerability.type}
            </h4>
          </div>
          <Badge variant="default" className={cn('text-[9px] font-bold uppercase tracking-wider', severities[vulnerability.severity])}>
            {vulnerability.severity}
          </Badge>
        </div>

        {/* Text descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Description</span>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">{vulnerability.description}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Vulnerable Impact</span>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">{vulnerability.impact}</p>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="p-3.5 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-900/40 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-350">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Recommended Mitigation</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
            {vulnerability.fix}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
};
