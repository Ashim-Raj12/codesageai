import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Mail, Calendar, Info, Link2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const AccountCard: React.FC = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) {
    return (
      <Card className="bg-white dark:bg-zinc-950 animate-pulse h-96">
        <CardContent className="h-full bg-zinc-100/50 dark:bg-zinc-900/10" />
      </Card>
    );
  }

  // Format joined date
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  // Check social provider connections
  const externalAccounts = user.externalAccounts || [];
  const providers = [
    { id: 'google', name: 'Google Account', svg: (
      <svg className="h-4.5 w-4.5 text-red-500 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955.558 15.34 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c7 0 11.637-4.887 11.637-11.79 0-.795-.086-1.4-.19-1.925H12.24z"/>
      </svg>
    )},
    { id: 'github', name: 'GitHub Account', svg: (
      <svg className="h-4.5 w-4.5 text-zinc-950 dark:text-zinc-100 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    )}
  ];

  return (
    <Card className="bg-white dark:bg-zinc-950">
      <CardHeader>
        <CardTitle>Account Credentials</CardTitle>
        <CardDescription>Primary emails, registration dates, and social logins.</CardDescription>
      </CardHeader>
      
      <CardContent className="border-t border-zinc-100 dark:border-zinc-900/50 pt-6 space-y-6">
        {/* Email Display */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Primary Email</span>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10">
            <Mail className="h-4.5 w-4.5 text-zinc-400" />
            <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {user.primaryEmailAddress?.emailAddress}
            </span>
            <Badge variant="success" className="ml-auto text-[10px]">Verified</Badge>
          </div>
          <div className="flex items-start gap-1.5 text-[10px] text-zinc-400 leading-normal">
            <Info className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span>Email addresses cannot be modified directly. Please update credentials via Settings security configurations.</span>
          </div>
        </div>

        {/* Joined Date */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Joined Date</span>
          <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
            <Calendar className="h-4.5 w-4.5 text-zinc-400" />
            <span>Registered on {joinedDate}</span>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Connected Social Accounts</span>
          
          <div className="space-y-2">
            {providers.map((p) => {
              const connection = externalAccounts.find(acc => acc.provider === p.id);
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/20 dark:bg-zinc-900/5"
                >
                  <div className="flex items-center gap-3">
                    {p.svg}
                    <div className="flex flex-col text-xs leading-none gap-1">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">{p.name}</span>
                      {connection && (
                        <span className="text-[10px] text-zinc-400">{connection.emailAddress}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    {connection ? (
                      <Badge variant="info" className="gap-1 text-[10px]">
                        <Link2 className="h-3 w-3" /> Connected
                      </Badge>
                    ) : (
                      <Badge variant="default" className="text-[10px] opacity-60">
                        Disconnected
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
