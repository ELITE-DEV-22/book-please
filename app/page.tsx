import Link from 'next/link';
import Hero from '@/components/Hero';
import BookCard from '@/components/BookCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import Newsletter from '@/components/Newsletter';
import SEOHead from '@/components/SEOHead';
import { getAllReviews } from '@/lib/reviews';
import { getAllGuides } from '@/lib/guides';
import { CATEGORIES } from '@/lib/categories';

export default function HomePage() {
  const featured = getAllReviews().slice(0, 4).map((r) => ({ ...r, affiliateUrl: r.affiliateLink }));
  const popularGuides = getAllGuides().slice(0, 4);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Book, Please!',
    description: 'Trusted Book Reviews & Reading Guides. Honest book reviews, best books to read, and curated recommendations.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bookplease.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://bookplease.com/reviews?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SEOHead schema={websiteSchema} />
      <Hero />

      {/* Popular guides section */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-6"
        aria-labelledby="popular-guides"
      >
        <header className="mb-6">
          <h2 id="popular-guides" className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Popular Guides
          </h2>
          <p className="text-blue-grey mt-2 max-w-2xl">
            Curated money pages that highlight the best books to read in 2026—crafted to help you
            choose quickly and confidently.
          </p>
          <div className="mt-4 h-px w-16 bg-beige rounded-full" aria-hidden />
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-2xl"
            >
              <article className="h-full bg-cream rounded-2xl border border-beige/60 shadow-soft px-5 py-5 flex flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-soft-lg group-hover:border-beige">
                <div className="flex-1">
                  {guide.category && (
                    <span className="inline-flex items-center rounded-full border border-beige/70 bg-beige/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-grey mb-3">
                      {guide.category}
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-semibold text-navy mb-2 group-hover:text-navy/85 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-navy/80 leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 text-xs sm:text-sm text-blue-grey">
                  {guide.publishDate && (
                    <time dateTime={guide.publishDate}>
                      {new Date(guide.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                  <span className="inline-flex items-center gap-1 font-medium text-navy group-hover:underline underline-offset-2">
                    Read guide
                    <span
                      aria-hidden
                      className="transform transition-transform duration-150 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <AdPlaceholder label="Ad – After hero" className="max-w-6xl mx-auto px-4 sm:px-6 mb-12" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12" aria-labelledby="featured-reviews">
        <header className="mb-6 sm:mb-8 text-center">
          <h2 id="featured-reviews" className="font-serif text-3xl font-bold text-navy">
            Featured Reviews
          </h2>
          <p className="text-blue-grey mt-2 max-w-2xl mx-auto">
            A rotating selection of books we think are especially worth your time right now.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((book, i) => (
            <BookCard key={book.slug} book={book} index={i} showCategory />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-navy font-medium hover:underline"
          >
            View all reviews
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 bg-beige/30 rounded-3xl"
        aria-labelledby="categories"
      >
        <header className="text-center mb-6">
          <h2 id="categories" className="font-serif text-3xl font-bold text-navy">
            Browse by Category
          </h2>
          <p className="text-blue-grey mt-2 max-w-2xl mx-auto">
            Find the best books to read in fiction, mystery &amp; thriller, self-help, business, and
            more.
          </p>
        </header>
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/reviews?category=${cat.id}`}
              className="w-full text-center p-4 rounded-xl bg-cream border border-beige/60 shadow-soft hover:shadow-soft-lg hover:border-beige transition-all text-navy font-medium"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <AdPlaceholder label="Ad – Between sections" className="max-w-6xl mx-auto px-4 sm:px-6 my-12" />

      <Newsletter />
    </>
  );
}
