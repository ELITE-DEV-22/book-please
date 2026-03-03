import Image from 'next/image';
import Link from 'next/link';
import { getReviewBySlug } from '@/lib/reviews';

export interface GuideBookProps {
  /** Review slug, e.g. "atomic-habits" — used to pull cover + links from review MDX frontmatter. */
  slug: string;
  /** Optional override for display title; falls back to review meta.title. */
  title?: string;
  /** Optional override for author; falls back to review meta.author. */
  author?: string;
  children: React.ReactNode;
}

export default function GuideBook({ slug, title, author, children }: GuideBookProps) {
  const review = getReviewBySlug(slug);
  const meta = review?.meta;

  const displayTitle = title ?? meta?.title ?? 'Untitled book';
  const displayAuthor = author ?? meta?.author ?? 'Unknown author';
  const coverSrc = meta?.coverImage ?? '/images/placeholder-book.svg';
  const reviewHref = `/reviews/${slug}`;
  const affiliateHref = meta?.affiliateLink ?? '#';
  const alt = `Cover of ${displayTitle} by ${displayAuthor}`;

  return (
    <article className="mb-6 rounded-2xl border border-beige/60 bg-cream shadow-soft hover:shadow-soft-lg hover:border-beige transition-all duration-200">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5">
        <div className="sm:w-28 flex-shrink-0">
          <div className="relative aspect-[2/3] w-24 sm:w-28 rounded-lg overflow-hidden bg-blue-grey/20 shadow-soft">
            <Image
              src={coverSrc}
              alt={alt}
              fill
              sizes="112px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <header className="mb-2">
            <h3 className="font-serif text-lg font-semibold text-navy leading-snug">
              {displayTitle}
            </h3>
            <p className="text-sm text-blue-grey mt-0.5">by {displayAuthor}</p>
          </header>
          <div className="text-sm text-navy/90 leading-relaxed mb-3">{children}</div>
          <div className="mt-auto flex flex-wrap gap-3">
            <Link
              href={reviewHref}
              className="inline-flex items-center justify-center rounded-xl bg-navy text-cream text-sm font-medium px-4 py-2 hover:bg-navy/90 transition-colors"
            >
              Read Review
              <span aria-hidden className="ml-1">
                →
              </span>
            </Link>
            <a
              href={affiliateHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center rounded-xl border border-navy/15 bg-beige/70 text-navy text-sm font-medium px-4 py-2 hover:bg-beige/80 transition-colors"
            >
              Buy on Amazon
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

