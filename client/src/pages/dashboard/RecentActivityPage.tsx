import React, { useState } from 'react';
import { Search, History, Trash2, SlidersHorizontal } from 'lucide-react';
import { ActivityCard } from '../../components/dashboard/ActivityCard';
import type { ActivityItem } from '../../components/dashboard/ActivityCard';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { EmptyState } from '../../components/shared/EmptyState';

const MOCK_ACTIVITIES: ActivityItem[] = [
  { id: '1', action: 'Reviewed React Project', target: 'src/components/layout/Navbar.tsx (JS/TS)', time: '10 mins ago', type: 'code' },
  { id: '2', action: 'Exported PDF Report', target: 'Saved Reports/Q3-Performance-Audit.pdf', time: '2 hours ago', type: 'export' },
  { id: '3', action: 'Generated Unit Tests', target: 'tests/auth-service.spec.ts', time: '1 day ago', type: 'test' },
  { id: '4', action: 'Optimized Python script', target: 'scripts/etl-worker.py (Python)', time: '2 days ago', type: 'refactor' },
  { id: '5', action: 'Scanned Security Vulnerabilities', target: 'api-gateway/main.go (Go)', time: '3 days ago', type: 'code' },
  { id: '6', action: 'Exported Quality JSON', target: 'Reports/Historical-Trend.json', time: '5 days ago', type: 'export' },
  { id: '7', action: 'Refactored CSS modules', target: 'client/src/index.css (CSS)', time: '1 week ago', type: 'refactor' },
];

export const RecentActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>(MOCK_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleClearActivity = () => {
    setActivities([]);
  };

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || act.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Recent Activity</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Audit logs of code scans, report exports, and model instructions.
          </p>
        </div>
        {activities.length > 0 && (
          <Button
            onClick={handleClearActivity}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 dark:border-red-950/40 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-400 shrink-0 gap-1.5"
          >
            <Trash2 className="h-4 w-4" /> Clear Log
          </Button>
        )}
      </div>

      {/* Filter and Search controls */}
      {activities.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activity log..."
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-1.5 pl-9 pr-4 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 dark:text-zinc-500">
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-1.5 px-3 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
            >
              <option value="all">All Activities</option>
              <option value="code">Code Scans</option>
              <option value="export">Exports</option>
              <option value="refactor">Refactors</option>
              <option value="test">Unit Tests</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Timeline Card Container */}
      {filteredActivities.length > 0 ? (
        <Card className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900/60 p-6">
          <CardContent className="p-0">
            <div className="flex flex-col">
              {filteredActivities.map((act, idx) => (
                <ActivityCard
                  key={act.id}
                  activity={act}
                  isLast={idx === filteredActivities.length - 1}
                  delay={idx * 0.05}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="py-12 border border-zinc-200 dark:border-zinc-900 rounded-xl bg-white dark:bg-zinc-950">
          <EmptyState
            title={activities.length === 0 ? "No Activity Logs" : "No Match Found"}
            description={
              activities.length === 0
                ? "Your workspace activity log is empty. Try triggering a new code scan."
                : "No activity runs match your search filters. Try clearing your search fields."
            }
            icon={History}
          />
        </div>
      )}
    </div>
  );
};
