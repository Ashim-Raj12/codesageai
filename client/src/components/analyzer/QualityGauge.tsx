import React from 'react';
import { motion } from 'framer-motion';

interface QualityGaugeProps {
  score: number;
}

export const QualityGauge: React.FC<QualityGaugeProps> = ({ score }) => {
  const getGrade = (val: number): string => {
    if (val >= 95) return 'A+';
    if (val >= 90) return 'A';
    if (val >= 85) return 'B+';
    if (val >= 75) return 'B';
    if (val >= 65) return 'C';
    return 'D';
  };

  const getGradeColor = (val: number): string => {
    if (val >= 90) return 'text-emerald-500';
    if (val >= 75) return 'text-amber-500';
    return 'text-red-500';
  };

  const getStrokeColor = (val: number): string => {
    if (val >= 90) return '#10b981'; // emerald-500
    if (val >= 75) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  // Circle path parameters
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-3 font-sans select-none">
      <div className="relative h-32 w-32 flex items-center justify-center">
        {/* SVG progress circle */}
        <svg className="h-full w-full -rotate-90 overflow-visible" viewBox="0 0 120 120">
          {/* Track Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="stroke-zinc-100 dark:stroke-zinc-900 fill-transparent"
            strokeWidth={strokeWidth}
          />
          {/* Active Progress arc */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke={getStrokeColor(score)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Labels */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-black font-mono tracking-tight leading-none ${getGradeColor(score)}`}>
            {getGrade(score)}
          </span>
          <span className="text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 mt-1.5">
            {score}% SCORE
          </span>
        </div>
      </div>

      {/* Description tag under circle */}
      <div className="text-center mt-3 space-y-1">
        <h4 className={`text-sm font-bold uppercase tracking-wide ${getGradeColor(score)}`}>
          {score >= 90 ? 'Excellent Build' : score >= 75 ? 'Acceptable' : 'Refactoring Needed'}
        </h4>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
          Based on 14 compiler audit rules.
        </p>
      </div>
    </div>
  );
};
