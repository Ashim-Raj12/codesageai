import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Code2,
  Sparkles
} from 'lucide-react';

// Reusable components
import { Toolbar } from '../../components/analyzer/Toolbar';
import { RecentFiles } from '../../components/analyzer/RecentFiles';
import { UploadZone } from '../../components/analyzer/UploadZone';
import { CodeEditor } from '../../components/analyzer/CodeEditor';
import { AnalysisTabs } from '../../components/analyzer/AnalysisTabs';
import type { DiagnosticTabId } from '../../components/analyzer/AnalysisTabs';
import { IssueCard } from '../../components/analyzer/IssueCard';
import type { BugIssue } from '../../components/analyzer/IssueCard';
import { SecurityCard } from '../../components/analyzer/SecurityCard';
import type { SecurityVulnerability } from '../../components/analyzer/SecurityCard';
import { SuggestionCard } from '../../components/analyzer/SuggestionCard';
import type { CodeSuggestion } from '../../components/analyzer/SuggestionCard';
import { QualityGauge } from '../../components/analyzer/QualityGauge';
import { ComplexityCard } from '../../components/analyzer/ComplexityCard';
import { ExportMenu } from '../../components/analyzer/ExportMenu';
import { MiniMetrics } from '../../components/analyzer/MiniMetrics';
import { AIChat } from '../../components/analyzer/AIChat';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';

// Detailed structure of an AI code review audit report
interface AnalysisReport {
  score: number;
  qualityGrade: string;
  summary: string;
  explanation: string;
  strengths: string[];
  weaknesses: string[];
  reviewTime: number;
  linesOfCode: number;
  bugs: BugIssue[];
  vulnerabilities: SecurityVulnerability[];
  performanceScore: number;
  timeComplexity: string;
  spaceComplexity: string;
  optimizations: string[];
  qualityMetrics: {
    maintainability: number;
    readability: number;
    naming: number;
    formatting: number;
    testCoverage: number;
  };
  complexity: {
    cyclomatic: number;
    nestedLoops: number;
    nestedConditions: number;
    largeFunctions: number;
    duplicatedLines: number;
  };
  suggestions: CodeSuggestion[];
  optimizedCode: string;
  documentation: {
    description: string;
    params: { name: string; type: string; desc: string }[];
    returns: { type: string; desc: string };
    example: string;
  };
  unitTests: string;
}

// Keyed database of detailed analysis templates
const MOCK_REPORTS: Record<string, { code: string; report: AnalysisReport }> = {
  typescript: {
    code: `interface User {\n  id: string;\n  name: string;\n  profile?: {\n    email: string;\n    phone?: string;\n  };\n}\n\nfunction getContactEmail(users: User[], searchId: string): string {\n  // Bug 1: Nested array search O(N) inside query function\n  const user = users.find(u => u.id === searchId);\n  \n  // Bug 2: Potential null pointer crash (profile is optional)\n  return user.profile.email;\n}`,
    report: {
      score: 68,
      qualityGrade: 'C',
      summary: 'Critical null-pointer threat and O(N) array loops detected inside lookup utility.',
      explanation: 'The code attempts to search a user record inside a linear array, leading to O(N) lookup complexity. Additionally, it reads properties from an optional nested profile object without verifying if the object or the parent record exists.',
      strengths: ['Strict TypeScript interfaces defined for structural shape declarations.', 'Clean, single-purpose function declaration.'],
      weaknesses: ['Null-pointer crash hazard on nested profile checks.', 'Inefficient lookup lookup scales.'],
      reviewTime: 8,
      linesOfCode: 15,
      bugs: [
        { id: 'b1', severity: 'High', title: 'Linear lookup inside function', description: 'Using Array.find results in linear search times. Scaling array lookups inside loops degrades performance.', line: 11, fix: 'const userMap = new Map(users.map(u => [u.id, u]));\nreturn userMap.get(searchId);' },
        { id: 'b2', severity: 'Critical', title: 'Null-pointer property read reference', description: 'The profile attribute is declared as optional. Reading user.profile.email directly will throw a type error if profile is missing.', line: 14, fix: 'return user?.profile?.email || "";' }
      ],
      vulnerabilities: [
        { id: 'v1', type: 'Unsafe Property Reference', severity: 'High', description: 'Reading undefined attributes inside high-availability pipelines.', impact: 'Uncaught JS exceptions crashing server runtime execution loops.', fix: 'Verify nested keys existence using optional chaining properties (?.) or throw structured validation limits.' }
      ],
      performanceScore: 70,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      optimizations: ['Map array elements to map key bindings to execute O(1) lookups.', 'Extract return evaluations to conditional exception blocks.'],
      qualityMetrics: { maintainability: 82, readability: 88, naming: 90, formatting: 95, testCoverage: 0 },
      complexity: { cyclomatic: 4, nestedLoops: 0, nestedConditions: 1, largeFunctions: 0, duplicatedLines: 0 },
      suggestions: [
        { id: 's1', title: 'Convert to lookup map', description: 'For frequent queries, construct a Hash Map dictionary database key index for O(1) checks.', before: 'users.find(u => u.id === searchId)', after: 'userMap.get(searchId)' },
        { id: 's2', title: 'Use early return pattern', description: 'Return fallback strings or throw explicit errors early to keep codes decoupled.', before: 'return user.profile.email;', after: 'if (!user || !user.profile) return "";' }
      ],
      optimizedCode: `interface User {\n  id: string;\n  name: string;\n  profile?: {\n    email: string;\n    phone?: string;\n  };\n}\n\nfunction getContactEmail(users: User[], searchId: string): string {\n  const userMap = new Map(users.map(u => [u.id, u]));\n  const user = userMap.get(searchId);\n  \n  if (!user || !user.profile) {\n    return "";\n  }\n  \n  return user.profile.email;\n}`,
      documentation: {
        description: 'Queries user list records and extracts the target profile email reference.',
        params: [
          { name: 'users', type: 'User[]', desc: 'Array collection of structural user record templates.' },
          { name: 'searchId', type: 'string', desc: 'Target primary key string identifier value.' }
        ],
        returns: { type: 'string', desc: 'The verified email string address.' },
        example: 'getContactEmail(userList, "user_091");'
      },
      unitTests: `import { getContactEmail } from "./auth-handler";\n\ndescribe("getContactEmail", () => {\n  const mockUsers = [\n    { id: "1", name: "Alex", profile: { email: "alex@test.com" } }\n  ];\n\n  it("should return the email if user exists", () => {\n    expect(getContactEmail(mockUsers, "1")).toBe("alex@test.com");\n  });\n\n  it("should return empty string if user does not exist", () => {\n    expect(getContactEmail(mockUsers, "2")).toBe("");\n  });\n});`
    }
  },
  python: {
    code: `def process_records(items):\n    # Warning: unsafe mutation or duplicate list allocations\n    processed = []\n    for item in items:\n        # Warning: linear search O(N) lookup checks\n        if item["id"] not in [x["id"] for x in processed]:\n            processed.append(item)\n    return processed`,
    report: {
      score: 74,
      qualityGrade: 'B',
      summary: 'Quadratic O(N^2) list search loop detected inside deduplication process.',
      explanation: 'The function traverses input items in a loop, running a nested list comprehension check on every index iteration. This generates O(N^2) performance scaling which degrades server performance for larger inputs.',
      strengths: ['Minimal syntax logic structure.', 'Clear variables naming profiles.'],
      weaknesses: ['Quadratic O(N^2) search overhead.', 'Inefficient duplicate checks.'],
      reviewTime: 5,
      linesOfCode: 7,
      bugs: [
        { id: 'py_b1', severity: 'High', title: 'Nested quadratic list search loop', description: 'Checking membership using inline list allocations triggers list iteration on every loop step.', line: 5, fix: 'seen = set()\nif item["id"] not in seen:\n    seen.add(item["id"])' }
      ],
      vulnerabilities: [
        { id: 'py_v1', type: 'Denial of Service (DoS) Risk', severity: 'Medium', description: 'Inefficient computational loops exposed to user-provided payloads can block server process threads.', impact: 'Server timeouts and excessive CPU usage logs.', fix: 'Optimize search loops to linear O(N) by mapping records to unique hash tables.' }
      ],
      performanceScore: 50,
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)',
      optimizations: ['Employ unique hash sets to manage duplicate lookup states.', 'Separate loop comprehension code blocks.'],
      qualityMetrics: { maintainability: 85, readability: 90, naming: 85, formatting: 92, testCoverage: 40 },
      complexity: { cyclomatic: 3, nestedLoops: 1, nestedConditions: 1, largeFunctions: 0, duplicatedLines: 0 },
      suggestions: [
        { id: 'py_s1', title: 'Convert search list to set', description: 'Set lookups are optimized as O(1) hash structures. List lookups require O(N) items traversals.', before: 'item["id"] not in [x["id"] for x in processed]', after: 'item_id not in seen_ids' }
      ],
      optimizedCode: `def process_records(items):\n    processed = []\n    seen_ids = set()\n    for item in items:\n        item_id = item["id"]\n        if item_id not in seen_ids:\n            processed.append(item)\n            seen_ids.add(item_id)\n    return processed`,
      documentation: {
        description: 'Deduplicates record lists by removing entries sharing redundant identifier keys.',
        params: [
          { name: 'items', type: 'list', desc: 'List collection containing dictionaries with ID keys.' }
        ],
        returns: { type: 'list', desc: 'Deduplicated unique entries collection.' },
        example: 'process_records([{"id": 1}, {"id": 1}])'
      },
      unitTests: `import unittest\nfrom record_dedup import process_records\n\nclass TestProcessRecords(unittest.TestCase):\n    def test_dedup(self):\n        items = [{"id": 1, "val": "a"}, {"id": 1, "val": "b"}]\n        self.assertEqual(len(process_records(items)), 1)\n\nif __name__ == "__main__":\n    unittest.main()`
    }
  },
  go: {
    code: `package main\n\nimport "sync"\n\ntype Counter struct {\n\tval int\n}\n\n// Warning: race condition access without lock\nfunc (c *Counter) Increment() {\n\tc.val++\n}`,
    report: {
      score: 55,
      qualityGrade: 'D',
      summary: 'Data race threat inside concurrent routines detected.',
      explanation: 'The struct increment method changes the state value without acquiring resource locks or using atomic actions. When accessed concurrently by multiple goroutines, this triggers memory data races and undefined state mutations.',
      strengths: ['Compact struct declarations.'],
      weaknesses: ['Unsafe concurrent execution paths.'],
      reviewTime: 12,
      linesOfCode: 11,
      bugs: [
        { id: 'go_b1', severity: 'Critical', title: 'Data race threat on structure counter', description: 'Incrementing counter variables directly inside multi-threaded contexts triggers race conditions.', line: 11, fix: 'c.mu.Lock()\ndefer c.mu.Unlock()\nc.val++' }
      ],
      vulnerabilities: [
        { id: 'go_v1', type: 'Concurrency Race Hazard', severity: 'Critical', description: 'Shared memory mutation without mutex locking mechanisms.', impact: 'Memory corruption, memory leakages, or server thread block exceptions.', fix: 'Lock data actions using sync.Mutex blocks or enforce atomically safe packages.' }
      ],
      performanceScore: 85,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      optimizations: ['Use atomic packages (atomic.AddInt64) for lockless operations.', 'Inject mutex locks.'],
      qualityMetrics: { maintainability: 60, readability: 78, naming: 85, formatting: 90, testCoverage: 20 },
      complexity: { cyclomatic: 2, nestedLoops: 0, nestedConditions: 0, largeFunctions: 0, duplicatedLines: 0 },
      suggestions: [
        { id: 'go_s1', title: 'Add sync.Mutex locking', description: 'Enforce synchronous access to struct metrics using mutual exclusion locks.', before: 'c.val++', after: 'c.mu.Lock()\ndefer c.mu.Unlock()\nc.val++' }
      ],
      optimizedCode: `package main\n\nimport "sync"\n\ntype Counter struct {\n\tmu  sync.Mutex\n\tval int\n}\n\nfunc (c *Counter) Increment() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.val++\n}`,
      documentation: {
        description: 'Thread-safe counter value increments.',
        params: [],
        returns: { type: 'void', desc: 'Increments counter instance state directly.' },
        example: 'counter.Increment()'
      },
      unitTests: `package main\n\nimport (\n\t"sync"\n\t"testing"\n)\n\nfunc TestCounterConcurrency(t *testing.T) {\n\tc := Counter{}\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 100; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tc.Increment()\n\t\t}()\n\t}\n\twg.Wait()\n\tif c.val != 100 {\n\t\tt.Errorf("Expected 100, got %d", c.val)\n\t}\n}`
    }
  }
};

export const CodeAnalyzerPage: React.FC = () => {

  // Workspace configuration states
  const [activeFileId, setActiveFileId] = useState('typescript');
  const [code, setCode] = useState(MOCK_REPORTS.typescript.code);
  const [language, setLanguage] = useState('typescript');
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // AI Review execution pipeline states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<DiagnosticTabId>('overview');
  const [activeReport, setActiveReport] = useState<AnalysisReport | null>(null);

  // Select file from explorer template
  const handleSelectFile = (fileId: string) => {
    setActiveFileId(fileId);
    const template = MOCK_REPORTS[fileId];
    if (template) {
      setCode(template.code);
      setLanguage(fileId);
      setActiveReport(null);
    }
  };

  const handleClear = () => {
    setCode('');
    setActiveReport(null);
  };

  const handleUpload = () => {
    setShowUpload(true);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (err) {
      console.warn('Clipboard read permission blocked.');
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `codesage-sandbox.${language === 'python' ? 'py' : 'ts'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setActiveReport(null);

    // Simulate compile logic runs (1.5 seconds)
    setTimeout(() => {
      setIsAnalyzing(false);
      const matched = MOCK_REPORTS[activeFileId]?.report || MOCK_REPORTS.typescript.report;
      setActiveReport(matched);
      setActiveTab('overview');
    }, 1500);
  };

  const handleFileLoaded = (fileContent: string, _name: string, lang: string) => {
    setCode(fileContent);
    setLanguage(lang);
    setActiveFileId(lang);
    setActiveReport(null);
  };

  const handleExport = (format: 'pdf' | 'md' | 'json' | 'print') => {
    alert(`Exporting review report as format: ${format.toUpperCase()}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  // Compile totals counts
  const tabCounts: Record<string, number> = activeReport ? {
    bugs: activeReport.bugs.length,
    security: activeReport.vulnerabilities.length,
    suggestions: activeReport.suggestions.length,
  } : {};

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 bg-zinc-950 p-6 overflow-y-auto w-screen h-screen' : 'space-y-6 font-sans pb-12'}>
      {/* Header bar */}
      {!isFullscreen && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Code Review Workspace</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              IDE workspace environment featuring live code inputs, AST scans, and tabbed optimization reports.
            </p>
          </div>
          {activeReport && (
            <ExportMenu onExport={handleExport} onShare={handleShare} />
          )}
        </div>
      )}

      {/* Top Toolbar panel */}
      <Toolbar
        language={language}
        onLanguageChange={(l) => {
          setLanguage(l);
          setActiveReport(null);
        }}
        editorTheme={editorTheme}
        onThemeChange={setEditorTheme}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        wordWrap={wordWrap}
        onWordWrapChange={setWordWrap}
        onUpload={handleUpload}
        onPaste={handlePaste}
        onClear={handleClear}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />

      {/* Flex container split view layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Collapsible Left explorer panels */}
        <RecentFiles
          activeFileId={activeFileId}
          onSelectFile={handleSelectFile}
        />

        {/* Monaco Editor Panel */}
        <div className="flex-1 flex flex-col border border-zinc-200 dark:border-zinc-900 rounded-xl overflow-hidden shadow-xs min-h-[480px]">
          <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/40 px-4 py-2">
            <span className="text-xs font-mono font-semibold text-zinc-500">
              codesage-sandbox.{language === 'python' ? 'py' : 'ts'}
            </span>
            <Badge variant="info" className="text-[9px] font-mono leading-none py-0.5">
              Edit Mode
            </Badge>
          </div>
          <div className="flex-1 min-h-[420px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              theme={editorTheme}
              fontSize={fontSize}
              wordWrap={wordWrap}
            />
          </div>
        </div>

        {/* Dynamic Diagnostics side panels */}
        {activeReport ? (
          <MiniMetrics
            securityScore={activeReport.score}
            qualityScore={activeReport.score + 4}
            performanceScore={activeReport.performanceScore}
            complexityScore={activeReport.complexity.cyclomatic * 10}
            reviewTimeMinutes={activeReport.reviewTime}
          />
        ) : (
          <div className="w-56 shrink-0 border border-dashed border-zinc-200 dark:border-zinc-900 rounded-xl flex items-center justify-center p-4 bg-zinc-50/10 dark:bg-zinc-900/5 select-none text-center">
            <span className="text-xs text-zinc-400 font-medium">Metrics will populate once code is analyzed</span>
          </div>
        )}
      </div>

      {/* Workspace Diagnostics tab details */}
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-12 border border-zinc-200 dark:border-zinc-900 rounded-xl bg-white dark:bg-zinc-950 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]"
          >
            <Spinner size="lg" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 animate-pulse">Running AST review scans...</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-normal">
                Compiling code nodes to check for logical hazards, duplicate cycles, and hardcoded security leaks.
              </p>
            </div>
          </motion.div>
        ) : activeReport ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-zinc-200 dark:border-zinc-900 rounded-xl bg-white dark:bg-zinc-950 overflow-hidden shadow-xs"
          >
            {/* Tab links */}
            <AnalysisTabs
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              counts={tabCounts}
            />

            <div className="p-6">
              {/* 1. Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">AI Executive Summary</span>
                      <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                        {activeReport.summary}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Diagnostic Analysis</span>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {activeReport.explanation}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Code Strengths</span>
                        <ul className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 list-disc pl-4">
                          {activeReport.strengths.map((str, idx) => (
                            <li key={idx}>{str}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Code Weaknesses</span>
                        <ul className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 list-disc pl-4">
                          {activeReport.weaknesses.map((weak, idx) => (
                            <li key={idx}>{weak}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-900/60 pt-6 lg:pt-0 lg:pl-8 flex flex-col items-center justify-center">
                    <QualityGauge score={activeReport.score} />
                  </div>
                </div>
              )}

              {/* 2. Bugs Tab */}
              {activeTab === 'bugs' && (
                <div className="space-y-4">
                  {activeReport.bugs.map((b) => (
                    <IssueCard key={b.id} issue={b} />
                  ))}
                </div>
              )}

              {/* 3. Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-4">
                  {activeReport.vulnerabilities.map((v) => (
                    <SecurityCard key={v.id} vulnerability={v} />
                  ))}
                </div>
              )}

              {/* 4. Performance Tab */}
              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 border border-zinc-250 dark:border-zinc-900 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">Time Complexity</span>
                      <p className="text-xl font-bold font-mono text-violet-500 mt-1">{activeReport.timeComplexity}</p>
                    </div>
                    <div className="p-4 border border-zinc-250 dark:border-zinc-900 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">Space Complexity</span>
                      <p className="text-xl font-bold font-mono text-violet-500 mt-1">{activeReport.spaceComplexity}</p>
                    </div>
                    <div className="p-4 border border-zinc-250 dark:border-zinc-900 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">Performance Score</span>
                      <p className="text-xl font-bold font-mono text-emerald-500 mt-1">{activeReport.performanceScore}%</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Optimization Instructions</span>
                    <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 list-disc pl-4">
                      {activeReport.optimizations.map((opt, idx) => (
                        <li key={idx}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 5. Code Quality Tab */}
              {activeTab === 'quality' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: 'Maintainability', score: activeReport.qualityMetrics.maintainability },
                      { label: 'Readability', score: activeReport.qualityMetrics.readability },
                      { label: 'Naming Convention', score: activeReport.qualityMetrics.naming },
                      { label: 'Formatting', score: activeReport.qualityMetrics.formatting },
                      { label: 'Test Coverage', score: activeReport.qualityMetrics.testCoverage }
                    ].map((metric) => (
                      <div key={metric.label} className="p-4 border border-zinc-250 dark:border-zinc-900 rounded-xl text-center space-y-2 bg-white dark:bg-zinc-950">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">{metric.label}</span>
                        <p className="text-xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">{metric.score}%</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-900 text-xs text-zinc-500 leading-relaxed font-sans">
                    Code Quality scores check naming bounds, function lengths, spacing conventions, and presence of dead modules.
                  </div>
                </div>
              )}

              {/* 6. Complexity Tab */}
              {activeTab === 'complexity' && (
                <ComplexityCard
                  cyclomatic={activeReport.complexity.cyclomatic}
                  nestedLoops={activeReport.complexity.nestedLoops}
                  nestedConditions={activeReport.complexity.nestedConditions}
                  largeFunctions={activeReport.complexity.largeFunctions}
                  duplicatedLines={activeReport.complexity.duplicatedLines}
                />
              )}

              {/* 7. Suggestions Tab */}
              {activeTab === 'suggestions' && (
                <div className="space-y-4">
                  {activeReport.suggestions.map((s) => (
                    <SuggestionCard key={s.id} suggestion={s} />
                  ))}
                </div>
              )}

              {/* 8. Optimized Code Tab */}
              {activeTab === 'optimized' && (
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Constant lookup HashMap optimization available.
                    </span>
                    <Button
                      onClick={() => navigator.clipboard.writeText(activeReport.optimizedCode)}
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1.5"
                    >
                      Copy Code
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs leading-normal">
                    <div className="p-4 rounded-xl border border-red-500/10 dark:border-red-950/20 bg-red-500/[0.01] overflow-x-auto text-zinc-700 dark:text-zinc-300">
                      <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold block pb-2 border-b border-red-500/10 mb-3">Original Code</span>
                      <pre>{code}</pre>
                    </div>
                    <div className="p-4 rounded-xl border border-emerald-500/10 dark:border-emerald-950/20 bg-emerald-500/[0.01] overflow-x-auto text-zinc-700 dark:text-zinc-300">
                      <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold block pb-2 border-b border-emerald-500/10 mb-3">Optimized Code</span>
                      <pre>{activeReport.optimizedCode}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. Refactored Code Tab */}
              {activeTab === 'refactored' && (
                <div className="space-y-4 font-sans">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    <Sparkles className="h-4 w-4 text-violet-500" />
                    <span>Visual Refactor Tree Comparisons</span>
                  </div>
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-700 dark:text-zinc-300 min-h-[160px]">
                    <pre>{activeReport.optimizedCode}</pre>
                  </div>
                </div>
              )}

              {/* 10. Documentation Tab */}
              {activeTab === 'documentation' && (
                <div className="space-y-5 font-sans">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Method Description</span>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">{activeReport.documentation.description}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Parameters</span>
                    <div className="space-y-2 border border-zinc-200 dark:border-zinc-900 rounded-lg p-3 bg-zinc-50/25 dark:bg-zinc-900/5 text-xs">
                      {activeReport.documentation.params.map((p) => (
                        <div key={p.name} className="flex gap-2">
                          <span className="font-mono font-bold text-violet-500">{p.name}</span>
                          <span className="font-mono text-zinc-400">({p.type})</span>
                          <span className="text-zinc-500 dark:text-zinc-400 font-sans">— {p.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Returns</span>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono font-bold">
                      {activeReport.documentation.returns.type} <span className="font-normal font-sans text-zinc-500">— {activeReport.documentation.returns.desc}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* 11. Unit Tests Tab */}
              {activeTab === 'tests' && (
                <div className="space-y-4 font-sans">
                  <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <span className="text-xs text-zinc-500">Auto-generated test suite for Jest / unittest modules.</span>
                    <Button
                      onClick={() => navigator.clipboard.writeText(activeReport.unitTests)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Copy Tests
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-700 dark:text-zinc-350 min-h-[180px]">
                    <pre>{activeReport.unitTests}</pre>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="p-12 border border-zinc-250 dark:border-zinc-900/60 rounded-xl bg-white dark:bg-zinc-950 flex flex-col items-center justify-center text-center gap-3 min-h-[300px] select-none">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 text-zinc-400 dark:text-zinc-500">
              <Code2 className="h-5.5 w-5.5" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Workspace Idle</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-normal">
              No analysis report active. Choose a pinned file template or paste your own script, then click &ldquo;Analyze Code&rdquo; to review diagnostic scores.
            </p>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Assistant Chat Panel */}
      <AIChat
        languageContext={language}
      />

      {/* Upload Zone Modals */}
      {showUpload && (
        <UploadZone
          onFileLoaded={handleFileLoaded}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
};
