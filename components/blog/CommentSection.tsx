'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: { email: string };
}

export default function CommentSection({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchComments() {
    const res = await api.get(`/blogs/${blogId}/comments`);
    setComments(res.data as Comment[]);
  }

  useEffect(() => { fetchComments(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await api.post(`/blogs/${blogId}/comments`, { content });
      setComments((prev) => [res.data as Comment, ...prev]);
      setContent('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-6 text-[#1a1a1a]">
        Discussion <span className="text-stone-300 text-lg font-normal">({comments.length})</span>
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          className="w-full border-b-2 border-stone-300 bg-transparent py-3 text-[#1a1a1a] placeholder:text-stone-400 focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none min-h-[80px]"
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 bg-[#1a1a1a] text-[#f5f0e8] px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-[#c0392b] transition-all disabled:opacity-40"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {comments.length === 0 && (
        <p className="text-stone-400 text-sm">Be the first to comment.</p>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-l-2 border-stone-200 pl-4">
            <p className="text-[#1a1a1a] mb-2 leading-relaxed">{comment.content}</p>
            <p className="text-xs text-stone-400">
              {comment.user.email} · {new Date(comment.createdAt).toLocaleString('id-ID')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}