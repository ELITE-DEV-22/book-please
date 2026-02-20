import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';
import SEOHead from '@/components/SEOHead';
import { buildBreadcrumbSchema } from '@/lib/schema';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bookplease.com';

export const metadata: Metadata = {
  title: 'Reading Guides & Book Lists',
  description:
    'High-converting reading guides and money pages from Book, Please! Discover the best books to read in 2026, self-help essentials, thrillers, and more.',
  openGraph: {
    title: 'Reading Guides & Book Lists | Book, Please!',
    description:
      'SEO-optimized book guides and lists to help you find the best books to read in every category—fiction, self-help, business, and more.',
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: BASE_URL + '/' },
  { name: 'Guides', url: BASE_URL + '/guides' },
]);

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <>
      <SEOHead schema={breadcrumbSchema} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <header className="mb-8 sm:mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Reading Guides &amp; Money Pages
          </h1>
          <p className="text-blue-grey text-lg max-w-2xl mt-2">
            Premium, long-form guides that surface the best books to read in every category—built
            to rank, to convert, and to actually help readers.
          </p>
          <div className="mt-4 h-px w-20 bg-beige rounded-full" aria-hidden />
        </header>

        <section aria-label="All guides">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
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
                    <h2 className="font-serif text-lg font-semibold text-navy mb-2 group-hover:text-navy/85 transition-colors">
                      {guide.title}
                    </h2>
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

          {guides.length === 0 && (
            <p className="text-blue-grey mt-8">
              No guides published yet. Add MDX files under <code>content/guides/</code> to see them
              here.
            </p>
          )}
        </section>
      </div>
    </>
  );
}

