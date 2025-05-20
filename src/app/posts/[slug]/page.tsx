import { db } from '@/db/drizzle';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface PostPageProps {
  params: { slug: string };
}


export default async function PostPage(props: PostPageProps) {
  const { slug } = await props.params;

  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .then((res) => res[0]);

  if (!post) return notFound();

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-8">by {post.authorName}</p>
        <article className="text-lg leading-relaxed whitespace-pre-line">
          {post.content}
        </article>
      </main>
    </div>
  );
}