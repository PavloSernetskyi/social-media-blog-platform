'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="flex justify-between items-center border-b px-6 py-4 bg-white text-black">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold">WriteIt</Link>
        <input
          type="text"
          placeholder="Search posts..."
          className="border border-gray-300 px-3 py-1 rounded text-sm w-64"
        />
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/write"
          className="text-sm text-white bg-black px-4 py-2 rounded hover:opacity-90"
        >
          Start Writing
        </Link>
        <span className="text-sm text-gray-600">Login</span>
      </div>
    </header>
  );
}
