'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PhotoIcon } from '@heroicons/react/24/outline';

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function WritePage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    authorName: '',
    imageUrl: '',
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };

    if (name === 'title') {
      updatedData.slug = slugify(value);
    }

    setFormData(updatedData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name); // show file name below
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('Post created!');
      setFormData({ title: '', content: '', slug: '', authorName: '', imageUrl: '' });
      setFileName(null); // reset filename
    } else {
      alert('Failed to create post.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-3xl mx-auto mb-6">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={formData.title}
          required
          className="text-4xl font-bold w-full outline-none placeholder-gray-400"
        />

        <input
          name="authorName"
          placeholder="Your name"
          onChange={handleChange}
          value={formData.authorName}
          required
          className="text-sm text-gray-600 outline-none w-full"
        />

        <textarea
          name="content"
          placeholder="Tell your story..."
          rows={12}
          onChange={handleChange}
          value={formData.content}
          required
          className="w-full text-lg outline-none mt-4 resize-none"
        />

        {/* Upload icon and clickable label */}
        <div className="flex items-center gap-2">
          <PhotoIcon className="w-5 h-5 text-gray-600" />
          <label htmlFor="image-upload" className="text-sm text-gray-700 cursor-pointer">
            Upload Image
          </label>
        </div>

        {/* Hidden input and filename status */}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        {fileName ? (
          <p className="text-sm text-gray-800">{fileName}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">No file chosen</p>
        )}

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
