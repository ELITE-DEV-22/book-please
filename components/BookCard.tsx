'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCategoryById } from '@/lib/categories';

/** Minimal review shape for list/card display (from MDX or legacy books). */
export interface BookCardReview {
  slug: string;
  title: string;
  author: string;
  categoryId: string;
  rating: number;
  excerpt: string;
  coverImage: string;
  affiliateUrl: string;
}

interface BookCardProps {
  book: BookCardReview;
  index?: number;
  showCategory?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? 'text-beige' : 'text-blue-grey/40'}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function BookCard({ book, index = 0, showCategory = true }: BookCardProps) {
  const category = getCategoryById(book.categoryId);

  return (
    <motion.article
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-cream rounded-2xl border border-beige/60 shadow-soft overflow-hidden hover:shadow-soft-lg hover:border-beige transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row">
        <Link href={`/reviews/${book.slug}`} className="block sm:w-32 flex-shrink-0 p-4 sm:p-5">
          <div className="relative aspect-[2/3] max-w-[140px] mx-auto sm:mx-0 rounded-lg overflow-hidden bg-blue-grey/20 shadow-soft">
          <img
          src={book.coverImage}
          alt={`Cover of ${book.title} by ${book.author}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
          </div>
        </Link>
        <div className="flex-1 p-4 sm:p-5 sm:pl-0 flex flex-col">
          {showCategory && category && (
            <span className="text-xs font-medium text-blue-grey uppercase tracking-wider mb-1">
              {category.name}
            </span>
          )}
          <Link href={`/reviews/${book.slug}`} className="group/link">
            <h2 className="font-serif text-xl font-semibold text-navy group-hover/link:text-navy/80 transition-colors line-clamp-2">
              {book.title}
            </h2>
          </Link>
          <p className="text-sm text-blue-grey mt-0.5">{book.author}</p>
          <div className="mt-2">
            <StarRating rating={book.rating} />
          </div>
          <p className="text-sm text-navy/80 mt-3 line-clamp-3 flex-1">{book.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/reviews/${book.slug}`}
              className="text-sm font-medium text-navy underline underline-offset-2 hover:no-underline"
            >
              Read Full Review
            </Link>
            <a
              href={book.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy text-cream text-sm font-medium hover:bg-navy/90 transition-colors"
            >
              Buy on Amazon
              <span className="text-cream/70" aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
