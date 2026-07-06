import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, LogIn } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Visual Alert Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-amber-500 shadow-lg shadow-amber-950/10">
          <ShieldAlert className="h-8 w-8 stroke-[1.5]" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white m-0">Unauthorized Access</h1>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed mt-2">
            You do not have access rights to view this page. Authentication is required to view dashboard resources.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex justify-center gap-3 pt-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1.5 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300">
              <Home className="h-4 w-4" /> Go to Landing
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="sm" className="gap-1.5 shadow-md">
              <LogIn className="h-4 w-4" /> Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
