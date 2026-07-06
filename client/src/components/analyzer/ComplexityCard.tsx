import React from 'react';
import { Network, Layers } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

interface ComplexityMetric {
  label: string;
  value: number | string;
  limit: number | string;
  percentage: number; // 0 to 100
}

interface ComplexityCardProps {
  cyclomatic: number;
  nestedLoops: number;
  nestedConditions: number;
  largeFunctions: number;
  duplicatedLines: number;
}

export const ComplexityCard: React.FC<ComplexityCardProps> = ({
  cyclomatic,
  nestedLoops,
  nestedConditions,
  largeFunctions,
  duplicatedLines,
}) => {
  const metrics: ComplexityMetric[] = [
    { label: 'Cyclomatic Complexity', value: cyclomatic, limit: 15, percentage: Math.min((cyclomatic / 15) * 100, 100) },
    { label: 'Deep Nested Loops', value: nestedLoops, limit: 2, percentage: Math.min((nestedLoops / 2) * 100, 100) },
    { label: 'Nested Conditionals', value: nestedConditions, limit: 3, percentage: Math.min((nestedConditions / 3) * 100, 100) },
    { label: 'Large Function Units', value: largeFunctions, limit: 1, percentage: Math.min((largeFunctions / 1) * 100, 100) },
    { label: 'Duplicated Code Lines', value: duplicatedLines, limit: 0, percentage: duplicatedLines > 0 ? 100 : 0 },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metric progression list */}
        <DashboardCard className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/60 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-2">
            <Network className="h-4.5 w-4.5 text-violet-500" />
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-50 m-0">Nesting & Code Flow</h4>
          </div>
          <div className="space-y-4">
            {metrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-350">
                  <span>{m.label}</span>
                  <span className="font-mono text-zinc-400">
                    {m.value} <span className="text-[10px] text-zinc-500">/ limit {m.limit}</span>
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-550 ${
                      m.value > m.limit ? 'bg-red-500' : 'bg-violet-500'
                    }`}
                    style={{ width: `${m.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Complexity visualization placeholder */}
        <DashboardCard className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/60 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-2">
            <Layers className="h-4.5 w-4.5 text-violet-500" />
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-50 m-0">AST Tree Density Map</h4>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4 min-h-[140px]">
            {/* Visual aesthetic tree graph placeholder */}
            <div className="flex items-end gap-1.5 h-24 w-full justify-center max-w-xs">
              {[30, 45, 25, 60, 80, 50, 40, 75, 90, 35].map((height, i) => (
                <div key={i} className="flex flex-col items-center flex-1 group/bar relative">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      height > 70
                        ? 'bg-red-500/20 dark:bg-red-500/30 hover:bg-red-500'
                        : 'bg-violet-500/20 dark:bg-violet-500/30 hover:bg-violet-500'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[8px] font-mono text-zinc-500 mt-1.5">L{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center leading-normal mt-2">
            The chart visualizes logical branching density metrics per AST node layer.
          </p>
        </DashboardCard>
      </div>
    </div>
  );
};
