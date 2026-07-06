import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardCard } from './DashboardCard';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  progress?: number; // 0 to 100
  progressColor?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  progress,
  progressColor = 'bg-violet-600 dark:bg-violet-500',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay }}
    >
      <DashboardCard hoverable className="p-5 flex flex-col justify-between h-full bg-white dark:bg-zinc-950">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{title}</span>
          <div className="p-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg">
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-mono">{value}</span>
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                  trend.isPositive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                    : 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                )}
              >
                {trend.isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                {trend.value}
              </span>
            )}
          </div>

          {/* Optional progress bar */}
          {progress !== undefined && (
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: delay + 0.2 }}
                  className={cn('h-full rounded-full', progressColor)}
                />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                <span>Usage Limit</span>
                <span>{progress}%</span>
              </div>
            </div>
          )}
        </div>
      </DashboardCard>
    </motion.div>
  );
};
