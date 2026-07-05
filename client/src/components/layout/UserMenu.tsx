import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, Settings, CreditCard, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mock user details
  const user = {
    name: 'Alex Sage',
    email: 'alex.sage@codesage.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800/80 transition-all cursor-pointer text-left focus:outline-none"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="h-7 w-7 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
        />
        <div className="hidden md:flex flex-col text-xs leading-none">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</span>
          <span className="text-zinc-500 text-[10px] mt-0.5">{user.email}</span>
        </div>
        <ChevronDown className="h-3 w-3 text-zinc-400 dark:text-zinc-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1.5 shadow-lg dark:shadow-zinc-950/80 z-50"
          >
            <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-900/50 mb-1">
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Account</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate mt-0.5">{user.name}</p>
              <p className="text-xs text-zinc-500 truncate">{user.email}</p>
            </div>

            <div className="space-y-0.5">
              <Link
                to="/dashboard/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <Link
                to="/dashboard/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
              <Link
                to="/dashboard/settings?tab=billing"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </Link>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-900/50 mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-300 transition-colors cursor-pointer text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
