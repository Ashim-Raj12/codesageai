import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "An error occurred while loading this section. Please try again.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-red-200 dark:border-red-950/30 rounded-xl bg-red-50/20 dark:bg-red-950/5 max-w-md mx-auto my-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 mb-4 border border-red-200 dark:border-red-900/30">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 leading-6">{title}</h3>
      <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-normal max-w-xs">{message}</p>
      {onRetry && (
        <div className="mt-6">
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
};
