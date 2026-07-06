import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardCard } from './DashboardCard';
import { cn } from '../../utils/cn';

interface InsightCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  delay?: number;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  icon: Icon = Sparkles,
  trend,
  trendType = 'neutral',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
    >
      <DashboardCard className="p-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-100 dark:border-zinc-900/80">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/20 text-violet-500 border border-violet-100/50 dark:border-violet-900/20">
            <Icon className="h-4 w-4" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{title}</h4>
              {trend && (
                <span
                  className={cn(
                    'text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0',
                    trendType === 'positive' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400',
                    trendType === 'negative' && 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400',
                    trendType === 'neutral' && 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'
                  )}
                >
                  {trend}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">{description}</p>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
};
