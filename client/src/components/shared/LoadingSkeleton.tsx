import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className,
  ...props
}) => {
  const styles: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-zinc-200 dark:bg-zinc-800/80',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'rounded h-3.5 w-full my-1',
        variant === 'rect' && 'rounded-xl',
        className
      )}
      style={styles}
      {...props}
    />
  );
};
