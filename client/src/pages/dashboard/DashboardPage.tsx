import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  FileCode,
  Wrench,
  BookOpen,
  TrendingUp,
  Flame,
  Award,
  Terminal,
  ShieldAlert,
  ChevronRight,
  MessageSquare,
  GitCompare,
  Plus
} from 'lucide-react';

// Sub-components
import { StatCard } from '../../components/dashboard/StatCard';
import { ActionCard } from '../../components/dashboard/ActionCard';
import { InsightCard } from '../../components/dashboard/InsightCard';
import { LanguageCard } from '../../components/dashboard/LanguageCard';
import { AchievementCard } from '../../components/dashboard/AchievementCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { FilterDropdown } from '../../components/dashboard/FilterDropdown';
import { RecentAnalysisTable } from '../../components/dashboard/RecentAnalysisTable';
import type { AnalysisRow } from '../../components/dashboard/RecentAnalysisTable';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { Button } from '../../components/ui/Button';

// Mock initial data for analyses
const INITIAL_ANALYSES: AnalysisRow[] = [
  { id: '1', language: 'TypeScript', project: 'auth-handler.ts', qualityScore: 92, date: '2026-07-06', status: 'Completed' },
  { id: '2', language: 'Python', project: 'scripts/etl-worker.py', qualityScore: 84, date: '2026-07-05', status: 'Completed' },
  { id: '3', language: 'Go', project: 'api-gateway/main.go', qualityScore: 78, date: '2026-07-04', status: 'Running' },
  { id: '4', language: 'Rust', project: 'parser-engine/src/lib.rs', qualityScore: 96, date: '2026-07-02', status: 'Completed' },
  { id: '5', language: 'Java', project: 'services/BillingService.java', qualityScore: 68, date: '2026-07-01', status: 'Failed' },
  { id: '6', language: 'TypeScript', project: 'client/src/App.tsx', qualityScore: 89, date: '2026-06-30', status: 'Draft' },
];

export const DashboardPage: React.FC = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  
  // Table search & filter states
  const [analyses, setAnalyses] = useState<AnalysisRow[]>(INITIAL_ANALYSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!isLoaded || !user) {
    return (
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-16 bg-zinc-800 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-zinc-900 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-zinc-900 rounded-xl" />
          <div className="h-96 bg-zinc-900 rounded-xl" />
        </div>
      </div>
    );
  }

  // Greeting based on hours
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user.firstName || user.username || 'Developer';

  // Handler for row actions
  const handleDeleteRow = (id: string) => {
    setAnalyses(analyses.filter(item => item.id !== id));
  };

  const handleDuplicateRow = (row: AnalysisRow) => {
    const duplicated: AnalysisRow = {
      ...row,
      id: Math.random().toString(),
      project: `${row.project} (Copy)`,
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
    };
    setAnalyses([duplicated, ...analyses]);
  };

  const handleOpenRow = () => {
    navigate('/dashboard/analyzer');
  };

  // Filter analyses
  const filteredAnalyses = analyses.filter(item => {
    const matchesSearch = item.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = langFilter === 'all' || item.language === langFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesLang && matchesStatus;
  });

  // Languages data
  const languagesList = [
    { name: 'Python', ext: '.py' },
    { name: 'JavaScript', ext: '.js' },
    { name: 'TypeScript', ext: '.ts' },
    { name: 'Go', ext: '.go' },
    { name: 'Rust', ext: '.rs' },
    { name: 'Java', ext: '.java' },
    { name: 'C++', ext: '.cpp' },
    { name: 'C', ext: '.c' },
    { name: 'SQL', ext: '.sql' },
    { name: 'Swift', ext: '.swift' },
    { name: 'HTML', ext: '.html' },
    { name: 'CSS', ext: '.css' },
  ];

  return (
    <div className="space-y-8 font-sans pb-12">
      
      {/* 1. TOP WELCOME SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-2xl"
      >
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 m-0">
            {getGreeting()}, <span className="text-violet-500">{userName}</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Let's make your code better today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={user.imageUrl}
            alt={userName}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-violet-500/20"
          />
          <Button
            onClick={() => navigate('/dashboard/analyzer')}
            variant="primary"
            size="sm"
            className="gap-1.5 shadow-sm"
          >
            <Plus className="h-4 w-4" /> New Analysis
          </Button>
        </div>
      </motion.div>

      {/* 2. STATISTICS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Analyses"
          value="1,248"
          icon={FileCode}
          trend={{ value: '+18.2%', isPositive: true }}
          progress={75}
          delay={0.05}
        />
        <StatCard
          title="Avg Quality Score"
          value="87.4%"
          icon={Zap}
          trend={{ value: '+4.3%', isPositive: true }}
          progress={87}
          progressColor="bg-emerald-500"
          delay={0.1}
        />
        <StatCard
          title="Total Bugs Fixed"
          value="482"
          icon={Wrench}
          trend={{ value: '+12%', isPositive: true }}
          delay={0.15}
        />
        <StatCard
          title="Security Issues"
          value="12"
          icon={ShieldAlert}
          trend={{ value: '-30%', isPositive: true }}
          progress={20}
          progressColor="bg-red-500"
          delay={0.2}
        />
      </div>

      {/* Main grids split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (col-span-2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Weekly Performance Line Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <ChartCard />
          </motion.div>

          {/* Recent Analyses Table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Recent Analyses</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Inline filter inputs */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter project file..."
                  className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors max-w-[150px]"
                />
                <FilterDropdown
                  options={[
                    { value: 'all', label: 'All Languages' },
                    { value: 'TypeScript', label: 'TypeScript' },
                    { value: 'Python', label: 'Python' },
                    { value: 'Go', label: 'Go' },
                    { value: 'Rust', label: 'Rust' },
                    { value: 'Java', label: 'Java' },
                  ]}
                  value={langFilter}
                  onChange={(e) => setLangFilter(e.target.value)}
                />
                <FilterDropdown
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'Completed', label: 'Completed' },
                    { value: 'Running', label: 'Running' },
                    { value: 'Failed', label: 'Failed' },
                    { value: 'Draft', label: 'Draft' },
                  ]}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                />
              </div>
            </div>

            <RecentAnalysisTable
              data={filteredAnalyses}
              onOpen={handleOpenRow}
              onDelete={handleDeleteRow}
              onDuplicate={handleDuplicateRow}
            />
          </div>

          {/* Supported Languages */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Supported Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {languagesList.map((lang, idx) => (
                <LanguageCard
                  key={lang.name}
                  name={lang.name}
                  extension={lang.ext}
                  delay={idx * 0.02}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (col-span-1) */}
        <div className="space-y-8">
          
          {/* Quick Actions Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <ActionCard
                title="Explain Code"
                description="Get step-by-step plain English explanations of complex code snippets."
                icon={BookOpen}
                onClick={() => navigate('/dashboard/analyzer')}
                delay={0.05}
              />
              <ActionCard
                title="Security Scan"
                description="Scan config values, packages, and credentials for threat vulnerabilities."
                icon={Shield}
                onClick={() => navigate('/dashboard/analyzer')}
                delay={0.1}
              />
              <ActionCard
                title="Compare Code Versions"
                description="Compute logic diff metrics between two sets of file buffers."
                icon={GitCompare}
                onClick={() => navigate('/dashboard/analyzer')}
                delay={0.15}
              />
              <ActionCard
                title="Interactive Chat"
                description="Initiate deep design Q&As inside our model gateways."
                icon={MessageSquare}
                onClick={() => navigate('/dashboard/analyzer')}
                delay={0.2}
              />
            </div>
          </div>

          {/* Coding Insights */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">AI Coding Insights</h3>
            <div className="space-y-3">
              <InsightCard
                title="Error Handling Mismatch"
                description="You usually forget error catch boundaries inside async routing loops in TypeScript."
                icon={ShieldAlert}
                trend="Caution"
                trendType="negative"
                delay={0.05}
              />
              <PythonInsight />
              <InsightCard
                title="React Components Cleanliness"
                description="Vite build profiles indicate layout rendering paths are getting lighter and cleaner."
                icon={Zap}
                trend="Optimal"
                trendType="positive"
                delay={0.15}
              />
            </div>
          </div>

          {/* Badges Achievements */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Achievements</h3>
            <div className="grid grid-cols-1 gap-3">
              <AchievementCard
                title="First Analysis"
                description="Verify repository initialization settings."
                icon={Award}
                isLocked={false}
                delay={0.05}
              />
              <AchievementCard
                title="Bug Hunter"
                description="Find and resolve 50 warning log triggers."
                icon={Flame}
                isLocked={false}
                delay={0.1}
              />
              <AchievementCard
                title="Python Expert"
                description="Run 100 Python reviews in workspace."
                icon={Terminal}
                isLocked={true}
                delay={0.15}
              />
            </div>
          </div>

          {/* Continue Learning Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Continue Learning</h3>
            <div className="space-y-3.5">
              {[
                { title: 'Python Best Practices', dur: '15 mins', diff: 'Intermediate' },
                { title: 'React Performance Tuning', dur: '20 mins', diff: 'Advanced' },
                { title: 'System Design Patterns', dur: '45 mins', diff: 'Expert' }
              ].map((learn) => (
                <DashboardCard key={learn.title} hoverable className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 cursor-pointer">
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-1 leading-none">
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">{learn.title}</h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                        {learn.dur} · <span className="font-semibold text-violet-500">{learn.diff}</span>
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />
                  </div>
                </DashboardCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Inline helper component for specific SVG logic to keep code clean and compilable
const PythonInsight: React.FC = () => {
  return (
    <InsightCard
      title="Python Quality Improved"
      description="Quality scores increased 12% across your local scripts this week."
      icon={TrendingUp}
      trend="+12%"
      trendType="positive"
      delay={0.1}
    />
  );
};
