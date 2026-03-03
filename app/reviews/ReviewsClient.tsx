'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard';
import CategoryFilter from '@/components/CategoryFilter';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { ReviewMeta } from '@/lib/review-types';

export type ReviewCardItem = ReviewMeta & { affiliateUrl: string };

const PER_PAGE = 6;

export default function ReviewsClient({ initialReviews }: { initialReviews: ReviewCardItem[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const q = (searchParams.get('q') || '').toLowerCase().trim();
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  const filtered = useMemo(() => {
    let list = category ? initialReviews.filter((b) => b.categoryId === category) : [...initialReviews];
    if (q) {
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, q, initialReviews]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageBooks = filtered.slice(start, start + PER_PAGE);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <CategoryFilter />
        <SearchBar initialQuery={q} category={category} />
      </div>

      <p className="text-blue-grey text-sm mb-6">
        {filtered.length} review{filtered.length !== 1 ? 's' : ''} found
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {pageBooks.map((book, i) => (
          <BookCard key={book.slug} book={book} index={i} showCategory />
        ))}
      </div>

      {pageBooks.length === 0 && (
        <p className="text-blue-grey py-12 text-center">No reviews match your filters. Try a different category or search.</p>
      )}

      {currentPage === 2 && (
        <AdPlaceholder label="Ad – Mid list" className="my-10" />
      )}

      {totalPages > 1 && (
        <nav className="mt-10 flex justify-center gap-2" aria-label="Pagination">
          {currentPage > 1 && (
            <a
              href={`/reviews?${new URLSearchParams({
                ...(category && { category }),
                ...(q && { q }),
                page: String(currentPage - 1),
              }).toString()}`}
              className="px-4 py-2 rounded-lg border border-beige text-navy font-medium hover:bg-beige/50"
            >
              Previous
            </a>
          )}
          <span className="px-4 py-2 text-blue-grey text-sm" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <a
              href={`/reviews?${new URLSearchParams({
                ...(category && { category }),
                ...(q && { q }),
                page: String(currentPage + 1),
              }).toString()}`}
              className="px-4 py-2 rounded-lg border border-beige text-navy font-medium hover:bg-beige/50"
            >
              Next
            </a>
          )}
        </nav>
      )}
    </>
  );
}

function SearchBar({ initialQuery, category }: { initialQuery: string; category: string }) {
  const [value, setValue] = useState(initialQuery);

  return (
    <form
      action="/reviews"
      method="get"
      className="flex-1 sm:max-w-xs"
      role="search"
    >
      {category && <input type="hidden" name="category" value={category} />}
      <label htmlFor="review-search" className="sr-only">
        Search reviews
      </label>
      <input
        id="review-search"
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search reviews…"
        className="w-full px-4 py-2.5 rounded-xl border border-beige bg-cream text-navy placeholder-blue-grey focus:outline-none focus:ring-2 focus:ring-navy/20"
      />
    </form>
  );
}
