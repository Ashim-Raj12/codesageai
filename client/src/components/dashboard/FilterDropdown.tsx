import React from 'react';
import { cn } from '../../utils/cn';

interface FilterDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 min-w-[120px] max-w-xs">
      {label && (
        <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
          {label}
        </span>
      )}
      <select
        className={cn(
          'w-full text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1.5 text-zinc-700 dark:text-zinc-300 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%2371717a%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E")] bg-[length:1.25rem_1.25rem] bg-[right_0.35rem_center] bg-no-repeat pr-7',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-zinc-950 font-sans">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
