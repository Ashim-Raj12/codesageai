import React from 'react';
import { FileCode, CheckCircle, FileText, Sparkles, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ActivityItem {
  id: string;
  action: string;
  target: string;
  time: string;
  type: 'code' | 'export' | 'refactor' | 'test' | 'default';
}

interface ActivityCardProps {
  activity: ActivityItem;
  isLast?: boolean;
  delay?: number;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isLast = false,
  delay = 0,
}) => {
  const icons = {
    code: FileCode,
    export: FileText,
    refactor: Sparkles,
    test: CheckCircle,
    default: Activity,
  };

  const colors = {
    code: 'text-violet-500 bg-violet-500/10 border-violet-500/15',
    export: 'text-sky-500 bg-sky-500/10 border-sky-500/15',
    refactor: 'text-amber-500 bg-amber-500/10 border-amber-500/15',
    test: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/15',
    default: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/15',
  };

  const IconComponent = icons[activity.type] || icons.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex gap-4 relative group"
    >
      {/* Timeline connectors */}
      <div className="flex flex-col items-center shrink-0">
        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-lg border bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300">
          <div className={`p-1.5 rounded-md border ${colors[activity.type]}`}>
            <IconComponent className="h-3.5 w-3.5" />
          </div>
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800 min-h-[40px] my-1" />
        )}
      </div>

      {/* Detail Block */}
      <div className="flex-1 pb-6 space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {activity.action}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">{activity.time}</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium">
          {activity.target}
        </p>
      </div>
    </motion.div>
  );
};
