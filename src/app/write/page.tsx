'use client';
import { useState } from 'react';

export default function WritePage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    authorName: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('✅ Post created!');
    } else {
      alert('❌ Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <input name="title" placeholder="Title" onChange={handleChange} required className="border p-2 w-full" />
      <input name="slug" placeholder="Slug" onChange={handleChange} required className="border p-2 w-full" />
      <input name="authorName" placeholder="Author" onChange={handleChange} required className="border p-2 w-full" />
      <textarea name="content" placeholder="Content" rows={5} onChange={handleChange} required className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
