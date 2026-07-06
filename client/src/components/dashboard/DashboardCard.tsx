import React from 'react';
import { cn } from '../../utils/cn';

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  className,
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-xl shadow-xs overflow-hidden transition-all duration-200',
        hoverable && 'hover:border-zinc-300 dark:hover:border-zinc-800 hover:shadow-md hover:translate-y-[-1px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
