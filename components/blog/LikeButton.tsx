'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function LikeButton({ blogId, initialLikes }: { blogId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/blogs/${blogId}/like/status`)
      .then((res) => setIsLiked((res.data as { isLiked: boolean }).isLiked))
      .catch(() => {});
  }, [blogId]);

  async function handleLike() {
    setLoading(true);

    try {
      if (isLiked) {
        setLikes((prev) => prev - 1);
        setIsLiked(false);
        const res = await api.delete(`/blogs/${blogId}/like`);
        setLikes((res.data as { likes: number }).likes);
      } else {
        setLikes((prev) => prev + 1);
        setIsLiked(true);
        const res = await api.post(`/blogs/${blogId}/like`);
        setLikes((res.data as { likes: number }).likes);
      }
    } catch {
      setLikes(initialLikes);
      setIsLiked((prev) => !prev);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`group flex items-center gap-3 transition-colors disabled:opacity-40 ${
        isLiked ? 'text-[#c0392b]' : 'text-stone-400 hover:text-[#c0392b]'
      }`}
    >
      <span className={`text-2xl transition-transform inline-block ${isLiked ? 'scale-110' : 'group-hover:scale-110'}`}>
        {isLiked ? '❤️' : '🤍'}
      </span>
      <span className="font-['Playfair_Display'] text-xl font-bold text-[#1a1a1a]">{likes}</span>
      <span className="text-xs uppercase tracking-widest">likes</span>
    </button>
  );
}