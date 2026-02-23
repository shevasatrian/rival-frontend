'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      const res = await api.get(`/blogs/${id}`);
      const blog = res.data as { title: string; content: string; isPublished: boolean };
      setTitle(blog.title);
      setContent(blog.content);
      setIsPublished(blog.isPublished);
    }
    fetchBlog();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.patch(`/blogs/${id}`, { title, content, isPublished });
    router.push('/dashboard');
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Make it better</p>
        <h1 className="font-['Playfair_Display'] text-4xl font-black text-[#1a1a1a]">Edit Story</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Title</label>
          <input
            className="w-full border-b-2 border-stone-300 bg-transparent py-3 font-['Playfair_Display'] text-2xl font-bold text-[#1a1a1a] placeholder:text-stone-300 focus:border-[#1a1a1a] focus:outline-none transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Content</label>
          <textarea
            className="w-full border-b-2 border-stone-300 bg-transparent py-3 text-[#1a1a1a] focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none min-h-[300px] text-lg leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setIsPublished(!isPublished)}
              className={`w-11 h-6 rounded-full transition-colors ${isPublished ? 'bg-[#1a1a1a]' : 'bg-stone-300'} relative`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${isPublished ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="text-xs uppercase tracking-widest text-stone-500">
              {isPublished ? 'Published' : 'Draft'}
            </span>
          </label>

          <button className="bg-[#1a1a1a] text-[#f5f0e8] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#c0392b] transition-all">
            Update Story
          </button>
        </div>
      </form>
    </div>
  );
}