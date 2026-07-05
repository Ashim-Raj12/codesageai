import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Star, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { EmptyState } from '../../components/shared/EmptyState';
import { Button } from '../../components/ui/Button';

export const SavedReportsPage: React.FC = () => {
  const [savedItems, setSavedItems] = useState([
    { id: '1', title: 'Concurrency Deadlock Warning', file: 'payment_router.go', language: 'Go', date: '2026-07-04', score: 85, note: 'Reviewed by Tech Lead. Needs refactoring soon.' },
    { id: '2', title: 'Undef pointer in email getter', file: 'useTheme.tsx', language: 'TypeScript', date: '2026-07-05', score: 98, note: 'Safe. Code optimized.' },
  ]);

  const handleUnsave = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Saved Reports</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Access bookmarked reviews, audit warnings, and refactoring guidelines.</p>
      </div>

      {savedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedItems.map((item) => (
            <Card key={item.id} hoverable className="bg-white dark:bg-zinc-950 flex flex-col justify-between">
              <div>
                <CardHeader className="flex flex-row items-start justify-between pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 font-mono">
                        {item.language}
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold mt-2">{item.title}</CardTitle>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium mt-0.5">{item.file}</p>
                  </div>
                  <button
                    onClick={() => handleUnsave(item.id)}
                    className="text-yellow-500 hover:text-zinc-400 transition-colors p-1 cursor-pointer"
                    title="Remove from saved"
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </button>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-900">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-300">Comment:</span> {item.note}
                  </p>
                </CardContent>
              </div>

              <div className="p-6 pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 mt-4">
                <span
                  className={`font-semibold font-mono text-xs ${
                    item.score >= 90
                      ? 'text-emerald-500 bg-emerald-500/10'
                      : 'text-amber-500 bg-amber-500/10'
                  } px-2.5 py-0.5 rounded-full`}
                >
                  Health: {item.score}/100
                </span>

                <div className="flex gap-2">
                  <Link to={`/dashboard/analyzer?preset=${item.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 cursor-pointer text-xs">
                      Inspect Diff <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved reports yet"
          description="Star or bookmark report details inside the Code Analyzer panel to see them listed here."
          actionText="Open Analyzer"
          onAction={() => {
            // Programmatically navigate to analyzer page or let the route transition
            window.location.hash = '/dashboard/analyzer';
          }}
        />
      )}
    </div>
  );
};
