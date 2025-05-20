import Link from 'next/link';
import { db } from '@/db/drizzle';
import { posts } from '@/db/schema';
import Navbar from '@/components/Navbar'; // adjust path if needed

export default async function LandingPage() {
  const allPosts = await db.select().from(posts);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ✅ Reusable Navbar */}
      <Navbar />

      {/* Hero / Feed */}
      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>

        <div className="space-y-6">
          {allPosts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            allPosts.map((post) => (
              <div key={post.id} className="border rounded p-4 hover:shadow">
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-xl font-bold mb-1 hover:underline">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600 mb-2">by {post.authorName}</p>
                <p className="text-gray-700 text-sm">
                  {post.content.slice(0, 100)}...
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
