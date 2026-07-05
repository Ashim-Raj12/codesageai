import React from 'react';
import { cn } from '../../utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  center?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className,
  center = false,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 stroke-[3]',
    md: 'h-8 w-8 stroke-[2.5]',
    lg: 'h-12 w-12 stroke-[2]',
    xl: 'h-16 w-16 stroke-[1.5]',
  };

  const spinner = (
    <svg
      className={cn('animate-spin text-violet-500 dark:text-violet-400', sizeClasses[size], className)}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-15 dark:opacity-10"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-85"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (center) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8 min-h-[150px]">
        {spinner}
      </div>
    );
  }

  return spinner;
};
