import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Camera, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const ProfileCard: React.FC = () => {
  const { isLoaded, user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isLoaded || !user) {
    return (
      <Card className="bg-white dark:bg-zinc-950 animate-pulse h-96">
        <CardContent className="h-full bg-zinc-100/50 dark:bg-zinc-900/10" />
      </Card>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      await user.update({
        firstName,
        lastName,
        username: username || undefined,
      });
      setSuccess('Profile details saved successfully!');
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || 'Failed to update profile details.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      await user.setProfileImage({ file });
      setSuccess('Avatar updated successfully!');
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || 'Failed to upload profile picture.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-zinc-950 overflow-hidden">
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Update your avatar, full name, and username.</CardDescription>
      </CardHeader>
      
      <CardContent className="border-t border-zinc-100 dark:border-zinc-900/50 pt-6 space-y-6">
        {/* Success/Error Alerts */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3.5 text-xs text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3.5 text-xs text-emerald-400 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Avatar Upload Container */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-4 border-b border-zinc-100 dark:border-zinc-900/40">
          <div className="relative group rounded-full overflow-hidden h-20 w-20 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
            <img
              src={user.imageUrl}
              alt={user.fullName || 'User'}
              className="h-full w-full object-cover"
            />
            {/* Hover overlay for files */}
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] text-zinc-300 font-semibold cursor-pointer select-none">
              <Camera className="h-4.5 w-4.5 mb-1 text-white" />
              <span>Change</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
            {isUploading && (
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-violet-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            )}
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Avatar Image</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Supports JPEG, PNG, or WebP. Max size 2MB.
            </p>
          </div>
        </div>

        {/* Profile Inputs Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="first-name" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">First Name</label>
              <input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="Alex"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="last-name" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Last Name</label>
              <input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="Sage"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="profile-username" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Username</label>
            <input
              id="profile-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="alex_sage"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
