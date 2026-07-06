import React from 'react';
import { Spinner } from '../ui/Spinner';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 font-sans">
      <div className="space-y-4 text-center">
        {/* Modern animated spinner */}
        <Spinner size="lg" className="mx-auto" />
        <p className="text-sm font-semibold text-zinc-400 tracking-wide animate-pulse">
          CodeSage AI is initializing session...
        </p>
      </div>
    </div>
  );
};
