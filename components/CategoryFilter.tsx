'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/categories';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('category') || '';

  function setCategory(categoryId: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    params.delete('page');
    router.push(`/reviews?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      <button
        type="button"
        onClick={() => setCategory('')}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
          !current
            ? 'bg-navy text-cream'
            : 'bg-beige/50 text-navy hover:bg-beige'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => setCategory(cat.id)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            current === cat.id
              ? 'bg-navy text-cream'
              : 'bg-beige/50 text-navy hover:bg-beige'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
