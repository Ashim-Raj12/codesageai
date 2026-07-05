import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Terminal Visual Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-red-500 shadow-lg shadow-red-950/10">
          <Terminal className="h-8 w-8 stroke-[1.5]" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white m-0">404: Not Found</h1>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            The route you requested does not exist or has been refactored to another endpoint.
          </p>
        </div>

        {/* Terminal Output Mockup */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs text-left text-zinc-400 space-y-2 shadow-inner">
          <p className="text-zinc-500">&gt; curl -I https://codesage.ai/current-route</p>
          <div className="text-red-400">
            <p>HTTP/1.1 404 Not Found</p>
            <p>Content-Type: application/json</p>
            <p>Cache-Control: no-cache</p>
          </div>
          <p className="text-zinc-600 mt-2">{"{"}</p>
          <p className="text-zinc-500 pl-4">&quot;error&quot;: &quot;endpoint_not_found&quot;,</p>
          <p className="text-zinc-500 pl-4">&quot;message&quot;: &quot;Refactor your client routes.&quot;</p>
          <p className="text-zinc-600">{"}"}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1.5 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300">
              <Home className="h-4 w-4" /> Go to Landing
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center font-medium rounded-lg text-sm px-4 py-2 gap-2 bg-violet-600 text-white hover:bg-violet-500 border border-violet-500/20 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
