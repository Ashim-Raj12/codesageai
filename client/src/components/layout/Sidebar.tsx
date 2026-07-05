import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Code,
  History,
  Bookmark,
  User,
  Settings,
  Code2,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, onItemClick }) => {
  const menuItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Code Analyzer', to: '/dashboard/analyzer', icon: Code },
    { label: 'Analysis History', to: '/dashboard/history', icon: History },
    { label: 'Saved Reports', to: '/dashboard/reports', icon: Bookmark },
    { label: 'Developer Profile', to: '/dashboard/profile', icon: User },
    { label: 'Settings', to: '/dashboard/settings', icon: Settings },
  ];

  const subItems = [
    { label: 'Documentation', to: 'https://docs.codesage.ai', icon: BookOpen, external: true },
    { label: 'Help & Support', to: 'mailto:support@codesage.ai', icon: HelpCircle, external: true },
  ];

  return (
    <aside className={cn('flex h-full w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 transition-colors', className)}>
      {/* Brand logo */}
      <div className="flex h-12 items-center px-2 mb-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
            <Code2 className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-zinc-950 dark:text-zinc-50">
            CodeSage<span className="text-violet-500 font-bold">.AI</span>
          </span>
        </Link>
      </div>

      {/* Main navigation menu */}
      <nav className="flex-1 space-y-1">
        <p className="px-2 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Workspace</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            onClick={onItemClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer',
                isActive
                  ? 'bg-zinc-200/60 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 border border-zinc-300/30 dark:border-zinc-800/50'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-100 border border-transparent'
              )
            }
          >
            <item.icon className="h-4.5 w-4.5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Docs */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-auto space-y-1">
        <p className="px-2 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Resources</p>
        {subItems.map((item) => (
          <a
            key={item.label}
            href={item.to}
            target={item.external ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <item.icon className="h-4.5 w-4.5" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};
