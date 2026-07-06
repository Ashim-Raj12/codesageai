import React from 'react';
import { Bell, Info, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardCard } from './DashboardCard';
import { cn } from '../../utils/cn';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'system';
}

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  delay?: number;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead,
  delay = 0,
}) => {
  const icons = {
    info: Info,
    warning: ShieldAlert,
    success: Sparkles,
    system: Bell,
  };

  const colors = {
    info: 'text-sky-500 bg-sky-500/10 border-sky-500/10',
    warning: 'text-amber-500 bg-amber-500/10 border-amber-500/10',
    success: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/10',
    system: 'text-violet-500 bg-violet-500/10 border-violet-500/10',
  };

  const IconComponent = icons[notification.type] || Bell;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ x: 2 }}
    >
      <DashboardCard
        className={cn(
          'p-4 bg-white dark:bg-zinc-950 border transition-colors flex justify-between gap-4 items-start',
          notification.isRead
            ? 'border-zinc-200 dark:border-zinc-900/60'
            : 'border-violet-500/20 dark:border-violet-500/20 bg-violet-500/[0.01] dark:bg-violet-500/[0.01]'
        )}
      >
        <div className="flex gap-3.5 items-start flex-1 min-w-0">
          {/* Status Dot */}
          {!notification.isRead && (
            <span className="h-2 w-2 rounded-full bg-violet-500 shrink-0 mt-1.5 animate-pulse" />
          )}

          {/* Category Icon */}
          <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border', colors[notification.type])}>
            <IconComponent className="h-4.5 w-4.5" />
          </div>

          <div className="space-y-1 flex-1 min-w-0 leading-none">
            <h4 className={cn('text-xs sm:text-sm font-semibold truncate', notification.isRead ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-zinc-50')}>
              {notification.title}
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed pt-0.5">
              {notification.description}
            </p>
            <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 block pt-1.5">{notification.time}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          {!notification.isRead && onMarkRead && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="p-1 rounded-md text-zinc-400 hover:text-emerald-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              title="Mark as read"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </DashboardCard>
    </motion.div>
  );
};
