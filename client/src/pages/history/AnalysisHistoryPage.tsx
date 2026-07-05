import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { History, Search, FileCode2, ExternalLink, Calendar, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/shared/EmptyState';

export const AnalysisHistoryPage: React.FC = () => {
  const [filterText, setFilterText] = useState('');
  const [filterLang, setFilterLang] = useState('all');

  // Mock list of past reviews
  const [historyItems, setHistoryItems] = useState([
    { id: '1', file: 'auth_handler.py', language: 'Python', issues: 2, date: '2026-07-05 21:30', score: 78 },
    { id: '2', file: 'useTheme.tsx', language: 'TypeScript', issues: 0, date: '2026-07-05 19:40', score: 98 },
    { id: '3', file: 'payment_router.go', language: 'Go', issues: 1, date: '2026-07-04 12:15', score: 85 },
    { id: '4', file: 'DataSyncJob.java', language: 'Java', issues: 3, date: '2026-07-02 09:44', score: 62 },
    { id: '5', file: 'App.tsx', language: 'TypeScript', issues: 1, date: '2026-06-29 16:30', score: 89 },
    { id: '6', file: 'db_pool.py', language: 'Python', issues: 4, date: '2026-06-28 11:20', score: 54 },
  ]);

  const handleDelete = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = historyItems.filter((item) => {
    const matchesText = item.file.toLowerCase().includes(filterText.toLowerCase());
    const matchesLang = filterLang === 'all' || item.language.toLowerCase() === filterLang.toLowerCase();
    return matchesText && matchesLang;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Analysis History</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Review, inspect, or manage your previous AI code audits.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
            <Search className="h-4.5 w-4.5" />
          </span>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter by file name..."
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1.5 pl-9 pr-4 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        <select
          value={filterLang}
          onChange={(e) => setFilterLang(e.target.value)}
          className="w-full sm:w-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-300 focus:outline-none"
        >
          <option value="all">All Languages</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="go">Go Lang</option>
          <option value="java">Java</option>
        </select>
      </div>

      {/* Main List */}
      <Card className="bg-white dark:bg-zinc-950">
        <CardContent className="p-0">
          {filteredItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm divide-y divide-zinc-100 dark:divide-zinc-900">
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-900/10 text-zinc-500 dark:text-zinc-400 font-medium">
                    <th className="px-6 py-3.5">File / Module</th>
                    <th className="px-6 py-3.5">Language</th>
                    <th className="px-6 py-3.5">Date analyzed</th>
                    <th className="px-6 py-3.5">Scan Result</th>
                    <th className="px-6 py-3.5 text-center">Score</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-zinc-900 dark:text-zinc-300 flex items-center gap-2">
                        <FileCode2 className="h-4.5 w-4.5 text-zinc-400 shrink-0" />
                        <span>{item.file}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 font-mono">
                          {item.language}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-400 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                        <span>{item.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        {item.issues > 0 ? (
                          <Badge variant={item.score < 70 ? 'error' : 'warning'}>
                            {item.issues} alert{item.issues > 1 && 's'}
                          </Badge>
                        ) : (
                          <Badge variant="success">Passed</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-semibold font-mono text-xs ${
                            item.score >= 90
                              ? 'text-emerald-500 bg-emerald-500/10'
                              : item.score >= 70
                              ? 'text-amber-500 bg-amber-500/10'
                              : 'text-red-500 bg-red-500/10'
                          } px-2 py-0.5 rounded-full`}
                        >
                          {item.score}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/dashboard/analyzer?preset=${item.id}`}
                            className="p-1 rounded-md text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                            title="Open Analysis"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 rounded-md text-zinc-400 hover:text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={History}
              title="No history found"
              description="No code analyses match your selected filter criteria. Try updating the filters or run a new scan."
              actionText="Reset Filters"
              onAction={() => {
                setFilterText('');
                setFilterLang('all');
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
