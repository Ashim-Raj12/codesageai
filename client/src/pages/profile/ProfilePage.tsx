import React from 'react';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { AccountCard } from '../../components/profile/AccountCard';

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Developer Profile</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage public profile attributes and view credentials.</p>
      </div>

      {/* Grid containing modular sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileCard />
        </div>
        <div className="lg:col-span-1">
          <AccountCard />
        </div>
      </div>
    </div>
  );
};
