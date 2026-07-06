import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Lock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardCard } from './DashboardCard';
import { cn } from '../../utils/cn';

interface AchievementCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  isLocked?: boolean;
  delay?: number;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon: Icon = Award,
  isLocked = false,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <DashboardCard
        className={cn(
          'p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 transition-all duration-200',
          isLocked ? 'opacity-50 select-none' : 'hover:border-zinc-300 dark:hover:border-zinc-800'
        )}
      >
        <div className="flex gap-3.5 items-start">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border',
              isLocked
                ? 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400'
                : 'bg-violet-50 dark:bg-violet-950/20 border-violet-100 dark:border-violet-900/30 text-violet-500'
            )}
          >
            {isLocked ? <Lock className="h-4.5 w-4.5" /> : <Icon className="h-5 w-5" />}
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 justify-between">
              <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate leading-none">
                {title}
              </h4>
              {isLocked && (
                <span className="text-[9px] font-semibold text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded-full shrink-0">
                  Locked
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
};
