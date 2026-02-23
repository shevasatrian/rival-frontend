'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.post('/blogs', { title, content, isPublished });
    router.push('/dashboard');
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Write something great</p>
        <h1 className="font-['Playfair_Display'] text-4xl font-black text-[#1a1a1a]">New Story</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Title</label>
          <input
            className="w-full border-b-2 border-stone-300 bg-transparent py-3 font-['Playfair_Display'] text-2xl font-bold text-[#1a1a1a] placeholder:text-stone-300 focus:border-[#1a1a1a] focus:outline-none transition-colors"
            placeholder="Your story title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">Content</label>
          <textarea
            className="w-full border-b-2 border-stone-300 bg-transparent py-3 text-[#1a1a1a] placeholder:text-stone-300 focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none min-h-[300px] text-lg leading-relaxed"
            placeholder="Write your story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
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
              {isPublished ? 'Publish immediately' : 'Save as draft'}
            </span>
          </label>

          <button className="bg-[#1a1a1a] text-[#f5f0e8] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#c0392b] transition-all">
            Save Story
          </button>
        </div>
      </form>
    </div>
  );
}