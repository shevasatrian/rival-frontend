/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.accessToken);
      window.location.reload();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Welcome back</p>
          <h1 className="font-['Playfair_Display'] text-5xl font-black text-[#1a1a1a]">Sign In</h1>
          <div className="w-12 h-0.5 bg-[#c0392b] mx-auto mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="border-l-4 border-[#c0392b] bg-red-50 px-4 py-3 text-sm text-[#c0392b]">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border-b-2 border-stone-300 bg-transparent py-3 text-[#1a1a1a] placeholder:text-stone-400 focus:border-[#1a1a1a] focus:outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border-b-2 border-stone-300 bg-transparent py-3 text-[#1a1a1a] placeholder:text-stone-400 focus:border-[#1a1a1a] focus:outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a1a1a] text-[#f5f0e8] py-4 text-xs uppercase tracking-widest mt-4 hover:bg-[#c0392b] transition-all disabled:opacity-40"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm mt-8 text-center text-stone-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#1a1a1a] underline underline-offset-4 hover:text-[#c0392b] transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}