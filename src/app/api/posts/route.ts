import { db } from '@/db/drizzle';
import { posts } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await db.insert(posts).values({
      title: body.title,
      content: body.content,
      slug: body.slug,
      authorName: body.authorName,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  }
}
