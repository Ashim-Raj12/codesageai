import React from 'react';
import { Shield, Terminal, Clock, Star, Flame } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const ProfilePage: React.FC = () => {
  const developer = {
    name: 'Alex Sage',
    email: 'alex.sage@codesage.ai',
    role: 'Senior Full-Stack Engineer',
    joined: 'July 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    stats: [
      { label: 'Analyses Run', value: '12', icon: Terminal, color: 'text-violet-500 bg-violet-500/10' },
      { label: 'Security Fixes', value: '10', icon: Shield, color: 'text-emerald-500 bg-emerald-500/10' },
      { label: 'Total Stars', value: '2', icon: Star, color: 'text-amber-500 bg-amber-500/10' },
      { label: 'Active Streak', value: '4 days', icon: Flame, color: 'text-rose-500 bg-rose-500/10' },
    ],
    languages: [
      { name: 'TypeScript', percent: 45, color: 'bg-blue-500' },
      { name: 'Python', percent: 35, color: 'bg-sky-500' },
      { name: 'Go Lang', percent: 20, color: 'bg-cyan-500' },
    ]
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Developer Profile</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage public profile attributes and view code quality statistics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-white dark:bg-zinc-950">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <img
              src={developer.avatar}
              alt={developer.name}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-zinc-100 dark:ring-zinc-900 shadow-md"
            />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{developer.name}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{developer.role}</p>
              <p className="text-[10px] text-zinc-400 font-mono mt-1 flex items-center justify-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Member since {developer.joined}
              </p>
            </div>
            <div className="pt-2 w-full">
              <Badge variant="purple" className="w-full justify-center py-1">Standard Beta User</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Languages Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {developer.stats.map((s) => (
              <Card key={s.label} className="bg-white dark:bg-zinc-950">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg shrink-0 ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{s.label}</span>
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-0.5">{s.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Languages distribution */}
          <Card className="bg-white dark:bg-zinc-950">
            <CardHeader>
              <CardTitle>Language Distribution</CardTitle>
              <CardDescription>Metrics highlighting code types processed by CodeSage AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stacked Progress Bar */}
              <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex">
                {developer.languages.map((l) => (
                  <div
                    key={l.name}
                    className={`${l.color} h-full`}
                    style={{ width: `${l.percent}%` }}
                    title={`${l.name}: ${l.percent}%`}
                  />
                ))}
              </div>

              {/* Legends list */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {developer.languages.map((l) => (
                  <div key={l.name} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-300">{l.name}</span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono pl-4">{l.percent}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
