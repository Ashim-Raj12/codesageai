import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  User,
  Settings,
  Key,
  CreditCard,
  Check,
  Plus,
  Trash2,
  Copy
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'general';

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [name, setName] = useState('Alex Sage');
  const [email, setEmail] = useState('alex.sage@codesage.ai');
  const [reviewMode, setReviewMode] = useState('standard');
  
  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'VS Code Extension', key: 'cs_live_92kd...83kd', created: '2026-07-02' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `cs_live_${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">Account Settings</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Configure user accounts, edit analysis preferences, or create integrations keys.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-56 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 pb-3 md:pb-0 md:pr-4">
          {[
            { id: 'general', label: 'General Info', icon: User },
            { id: 'ai', label: 'AI Preferences', icon: Settings },
            { id: 'keys', label: 'API Keys', icon: Key },
            { id: 'billing', label: 'Billing Plans', icon: CreditCard },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-zinc-200/60 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              <tab.icon className="h-4.5 w-4.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Configurations Content */}
        <div className="flex-1">
          {/* General Tab */}
          {activeTab === 'general' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>General Profile</CardTitle>
                <CardDescription>Update your personal account attributes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 border-t border-zinc-100 dark:border-zinc-900/50 pt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button variant="primary" size="sm">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Settings Tab */}
          {activeTab === 'ai' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>AI Preferences</CardTitle>
                <CardDescription>Adjust how strict the AI engine reviews code inputs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 border-t border-zinc-100 dark:border-zinc-900/50 pt-6">
                <div className="space-y-4">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Audit Rule Severity</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'standard', title: 'Standard Mode', desc: 'Checks security bugs and basic optimizations.' },
                      { id: 'pedantic', title: 'Strict / Pedantic', desc: 'Warns about naming styles and comments coverage.' },
                      { id: 'security', title: 'Security Focus', desc: 'Restricts audits strictly to CVE database scans.' },
                    ].map((mode) => (
                      <div
                        key={mode.id}
                        onClick={() => setReviewMode(mode.id)}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          reviewMode === mode.id
                            ? 'border-violet-500 bg-violet-500/5 dark:bg-violet-500/10'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950'
                        }`}
                      >
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{mode.title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-normal">{mode.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-2">Automated Checks</label>
                  {[
                    { label: 'Check for hardcoded API keys & passwords', default: true },
                    { label: 'Highlight linear query loop syntax', default: true },
                    { label: 'Verify code type coverage rules', default: false }
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        id={`check-${idx}`}
                        type="checkbox"
                        defaultChecked={rule.default}
                        className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                      />
                      <label htmlFor={`check-${idx}`} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        {rule.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* API Keys Tab */}
          {activeTab === 'keys' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>IDE Integrations Keys</CardTitle>
                <CardDescription>Setup API keys to use CodeSage audits in VS Code or Cursor.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 border-t border-zinc-100 dark:border-zinc-900/50 pt-6">
                {/* Form */}
                <form onSubmit={handleCreateKey} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={e => setNewKeyName(e.target.value)}
                    placeholder="Key name (e.g. Cursor extension)..."
                    className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-violet-500"
                  />
                  <Button type="submit" variant="primary" size="sm" className="gap-1 shadow-sm shrink-0">
                    <Plus className="h-4 w-4" /> Create Key
                  </Button>
                </form>

                {/* List */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Active Keys</span>
                  {apiKeys.length > 0 ? (
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                      {apiKeys.map((k) => (
                        <div key={k.id} className="flex items-center justify-between p-3.5 bg-zinc-50/30 dark:bg-zinc-900/10 font-mono text-xs">
                          <div className="space-y-1">
                            <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100">{k.name}</span>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                              <span>Created on {k.created}</span>
                              <span className="h-1 w-1 bg-zinc-400 rounded-full" />
                              <span className="font-mono text-zinc-400 dark:text-zinc-400">{k.key}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                navigator.clipboard.writeText('cs_live_92kd94kd92k0d0kd');
                                setIsCopied(true);
                                setTimeout(() => setIsCopied(false), 2000);
                              }}
                              variant="outline"
                              size="sm"
                              className="px-2 py-1 h-8 text-[10px]"
                            >
                              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                            </Button>
                            <Button
                              onClick={() => handleDeleteKey(k.id)}
                              variant="danger"
                              size="sm"
                              className="px-2 py-1 h-8 text-[10px]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 text-xs">
                      No active API keys found.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <Card className="bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle>Plan Billing</CardTitle>
                <CardDescription>Check review limits or update subscriptions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 border-t border-zinc-100 dark:border-zinc-900/50 pt-6">
                {/* Credit usage tracker */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-zinc-600 dark:text-zinc-400">Analysis Credits Used</span>
                    <span className="text-zinc-900 dark:text-zinc-50">12 / 50 runs</span>
                  </div>
                  <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-600 rounded-full" style={{ width: '24%' }} />
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal">
                    Standard beta account credits reset automatically on the 17th of July.
                  </p>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Need GitHub & CI/CD workflow actions?</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-normal max-w-sm">
                      Upgrade to the Pro tier to hook static scans directly into Pull Requests and lock down automated code comments.
                    </p>
                  </div>
                  <Button variant="primary" size="sm" className="shadow-sm shrink-0">
                    Upgrade to Pro
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
