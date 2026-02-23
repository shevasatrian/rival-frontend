import CommentSection from '@/components/blog/CommentSection';
import LikeButton from '@/components/blog/LikeButton';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getBlog(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/blogs/${slug}`,
    { cache: 'no-store' }
  );
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/" className="text-xs uppercase tracking-widest text-stone-400 hover:text-[#c0392b] transition-colors mb-10 inline-block">
        ← Back to Feed
      </Link>

      <h1 className="font-['Playfair_Display'] text-5xl font-black text-[#1a1a1a] leading-tight mb-6">
        {blog.title}
      </h1>

      <div className="flex items-center gap-3 mb-10 pb-8 border-b border-stone-200">
        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#f5f0e8] text-xs font-bold">
          {blog.user.email[0].toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-[#1a1a1a]">{blog.user.email}</p>
          <p className="text-xs text-stone-400">
            {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="prose prose-stone max-w-none text-[#1a1a1a] leading-relaxed text-lg mb-12 whitespace-pre-wrap">
        {blog.content}
      </div>

      <div className="border-t border-b border-stone-200 py-6 mb-12">
        <LikeButton blogId={blog.id} initialLikes={blog._count?.likes || 0} />
      </div>

      <CommentSection blogId={blog.id} />
    </div>
  );
}