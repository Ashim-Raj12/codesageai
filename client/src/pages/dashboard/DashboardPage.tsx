import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  ShieldAlert,
  Zap,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCode2,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const DashboardPage: React.FC = () => {
  // Mock data for analytics
  const metrics = [
    { label: 'Analyses Run', value: '12 / 50', icon: Code, desc: 'Credits reset in 12 days', color: 'text-violet-500 bg-violet-500/10' },
    { label: 'Security Issues', value: '3 Warnings', icon: ShieldAlert, desc: '2 high, 1 medium severity', color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Health Index', value: '92.4%', icon: TrendingUp, desc: '+3.1% from last week', color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Optimizations', value: '14 Applied', icon: Zap, desc: 'Saved ~240ms of latency', color: 'text-sky-500 bg-sky-500/10' },
  ];

  const recentReviews = [
    { id: '1', file: 'auth_handler.py', language: 'Python', severity: 'error', issues: 2, date: '10 mins ago', score: 78 },
    { id: '2', file: 'useTheme.tsx', language: 'TypeScript', severity: 'success', issues: 0, date: '2 hours ago', score: 98 },
    { id: '3', file: 'payment_router.go', language: 'Go', severity: 'warning', issues: 1, date: 'Yesterday', score: 85 },
    { id: '4', file: 'DataSyncJob.java', language: 'Java', severity: 'error', issues: 3, date: '3 days ago', score: 62 },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Dashboard Overview</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Monitor code statistics, security alerts, and run static analysis.</p>
        </div>
        <Link to="/dashboard/analyzer">
          <Button variant="primary" size="sm" className="shadow-sm">
            <Plus className="h-4 w-4" /> Start New Analysis
          </Button>
        </Link>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label} className="bg-white dark:bg-zinc-950">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{m.label}</span>
                <div className={`p-2 rounded-lg ${m.color}`}>
                  <m.icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{m.value}</span>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 leading-normal">{m.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reviews Panel */}
        <Card className="lg:col-span-2 bg-white dark:bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription>Visual history of recently analyzed code segments.</CardDescription>
            </div>
            <Link to="/dashboard/history" className="text-xs text-violet-500 hover:underline flex items-center gap-1">
              View history <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm divide-y divide-zinc-100 dark:divide-zinc-900">
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-900/10 text-zinc-500 dark:text-zinc-400 font-medium">
                    <th className="px-6 py-3">File / Module</th>
                    <th className="px-6 py-3">Language</th>
                    <th className="px-6 py-3">Scan Result</th>
                    <th className="px-6 py-3 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {recentReviews.map((rev) => (
                    <tr key={rev.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-zinc-900 dark:text-zinc-300 flex items-center gap-2">
                        <FileCode2 className="h-4.5 w-4.5 text-zinc-400 shrink-0" />
                        <span>{rev.file}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 font-mono">
                          {rev.language}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {rev.severity === 'error' ? (
                          <Badge variant="error">{rev.issues} bugs</Badge>
                        ) : rev.severity === 'warning' ? (
                          <Badge variant="warning">{rev.issues} issue</Badge>
                        ) : (
                          <Badge variant="success">Passed</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`font-semibold font-mono text-xs ${
                            rev.score >= 90
                              ? 'text-emerald-500 bg-emerald-500/10'
                              : rev.score >= 75
                              ? 'text-amber-500 bg-amber-500/10'
                              : 'text-red-500 bg-red-500/10'
                          } px-2 py-0.5 rounded-full`}
                        >
                          {rev.score}/100
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info / Quick Tips sidebar */}
        <Card className="bg-white dark:bg-zinc-950 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>CodeSage Academy</CardTitle>
            <CardDescription>Improve your code quality with short tips.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-violet-500 font-semibold uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4" />
                <span>Tip of the Day</span>
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Avoid nested Array.find()</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Calling `.find()` or `.filter()` inside loops causes nested search O(N²) execution scaling. Mapping keys to objects yields O(1) searches.
              </p>
            </div>

            <div className="border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-violet-500 font-semibold uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>API Usage</span>
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sync with local IDE coming</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                We are developing VS Code and Cursor integrations to support triggering CodeSage analysis straight from terminal buffers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
