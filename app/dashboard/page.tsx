/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  isPublished: boolean;
}

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBlogs() {
    const res = await api.get('/blogs/my');
    setBlogs(res.data as Blog[]);
    setLoading(false);
  }

  async function deleteBlog(id: string) {
    await api.delete(`/blogs/${id}`);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }

  useEffect(() => { fetchBlogs(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-40 text-stone-400 text-sm uppercase tracking-widest">
      Loading...
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Manage your content</p>
          <h1 className="font-['Playfair_Display'] text-4xl font-black text-[#1a1a1a]">My Stories</h1>
        </div>
        <Link
          href="/dashboard/create"
          className="bg-[#1a1a1a] text-[#f5f0e8] px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#c0392b] transition-all"
        >
          + New Story
        </Link>
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-20 border border-dashed border-stone-300">
          <p className="font-['Playfair_Display'] text-2xl text-stone-400 mb-2">No stories yet</p>
          <p className="text-sm text-stone-400">Create your first story to get started.</p>
        </div>
      )}

      <div className="divide-y divide-stone-200">
        {blogs.map((blog) => (
          <div key={blog.id} className="py-6 flex justify-between items-center group">
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a1a] group-hover:text-[#c0392b] transition-colors">
                {blog.title}
              </h2>
              <span className={`inline-block mt-1 text-xs uppercase tracking-widest px-2 py-0.5 ${
                blog.isPublished
                  ? 'bg-green-100 text-green-700'
                  : 'bg-stone-100 text-stone-500'
              }`}>
                {blog.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>

            <div className="flex gap-4 text-sm">
              <Link href={`/dashboard/edit/${blog.id}`} className="uppercase tracking-widest text-xs hover:text-[#c0392b] transition-colors">
                Edit
              </Link>
              <button
                onClick={() => deleteBlog(blog.id)}
                className="uppercase tracking-widest text-xs text-stone-400 hover:text-[#c0392b] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}