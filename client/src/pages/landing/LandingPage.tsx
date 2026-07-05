import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Terminal,
  ShieldAlert,
  Zap,
  CheckCircle,
  Plus,
  Minus,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

// FAQ Item Component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 py-4 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-medium text-zinc-900 dark:text-zinc-50 cursor-pointer py-2 focus:outline-none"
      >
        <span className="text-base sm:text-lg">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-violet-500 shrink-0 ml-4" />
        ) : (
          <Plus className="h-5 w-5 text-zinc-400 shrink-0 ml-4" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  // Animation constants for scroll effects
  const scrollReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const languages = [
    { name: 'TypeScript', ext: '.ts', color: 'text-blue-400' },
    { name: 'JavaScript', ext: '.js', color: 'text-yellow-400' },
    { name: 'Python', ext: '.py', color: 'text-sky-400' },
    { name: 'Rust', ext: '.rs', color: 'text-orange-400' },
    { name: 'Go', ext: '.go', color: 'text-cyan-400' },
    { name: 'C++', ext: '.cpp', color: 'text-indigo-400' },
    { name: 'Java', ext: '.java', color: 'text-red-400' },
    { name: 'Ruby', ext: '.rb', color: 'text-rose-400' },
  ];

  const features = [
    {
      icon: Terminal,
      title: 'AI-Powered Static Code Review',
      description: 'Analyze syntax constructs and logical structure to surface deep execution issues beyond regular linters.'
    },
    {
      icon: ShieldAlert,
      title: 'Security Vulnerability Detection',
      description: 'Audit codebase syntax against CVE patterns, OWASP Top 10 vulnerabilities, and dependency security hazards.'
    },
    {
      icon: Zap,
      title: 'Performance & DRY Audits',
      description: 'Highlight inefficient time complex loops, resource allocations, and duplicate components to shrink load footprints.'
    },
    {
      icon: Sparkles,
      title: 'Smart Refactoring Diff Generation',
      description: 'Receive side-by-side Git-style replacement diffs that resolve recommendations with clean, typed structures.'
    }
  ];

  const faqs = [
    {
      question: 'How does CodeSage AI review my code?',
      answer: 'CodeSage AI uses highly fine-tuned models coupled with specialized static analysis toolchains to build an abstract syntax tree (AST) of your uploaded file. It then runs audits to surface security vulnerabilities, performance bottlenecks, and structural violations.'
    },
    {
      question: 'Is my proprietary code stored on your servers?',
      answer: 'No, we do not store your code. Uploaded segments are audited in-memory in sandbox pipelines and sent securely to inference gateways. They are never cached, persisted, or used for model training.'
    },
    {
      question: 'What programming languages are supported?',
      answer: 'We provide full structural support for TypeScript, JavaScript, Python, Rust, Go, C++, Java, and Ruby. Static scanning is optimized for typical frameworks matching these environments.'
    },
    {
      question: 'Can I hook this up to my GitHub commits?',
      answer: 'Yes. While the standalone browser editor is active in this release, our upcoming roadmap (Pro Tier) includes GitHub Webhooks and commit comment review integration.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors flex flex-col">
      <Navbar />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Subtle backdrop mesh */}
          <div className="absolute inset-0 bg-radial from-violet-500/5 to-transparent pointer-events-none -z-10" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 dark:border-violet-800/80 bg-violet-50/50 dark:bg-violet-950/30 px-3 py-1 text-xs text-violet-600 dark:text-violet-400 font-semibold"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free Public Beta is Now Live</span>
            </motion.div>

            {/* Title & Description */}
            <div className="max-w-3xl mx-auto space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1] font-sans"
              >
                Code Review in Seconds, <br />
                <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">Not Hours.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg lg:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed"
              >
                Upload your code, run structural AI analysis, inspect security warnings, and refactor performance flaws instantly.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center items-center gap-4"
            >
              <Link to="/signup">
                <Button variant="primary" size="lg" className="shadow-md">
                  Get Started Free <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Access Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Visual Mockup Dashboard (High-fidelity mockup) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-10 max-w-4xl mx-auto"
            >
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-2xl overflow-hidden text-left font-mono">
                {/* Editor Header */}
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-100 dark:bg-zinc-950/80">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>analyzer.py — CodeSage AI Editor</span>
                  </div>
                  <div className="text-[10px] bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700/60 px-2 py-0.5 rounded text-zinc-500">
                    Python
                  </div>
                </div>

                {/* Editor Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 text-xs h-[280px]">
                  {/* Code Panel */}
                  <div className="p-4 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto bg-white dark:bg-zinc-950">
                    <pre className="text-zinc-500 dark:text-zinc-400">
                      <code>
                        <span className="text-zinc-400">1</span> <span className="text-violet-500">def</span> <span className="text-blue-500">calculate_metrics</span>(users):<br />
                        <span className="text-zinc-400">2</span>     results = []<br />
                        <span className="text-zinc-400">3</span>     <span className="text-zinc-400"># Warning: nested search loop O(N^2)</span><br />
                        <span className="text-zinc-400">4</span>     <span className="text-violet-500">for</span> u <span className="text-violet-500">in</span> users:<br />
                        <span className="text-zinc-400">5</span>         <span className="text-violet-500">for</span> r <span className="text-violet-500">in</span> u.records:<br />
                        <span className="text-zinc-400">6</span>             results.append(r.score)<br />
                        <span className="text-zinc-400">7</span>     <span className="text-violet-500">return</span> results
                      </code>
                    </pre>
                  </div>
                  {/* Analysis Panel */}
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-semibold uppercase tracking-wider">
                        <Zap className="h-4 w-4" />
                        <span>Performance Alert</span>
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                        Quadratic Complexity O(N²) Detected
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        Nested loop structures search arrays redundantly. Map records to hash structures before iteration.
                      </p>
                      <div className="bg-zinc-100 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-500">
                        <span className="text-violet-500">Refactored to Map lookup:</span><br />
                        results = [r.score for u in users for r in u.records]
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                      <Badge variant="warning">Medium Severity</Badge>
                      <Badge variant="purple">Efficiency</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. FEATURES SECTION */}
        <section id="features" className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Engineered for High-Performance Teams
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                CodeSage AI performs systematic scanning to highlight vulnerabilities, efficiency losses, and DRY violations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, idx) => (
                <motion.div
                  key={feat.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={scrollReveal}
                  custom={idx}
                >
                  <Card hoverable className="h-full flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 text-violet-600 dark:text-violet-400">
                        <feat.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50 tracking-tight">{feat.title}</h3>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feat.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS */}
        <section id="how-it-works" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Simple Workflow. Professional Results.
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                Audit files, review recommendations, and deploy refactored changes in three clear steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Stepper Lines (Desktop) */}
              <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-zinc-200 dark:bg-zinc-800 -z-10" />

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 border border-zinc-800 font-bold text-sm">
                  1
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Paste or Upload File</h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                  Drop snippets or upload script files directly in the browser terminal editor.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 border border-zinc-800 font-bold text-sm">
                  2
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Run AI Diagnosis</h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                  Our analysis engine audits logical syntax blocks, memory leaks, and CVE database matches.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 border border-zinc-800 font-bold text-sm">
                  3
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Review Git-Style Diffs</h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                  Compare recommended structures directly and apply refactored blocks instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SUPPORTED LANGUAGES */}
        <section id="languages" className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Multilingual AST Analysis
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                Out-of-the-box compiler support and static analytics for your favorite stacks.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 rounded-xl text-sm font-medium hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all duration-200"
                >
                  <span className="font-mono text-zinc-400 text-xs">{lang.ext}</span>
                  <span className="text-zinc-800 dark:text-zinc-200">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS */}
        <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                What Developers Are Saying
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                CodeSage AI is trusted by backend and frontend engineers to audit their deployment scripts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                  &ldquo;CodeSage AI surfaced a race condition in our Go router context that would have caused significant thread deadlocks. It works exceptionally fast.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" alt="" className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">Marcus Vance</h4>
                    <p className="text-xs text-zinc-500">Tech Lead, Vercel Hub</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                  &ldquo;The styling is incredibly clean and fast. Using the Code Analyzer feels exactly like using a local code editor, but with deep security logs.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150" alt="" className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">Clara Sterling</h4>
                    <p className="text-xs text-zinc-500">Staff Architect, Linear</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                  &ldquo;I paste script scripts here to check logic blocks before deployment. Its performance audit warnings saved us from nesting API fetches.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150" alt="" className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">Koji Tanaka</h4>
                    <p className="text-xs text-zinc-500">Senior DevOps Engineer</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. PRICING (Free Plan focus) */}
        <section id="pricing" className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                SaaS Plans Structured for Everyone
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                Join our beta tier today. No credit cards needed during sandbox period.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Free Plan */}
              <Card className="relative flex flex-col justify-between border-2 border-violet-500 dark:border-violet-600">
                <div className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-violet-600 px-3 py-0.5 text-[10px] font-bold uppercase text-white tracking-widest shadow-sm">
                  Active Beta
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100">Standard Tier</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Ideal for sandbox validation and personal scripting projects.</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-zinc-950 dark:text-zinc-50">$0</span>
                    <span className="text-xs text-zinc-500">/ forever</span>
                  </div>
                  
                  <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-violet-500 shrink-0" />
                      <span>50 AI analyses run per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-violet-500 shrink-0" />
                      <span>Full language syntax supports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-violet-500 shrink-0" />
                      <span>Security & CVE pattern matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-violet-500 shrink-0" />
                      <span>14-day history persistence</span>
                    </li>
                  </ul>

                  <Link to="/signup" className="block pt-4">
                    <Button variant="primary" fullWidth>
                      Get Started Free
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Locked / Coming Soon Pro Plan */}
              <Card className="flex flex-col justify-between opacity-70 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/20">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-200">Developer Pro</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Perfect for scaling product operations and team pipelines.</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-zinc-400">$19</span>
                    <span className="text-xs text-zinc-500">/ user / mo</span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                      <span>Unlimited AI audits & scans</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                      <span>GitHub webhook & CI/CD workflow action</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                      <span>Custom rule config guidelines</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                      <span>Infinite history & team reports logs</span>
                    </li>
                  </ul>

                  <div className="pt-4">
                    <Button variant="secondary" disabled className="w-full">
                      Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section id="faq" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                Quick answers concerning security protocols, analysis credits, and integrations.
              </p>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-b border-zinc-200 dark:border-zinc-800">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* 8. CTA SECTION */}
        <section className="relative overflow-hidden py-20 border-t border-zinc-200 dark:border-zinc-800 bg-radial from-violet-900/10 to-transparent">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Write cleaner, optimized code starting today.
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
              Join thousands of developers auditing their functions in our sandbox environment. Try it instantly without installing local dependencies.
            </p>
            <div className="pt-4 flex justify-center">
              <Link to="/signup">
                <Button variant="primary" size="lg" className="px-8">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
