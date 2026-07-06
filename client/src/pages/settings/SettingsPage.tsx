import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User as UserIcon,
  Settings,
  Bell,
  Lock,
  Shield,
  AlertOctagon,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>('account');

  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isLoaded || !user) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-zinc-800 rounded w-1/4" />
        <div className="flex gap-6">
          <div className="w-56 h-48 bg-zinc-800 rounded" />
          <div className="flex-1 h-64 bg-zinc-900 rounded" />
        </div>
      </div>
    );
  }

  // Trigger password reset email via Clerk
  const handleTriggerReset = async () => {
    setIsSendingReset(true);
    setSecuritySuccess('');
    setSecurityError('');

    try {
      // Clerk allows users to trigger reset password emails
      // Here we trigger a recovery email for the logged-in email identifier
      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) throw new Error("Primary email not found");

      // Sign out and redirect to forgot-password page with email pre-filled
      await signOut();
      navigate(`/forgot-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setSecurityError(err.message || 'Failed to trigger password recovery.');
    } finally {
      setIsSendingReset(false);
    }
  };

  // Handle Account Delete via Clerk user.delete()
  const handleDeleteAccount = async () => {
    if (deleteInput !== 'DELETE') return;
    setIsDeleting(true);
    try {
      await user.delete();
      await signOut();
      navigate('/');
    } catch (err: any) {
      setSecurityError('Failed to delete account. Action restricted.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: UserIcon },
    { id: 'appearance', label: 'Appearance', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'danger', label: 'Danger Zone', icon: AlertOctagon },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Settings</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Configure your account credentials, view theme toggles, and manage active sessions.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-56 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 pb-3 md:pb-0 md:pr-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-zinc-200/60 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              <tab.icon className={`h-4.5 w-4.5 ${tab.id === 'danger' && activeTab === 'danger' ? 'text-red-500' : ''}`} />
              <span className={tab.id === 'danger' && activeTab !== 'danger' ? 'text-red-500/70 hover:text-red-500' : ''}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Configurations Content */}
        <div className="flex-1">
          {/* Account Tab */}
          {activeTab === 'account' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Review credentials synced with Clerk.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 border-t border-zinc-100 dark:border-zinc-900/50 pt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Full Name</span>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.fullName || 'Not specified'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Username</span>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 font-mono">@{user.username || 'not_set'}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Primary Email Address</span>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900/50 flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Need to modify your name, username, or profile avatar?</span>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-1 text-violet-500 hover:underline font-semibold"
                  >
                    Go to Profile <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>Appearance Theme</CardTitle>
                <CardDescription>Toggle between dark mode and light mode.</CardDescription>
              </CardHeader>
              <CardContent className="border-t border-zinc-100 dark:border-zinc-900/50 pt-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Interface Colors</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Currently selected: <span className="font-bold font-mono capitalize">{theme} mode</span>.</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center justify-center font-medium rounded-lg text-xs px-3.5 py-1.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer shadow-xs transition-colors"
                  >
                    Toggle theme
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>Notifications Settings</CardTitle>
                <CardDescription>Choose how you receive code reviews digest.</CardDescription>
              </CardHeader>
              <CardContent className="border-t border-zinc-100 dark:border-zinc-900/50 pt-6 space-y-4">
                <div className="space-y-3">
                  {[
                    { label: 'Email me immediately when security leaks are detected', default: true },
                    { label: 'Send weekly performance improvements digest', default: false },
                    { label: 'Notify on completed repository analysis', default: true },
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        id={`notify-${idx}`}
                        type="checkbox"
                        defaultChecked={rule.default}
                        className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                      />
                      <label htmlFor={`notify-${idx}`} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        {rule.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>Privacy & Data Storage</CardTitle>
                <CardDescription>Determine data tracking preferences.</CardDescription>
              </CardHeader>
              <CardContent className="border-t border-zinc-100 dark:border-zinc-900/50 pt-6 space-y-4">
                <div className="space-y-3">
                  {[
                    { label: 'Store analysis logs history inside local browser buffers', default: true },
                    { label: 'Allow model gateways to compile statistical telemetry tags', default: false },
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        id={`privacy-${idx}`}
                        type="checkbox"
                        defaultChecked={rule.default}
                        className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                      />
                      <label htmlFor={`privacy-${idx}`} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        {rule.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage credentials and trigger passwords reset.</CardDescription>
              </CardHeader>
              <CardContent className="border-t border-zinc-100 dark:border-zinc-900/50 pt-6 space-y-4">
                {securityError && (
                  <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3 text-xs text-red-400">
                    {securityError}
                  </div>
                )}
                {securitySuccess && (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs text-emerald-400">
                    {securitySuccess}
                  </div>
                )}
                
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Update Password</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Trigger a password recovery flow sent to your email.
                    </p>
                  </div>
                  <Button
                    onClick={handleTriggerReset}
                    isLoading={isSendingReset}
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                  >
                    Reset Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Danger Zone Tab */}
          {activeTab === 'danger' && (
            <Card className="border-red-200 dark:border-red-950/40 bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                <CardDescription>Irreversible account options.</CardDescription>
              </CardHeader>
              <CardContent className="border-t border-red-100 dark:border-red-950/20 pt-6 space-y-4">
                {!showDeleteConfirm ? (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-red-50/10 dark:bg-red-950/5 p-4 border border-red-100 dark:border-red-950/10 rounded-xl">
                    <div>
                      <h4 className="text-sm font-bold text-red-600 dark:text-red-400">Delete CodeSage Account</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
                        Deletes your login access credentials and wipes all code diagnostics records. Action is permanent.
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowDeleteConfirm(true)}
                      variant="danger"
                      size="sm"
                      className="shrink-0"
                    >
                      Delete Account
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 bg-red-50/10 dark:bg-red-950/5 p-4 border border-red-200 dark:border-red-950/30 rounded-xl">
                    <h4 className="text-sm font-bold text-red-600 dark:text-red-400">Confirm Account Deletion</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Type <span className="font-bold text-red-500 font-mono">DELETE</span> below to confirm permanent deletion of your account.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={deleteInput}
                        onChange={(e) => setDeleteInput(e.target.value)}
                        placeholder="Type DELETE..."
                        className="flex-1 rounded-lg border border-red-200 dark:border-red-900/40 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeleteInput('');
                          }}
                          variant="secondary"
                          size="sm"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleDeleteAccount}
                          disabled={deleteInput !== 'DELETE'}
                          isLoading={isDeleting}
                          variant="danger"
                          size="sm"
                        >
                          Permanently Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
