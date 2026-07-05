import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Code2, ArrowLeft, Terminal, Shield, Zap } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-screen bg-zinc-950 text-zinc-50 font-sans">
      {/* Visual Brand Side (hidden on mobile, slate/zinc gradient) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-radial from-zinc-900 to-zinc-950 p-12 border-r border-zinc-900 relative overflow-hidden">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, #8b5cf6 0%, transparent 70%), linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '100% 100%, 24px 24px, 24px 24px' }}></div>

        {/* Top Header Link */}
        <Link to="/" className="flex items-center gap-2 group w-fit z-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-950 group-hover:scale-105 transition-transform">
            <Code2 className="h-5 w-5 stroke-[2]" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            CodeSage<span className="text-violet-500 font-bold">.AI</span>
          </span>
        </Link>

        {/* Feature Teasers */}
        <div className="space-y-8 my-auto z-10 max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 leading-tight">
            Build safer, faster code with real-time AI insight.
          </h2>
          
          <div className="space-y-5">
            <div className="flex gap-3 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 text-violet-400">
                <Terminal className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Instant Code Audits</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Detect logical syntax flaws, syntax deprecations, and race conditions instantly.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 text-violet-400">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Security Guardrails</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Audit dependencies and check vulnerabilities matching CVEs in real-time.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 text-violet-400">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Refactoring Suggestions</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Optimize performance, improve DRY principles, and receive beautiful code diff suggestions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-xs text-zinc-500 z-10">
          <p>© CodeSage AI, Inc. All rights reserved.</p>
        </div>
      </div>

      {/* Auth Forms Side */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 bg-zinc-950">
        {/* Back Link */}
        <div className="absolute top-6 right-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to site</span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm space-y-6">
          {/* Mobile Brand Header */}
          <div className="flex flex-col items-center text-center lg:hidden mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-zinc-950 mb-2">
              <Code2 className="h-5 w-5 stroke-[2]" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">
              CodeSage<span className="text-violet-500 font-bold">.AI</span>
            </span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};
