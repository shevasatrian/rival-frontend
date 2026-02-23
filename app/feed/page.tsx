import { FeedResponse } from '@/types/blog';
import Link from 'next/link';

async function getFeed(page: number): Promise<FeedResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/feed?page=${page}&limit=5`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch feed');
  return res.json();
}

export default async function FeedPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page || 1);
  const data = await getFeed(page);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero header */}
      <div className="mb-12 border-b border-stone-300 pb-8">
        <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">Latest Stories</p>
        <h1 className="font-['Playfair_Display'] text-6xl font-black text-[#1a1a1a] leading-none">
          The Feed
        </h1>
      </div>

      {data.data.length === 0 && (
        <div className="text-center py-20 text-stone-400">
          <p className="font-['Playfair_Display'] text-3xl mb-2">Nothing here yet.</p>
          <p className="text-sm">Be the first to publish a story.</p>
        </div>
      )}

      <div className="divide-y divide-stone-200">
        {data.data.map((blog, i) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="group block py-8 hover:pl-2 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-widest text-stone-400">
                    {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1a1a1a] group-hover:text-[#c0392b] transition-colors mb-2 leading-snug">
                  {blog.title}
                </h2>
                <p className="text-sm text-stone-500">{blog.author.email}</p>
              </div>
              <div className="text-right flex-shrink-0 space-y-1 mt-1">
                <p className="text-sm text-stone-400">❤️ {blog.likeCount}</p>
                <p className="text-sm text-stone-400">💬 {blog.commentCount}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-12 border-t border-stone-300 pt-6">
        {page > 1 ? (
          <Link href={`/feed?page=${page - 1}`} className="text-xs uppercase tracking-widest hover:text-[#c0392b] transition-colors">
            ← Previous
          </Link>
        ) : <div />}
        <span className="text-xs text-stone-400 uppercase tracking-widest">Page {page}</span>
        {page < data.meta.lastPage && (
          <Link href={`/feed?page=${page + 1}`} className="text-xs uppercase tracking-widest hover:text-[#c0392b] transition-colors">
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}