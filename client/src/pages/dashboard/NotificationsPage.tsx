import React, { useState } from 'react';
import { Bell, CheckSquare, Trash2 } from 'lucide-react';
import { NotificationCard } from '../../components/dashboard/NotificationCard';
import type { NotificationItem } from '../../components/dashboard/NotificationCard';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/shared/EmptyState';
import { cn } from '../../utils/cn';

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'Analysis Completed', description: 'The performance review for auth-handler.ts was compiled successfully.', time: '10 mins ago', isRead: false, type: 'success' },
  { id: '2', title: 'Security Warning', description: 'Detected an exposed AWS Credentials block in deployment-config.yaml.', time: '1 hour ago', isRead: false, type: 'warning' },
  { id: '3', title: 'Report Exported', description: 'PDF Quality Report "Q3-Performance-Audit" has been generated and is ready for download.', time: '2 hours ago', isRead: true, type: 'info' },
  { id: '4', title: 'New Feature Released', description: 'CodeSage AI now supports Rust compile-time analysis checks.', time: '1 day ago', isRead: true, type: 'system' },
];

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAllRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, isRead: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const displayList = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 font-sans">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Notifications</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Stay updated with security alerts, workspace operations, and scan updates.
          </p>
        </div>
        
        {notifications.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllRead}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <CheckSquare className="h-4 w-4" /> Mark all read
              </Button>
            )}
            <Button
              onClick={handleClearAll}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 dark:border-red-950/40 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-400 gap-1.5"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Tabs list */}
      {notifications.length > 0 && (
        <div className="flex border-b border-zinc-200 dark:border-zinc-900 gap-4">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-2.5 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer',
              filter === 'all'
                ? 'border-violet-500 text-zinc-950 dark:text-zinc-50 font-bold'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            )}
          >
            All Notifications ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={cn(
              'px-2.5 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer',
              filter === 'unread'
                ? 'border-violet-500 text-zinc-950 dark:text-zinc-50 font-bold'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            )}
          >
            Unread ({unreadCount})
          </button>
        </div>
      )}

      {/* Notification Lists */}
      {displayList.length > 0 ? (
        <div className="space-y-3">
          {displayList.map((n, idx) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onMarkRead={handleMarkRead}
              delay={idx * 0.05}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 border border-zinc-200 dark:border-zinc-900 rounded-xl bg-white dark:bg-zinc-950">
          <EmptyState
            title="All caught up!"
            description={
              notifications.length === 0
                ? "No notifications available in your logs right now."
                : "You don't have any unread notifications."
            }
            icon={Bell}
          />
        </div>
      )}
    </div>
  );
};
