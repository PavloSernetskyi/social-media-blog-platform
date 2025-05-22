// 'use client';
// import { useState } from 'react';
// import Link from 'next/link'; // ← add this

// const slugify = (title: string) =>
//   title
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dashes
//     .replace(/(^-|-$)+/g, '');   // trim starting/ending dashes

// export default function WritePage() {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     slug: '',
//     authorName: '',
//     imageURL: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     const updatedData = {
//       ...formData,
//       [name]: value,
//     };

//     if (name === 'title') {
//       updatedData.slug = slugify(value); // auto-generate slug
//     }

//     setFormData(updatedData);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/posts', {
//       method: 'POST',
//       body: JSON.stringify(formData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (res.ok) {
//       alert('✅ Post created!');
//       setFormData({ title: '', content: '', slug: '', authorName: '', imageURL: '' }); // reset form
//     } else {
//       alert('❌ Failed to create post.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black px-6 py-10">
//       {/* ← Back link */}
//       <div className="max-w-3xl mx-auto mb-6">
//         <Link href="/" className="text-blue-600 hover:underline text-sm">
//           ← Back to Home
//         </Link>
//       </div>

//       <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
//         <input
//           name="title"
//           placeholder="Title"
//           onChange={handleChange}
//           value={formData.title}
//           required
//           className="text-4xl font-bold w-full outline-none placeholder-gray-400"
//         />

//         <input
//           name="authorName"
//           placeholder="Your name"
//           onChange={handleChange}
//           value={formData.authorName}
//           required
//           className="text-sm text-gray-600 outline-none w-full"
//         />

//         <textarea
//           name="content"
//           placeholder="Tell your story..."
//           rows={12}
//           onChange={handleChange}
//           value={formData.content}
//           required
//           className="w-full text-lg outline-none mt-4 resize-none"
//         />

//         <button
//           type="submit"
//           className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
//         >
//           Publish
//         </button>
//       </form>
//     </div>
//   );
// }
'use client';
import { useState } from 'react';
import Link from 'next/link';

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
    imageUrl: '', // ✅ fixed: use imageUrl to match everywhere
  });

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
      alert('✅ Post created!');
      setFormData({ title: '', content: '', slug: '', authorName: '', imageUrl: '' });
    } else {
      alert('❌ Failed to create post.');
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

        {/*Image upload field */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm mb-4"
        />

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
