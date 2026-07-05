import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    // Mock registration delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1.5 text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-white m-0 leading-none">Create an account</h1>
        <p className="text-sm text-zinc-400">Get started with 50 free AI code review credits</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-zinc-300 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <User className="h-4 w-4" />
            </span>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Sage"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-medium text-zinc-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-medium text-zinc-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Lock className="h-4 w-4" />
            </span>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs font-medium text-zinc-300 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Lock className="h-4 w-4" />
            </span>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading} className="mt-2">
          Create Account
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-zinc-800"></div>
        <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase tracking-widest font-semibold">or continue with</span>
        <div className="flex-grow border-t border-zinc-800"></div>
      </div>

      {/* Social Register */}
      <Button
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
          }, 800);
        }}
        variant="outline"
        fullWidth
        className="text-zinc-300 border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900"
      >
        <svg className="h-4.5 w-4.5 mr-2 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        GitHub Account
      </Button>

      {/* Footer Link */}
      <div className="text-center text-sm text-zinc-400 pt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};
