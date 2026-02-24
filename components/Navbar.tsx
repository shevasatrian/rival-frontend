/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, [pathname]);

  function logout() {
    localStorage.removeItem('token');
    setIsAuth(false);
    router.push('/');
  }

  return (
    <nav className="border-b border-stone-300 bg-[#f5f0e8] sticky top-0 z-50">
      <div className="border-b border-stone-300 text-center py-1 text-xs tracking-widest text-stone-500 uppercase">
        The Independent Blog Platform
      </div>

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-['Playfair_Display'] text-2xl font-black tracking-tight text-[#1a1a1a]">
          RivalBlog
        </Link>

        <div className="flex gap-6 items-center text-sm font-medium tracking-wide">
          <Link href="/" className="hover:text-[#c0392b] transition-colors uppercase tracking-widest text-xs">
            Home
          </Link>

          {isAuth ? (
            <>
              <Link href="/dashboard" className="hover:text-[#c0392b] transition-colors uppercase tracking-widest text-xs">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="border border-[#1a1a1a] px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-[#f5f0e8] transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[#c0392b] transition-colors uppercase tracking-widest text-xs">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#1a1a1a] text-[#f5f0e8] px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-[#c0392b] transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}