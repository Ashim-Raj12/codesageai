import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { Key, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const VerifyEmailPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  if (!isLoaded) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError('Please enter the verification code.');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate('/dashboard');
      } else {
        setError('Verification incomplete. Please contact support.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1.5 text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-white m-0 leading-none">Verify Email</h1>
        <p className="text-sm text-zinc-400 mt-1.5">Enter the verification code sent to your email address</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-xs font-medium text-zinc-300 mb-1.5">
            Verification Code
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Key className="h-4 w-4" />
            </span>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Verify Account
        </Button>
      </form>

      {/* Footer link */}
      <div className="text-center pt-2">
        <Link to="/signup" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          <span>Back to sign up</span>
        </Link>
      </div>
    </div>
  );
};
