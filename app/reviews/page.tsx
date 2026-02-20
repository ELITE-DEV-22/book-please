import { Suspense } from 'react';
import type { Metadata } from 'next';
import ReviewsClient from './ReviewsClient';
import SEOHead from '@/components/SEOHead';
import { getAllReviews } from '@/lib/reviews';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Book Reviews | Honest Reviews & Best Books to Read',
  description:
    'Honest book reviews and reading guides. Browse top fiction books, mystery thriller reviews, self-help, business book summaries, and bestselling books review roundups for 2026.',
  openGraph: {
    title: 'Book Reviews | Book, Please!',
    description: 'Honest book reviews and best books to read. Fiction, mystery, self-help, business, and more.',
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bookplease.com';
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: BASE_URL + '/' },
  { name: 'Reviews', url: BASE_URL + '/reviews' },
]);

export default function ReviewsPage() {
  const reviews = getAllReviews();
  const reviewsForClient = reviews.map((r) => ({
    ...r,
    affiliateUrl: r.affiliateLink,
  }));

  return (
    <>
      <SEOHead schema={breadcrumbSchema} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <header className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-2">
            Book Reviews
          </h1>
          <p className="text-blue-grey text-lg max-w-2xl">
            Honest book reviews and curated reading recommendations. Find the best books to read in every category—fiction, mystery thriller, self-help, business, and more.
          </p>
        </header>

        <Suspense fallback={<ReviewsFallback />}>
          <ReviewsClient initialReviews={reviewsForClient} />
        </Suspense>
      </div>
    </>
  );
}

function ReviewsFallback() {
  return (
    <div className="space-y-6">
      <div className="h-12 bg-blue-grey/20 rounded-xl w-full max-w-md" />
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-blue-grey/10 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
