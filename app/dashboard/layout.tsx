'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  function logout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="border-b border-stone-300 bg-[#f5f0e8] px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-['Playfair_Display'] font-black text-xl text-[#1a1a1a]">
            RivalBlog
          </Link>
          <span className="text-xs text-stone-400 uppercase tracking-widest">/ Dashboard</span>
        </div>
        <button
          onClick={logout}
          className="text-xs uppercase tracking-widest border border-stone-300 px-4 py-2 hover:border-[#c0392b] hover:text-[#c0392b] transition-all"
        >
          Logout
        </button>
      </div>
      <div className="max-w-4xl mx-auto px-8 py-10">{children}</div>
    </div>
  );
}