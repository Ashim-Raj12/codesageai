import React from 'react';
import { motion } from 'framer-motion';

interface LanguageCardProps {
  name: string;
  extension: string;
  svg?: React.ReactNode;
  delay?: number;
}

export const LanguageCard: React.FC<LanguageCardProps> = ({
  name,
  extension,
  svg,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2 }}
      className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-800 transition-all select-none hover:shadow-xs"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
        {svg ? (
          svg
        ) : (
          <span className="font-mono text-[10px] font-bold uppercase">{extension}</span>
        )}
      </div>
      <div className="flex flex-col min-w-0 leading-none">
        <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{name}</span>
        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mt-1">{extension}</span>
      </div>
    </motion.div>
  );
};
