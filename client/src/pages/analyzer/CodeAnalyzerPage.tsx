import React, { useState } from 'react';
import {
  Code2,
  Play,
  CheckCircle,
  AlertTriangle,
  Zap,
  Bookmark,
  Sparkles,
  FileCode,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';

interface CodeTemplate {
  [key: string]: {
    code: string;
    language: string;
    analysis: {
      score: number;
      issuesCount: number;
      securityCount: number;
      optimizationsCount: number;
      bugs: { line: number; type: 'error' | 'warning'; message: string; suggestion: string }[];
      performance: { type: string; message: string; before: string; after: string }[];
      refactored: string;
    };
  };
}

const templates: CodeTemplate = {
  typescript: {
    language: 'TypeScript',
    code: `interface User {\n  id: string;\n  name: string;\n  profile?: {\n    email: string;\n    phone?: string;\n  };\n}\n\nfunction getContactEmail(users: User[], searchId: string): string {\n  // Bug 1: Nested array search O(N) inside query function\n  const user = users.find(u => u.id === searchId);\n  \n  // Bug 2: Potential null pointer crash (profile is optional)\n  return user.profile.email;\n}`,
    analysis: {
      score: 68,
      issuesCount: 2,
      securityCount: 1,
      optimizationsCount: 1,
      bugs: [
        { line: 11, type: 'warning', message: 'Linear search O(N) loop inside loop execution.', suggestion: 'Map array objects to record mapping keys for O(1) checks.' },
        { line: 14, type: 'error', message: 'Object is possibly undefined context.', suggestion: 'Use optional chaining operator: user.profile?.email or throw custom exception.' }
      ],
      performance: [
        { type: 'Optimization', message: 'Avoid search operations in arrays.', before: 'users.find(u => u.id === searchId)', after: 'userMap.get(searchId)' }
      ],
      refactored: `interface User {\n  id: string;\n  name: string;\n  profile?: {\n    email: string;\n    phone?: string;\n  };\n}\n\nfunction getContactEmail(users: User[], searchId: string): string {\n  // Optimized lookup map\n  const userMap = new Map(users.map(u => [u.id, u]));\n  const user = userMap.get(searchId);\n  \n  if (!user || !user.profile) {\n    throw new Error("User contact profile not found");\n  }\n  \n  return user.profile.email;\n}`
    }
  },
  python: {
    language: 'Python',
    code: `def process_records(items):\n    # Warning: unsafe mutation or duplicate list allocations\n    processed = []\n    for item in items:\n        # Warning: linear search O(N) lookup checks\n        if item["id"] not in [x["id"] for x in processed]:\n            processed.append(item)\n    return processed`,
    analysis: {
      score: 72,
      issuesCount: 2,
      securityCount: 0,
      optimizationsCount: 2,
      bugs: [
        { line: 3, type: 'warning', message: 'Re-allocating lists inside execution loop.', suggestion: 'Declare map variables globally outside lookup structures.' },
        { line: 6, type: 'warning', message: 'Inlined list comprehension creates O(N²) search scales.', suggestion: 'Check lookups using unique hash sets instead of lists.' }
      ],
      performance: [
        { type: 'Efficiency', message: 'Convert search comparison items to sets.', before: 'item["id"] not in [x["id"] for x in processed]', after: 'item_id not in seen_ids' }
      ],
      refactored: `def process_records(items):\n    processed = []\n    seen_ids = set()\n    for item in items:\n        item_id = item["id"]\n        if item_id not in seen_ids:\n            processed.append(item)\n            seen_ids.add(item_id)\n    return processed`
    }
  },
  go: {
    language: 'Go',
    code: `package main\n\nimport "sync"\n\ntype Counter struct {\n\tval int\n}\n\n// Warning: race condition access without lock\nfunc (c *Counter) Increment() {\n\tc.val++\n}`,
    analysis: {
      score: 55,
      issuesCount: 1,
      securityCount: 1,
      optimizationsCount: 0,
      bugs: [
        { line: 10, type: 'error', message: 'Data race threat inside concurrent routines.', suggestion: 'Use sync.Mutex blocks or sync/atomic operations for thread-safe access.' }
      ],
      performance: [
        { type: 'Concurrency', message: 'Coordinate state mutations using channels or locks.', before: 'c.val++', after: 'atomic.AddInt64(&c.val, 1)' }
      ],
      refactored: `package main\n\nimport "sync"\n\ntype Counter struct {\n\tmu  sync.Mutex\n\tval int\n}\n\nfunc (c *Counter) Increment() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.val++\n}`
    }
  }
};

export const CodeAnalyzerPage: React.FC = () => {
  const [lang, setLang] = useState<string>('typescript');
  const [code, setCode] = useState<string>(templates.typescript.code);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<typeof templates.typescript.analysis | null>(null);
  const [activeTab, setActiveTab] = useState<'bugs' | 'performance' | 'refactor'>('bugs');
  const [isCopied, setIsCopied] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setLang(selected);
    setCode(templates[selected]?.code || '// Select template or paste your code here...');
    setReport(null);
  };

  const handleRunReview = () => {
    setIsAnalyzing(true);
    setReport(null);

    // Simulate 1.5s analysis pipeline
    setTimeout(() => {
      setIsAnalyzing(false);
      setReport(templates[lang]?.analysis || templates.typescript.analysis);
    }, 1500);
  };

  const handleCopyCode = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">AI Code Analyzer</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Audit your functions for safety hazards, logic issues, and performance leaks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Console */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white dark:bg-zinc-950 overflow-hidden">
            {/* Editor Action Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3">
              <div className="flex items-center gap-2">
                <FileCode className="h-4.5 w-4.5 text-zinc-500" />
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Review Sandbox</span>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={lang}
                  onChange={handleLanguageChange}
                  className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-300 focus:outline-none"
                >
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="go">Go Lang</option>
                </select>

                <Button
                  onClick={handleRunReview}
                  disabled={isAnalyzing}
                  variant="primary"
                  size="sm"
                  className="shadow-sm gap-1.5 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Run Review
                </Button>
              </div>
            </div>

            {/* Editor Input Area */}
            <div className="relative flex bg-white dark:bg-zinc-950 min-h-[360px] font-mono text-sm leading-normal">
              {/* Fake Gutter Line Numbers */}
              <div className="w-10 border-r border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 text-zinc-400/70 select-none py-4 text-right pr-3 space-y-1">
                {Array.from({ length: code.split('\n').length || 1 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Textarea */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="flex-1 resize-none bg-transparent p-4 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none min-h-[360px] font-mono leading-relaxed"
                placeholder="// Paste your code snippet here to start analyzer review..."
              />
            </div>
          </Card>
        </div>

        {/* Diagnostic Panel Sidebar */}
        <div className="space-y-4">
          <Card className="bg-white dark:bg-zinc-950 h-full flex flex-col justify-between">
            <CardHeader className="pb-4">
              <CardTitle>Diagnostics Summary</CardTitle>
              <CardDescription>AI audit review yields status metrics here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-6 border-t border-zinc-100 dark:border-zinc-900/50">
              {isAnalyzing ? (
                <div className="text-center space-y-4">
                  <Spinner size="lg" />
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">Running AST logic scans...</p>
                </div>
              ) : report ? (
                <div className="w-full space-y-6">
                  {/* Rating Header */}
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900/50 pb-4">
                    <div>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">Score Rating</span>
                      <p className="text-3xl font-extrabold text-zinc-950 dark:text-white font-mono mt-0.5">{report.score}<span className="text-sm font-medium text-zinc-400">/100</span></p>
                    </div>
                    <div>
                      <Badge variant={report.score >= 90 ? 'success' : report.score >= 70 ? 'warning' : 'error'}>
                        {report.score >= 90 ? 'Excellent' : report.score >= 70 ? 'Warning' : 'Critical'}
                      </Badge>
                    </div>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Errors Found</span>
                      <p className="text-lg font-bold text-red-500 font-mono mt-0.5">{report.issuesCount}</p>
                    </div>
                    <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Optimizations</span>
                      <p className="text-lg font-bold text-violet-500 font-mono mt-0.5">{report.optimizationsCount}</p>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal flex items-start gap-1.5">
                    <Sparkles className="h-4.5 w-4.5 text-violet-500 shrink-0" />
                    <span>Analysis complete. We detected logical errors and created refactoring templates. Select the tabs on the left report detail box to apply.</span>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">No Scan Initiated</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-normal">
                    Select a script language template, modify instructions, and click &ldquo;Run Review&rdquo; to test.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reports Analysis Tab Area */}
      {report && !isAnalyzing && (
        <Card className="bg-white dark:bg-zinc-950">
          <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 flex items-center justify-between px-6 py-2.5">
            {/* Tabs */}
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('bugs')}
                className={`py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'bugs'
                    ? 'border-violet-500 text-zinc-950 dark:text-zinc-50'
                    : 'border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100'
                }`}
              >
                Bugs & Warnings ({report.bugs.length})
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'performance'
                    ? 'border-violet-500 text-zinc-950 dark:text-zinc-50'
                    : 'border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100'
                }`}
              >
                Efficiency Audits ({report.performance.length})
              </button>
              <button
                onClick={() => setActiveTab('refactor')}
                className={`py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'refactor'
                    ? 'border-violet-500 text-zinc-950 dark:text-zinc-50'
                    : 'border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100'
                }`}
              >
                Refactored View
              </button>
            </div>

            <Button variant="ghost" size="sm" className="gap-1.5 cursor-pointer">
              <Bookmark className="h-3.5 w-3.5" /> Save Report
            </Button>
          </div>

          <CardContent className="p-6">
            {/* Bugs Tab */}
            {activeTab === 'bugs' && (
              <div className="space-y-4">
                {report.bugs.map((b, idx) => (
                  <div key={idx} className="flex gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10">
                    <div className={`p-2 rounded-lg shrink-0 h-fit ${b.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                          Line {b.line}
                        </span>
                        <Badge variant={b.type === 'error' ? 'error' : 'warning'}>{b.type === 'error' ? 'Error' : 'Warning'}</Badge>
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">{b.message}</h4>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">{b.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-4">
                {report.performance.map((p, idx) => (
                  <div key={idx} className="flex gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/10">
                    <div className="p-2 bg-sky-500/10 text-sky-500 rounded-lg shrink-0 h-fit">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="info">{p.type}</Badge>
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{p.message}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 font-mono text-xs">
                        <div className="p-3 border border-red-500/10 dark:border-red-950/20 bg-red-500/5 rounded-lg">
                          <p className="text-[10px] text-red-500 uppercase tracking-widest font-semibold mb-1">Before</p>
                          <code className="text-red-600 dark:text-red-400">{p.before}</code>
                        </div>
                        <div className="p-3 border border-emerald-500/10 dark:border-emerald-950/20 bg-emerald-500/5 rounded-lg">
                          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold mb-1">After (Refactored)</p>
                          <code className="text-emerald-600 dark:text-emerald-400">{p.after}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Refactor Tab */}
            {activeTab === 'refactor' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Complete optimization replacement package available.</span>
                  </div>
                  <Button
                    onClick={() => handleCopyCode(report.refactored)}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 cursor-pointer text-xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Code
                      </>
                    )}
                  </Button>
                </div>
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono overflow-x-auto text-zinc-700 dark:text-zinc-300 leading-relaxed min-h-[160px]">
                  <pre>{report.refactored}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
