import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardCard } from './DashboardCard';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  delay?: number;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      <button
        onClick={onClick}
        type="button"
        className="w-full text-left group focus:outline-none cursor-pointer"
      >
        <DashboardCard
          hoverable
          className="p-5 flex flex-col justify-between h-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 group-hover:border-violet-500/40 dark:group-hover:border-violet-500/30 transition-all duration-200"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:scale-105 transition-all duration-200">
            <Icon className="h-5 w-5" />
          </div>
          <div className="mt-4 space-y-1">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
              {title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal line-clamp-2">
              {description}
            </p>
          </div>
        </DashboardCard>
      </button>
    </motion.div>
  );
};
