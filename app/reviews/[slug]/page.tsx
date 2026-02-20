import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllReviews, getReviewBySlug } from '@/lib/reviews';
import { getCategoryById } from '@/lib/categories';
import { buildBookSchema, buildReviewSchema, buildBreadcrumbSchema } from '@/lib/schema';
import SEOHead from '@/components/SEOHead';
import AdPlaceholder from '@/components/AdPlaceholder';
import { useMDXComponents } from '@/components/mdx/MDXComponents';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bookplease.com';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const reviews = getAllReviews();
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return { title: 'Review not found' };

  const { meta } = review;
  const title = `${meta.title} | Book, Please!`;
  const description = meta.excerpt.slice(0, 155) + (meta.excerpt.length > 155 ? '…' : '');

  const ogImage = meta.coverImage.startsWith('http') ? meta.coverImage : `${BASE_URL}${meta.coverImage}`;

  return {
    title,
    description,
    keywords: meta.keywords?.length ? meta.keywords : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: meta.publishDate,
      images: [{ url: ogImage, alt: `${meta.title} cover` }],
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const { meta, content } = review;
  const category = getCategoryById(meta.categoryId);
  const reviewUrl = `${BASE_URL}/reviews/${meta.slug}`;

  const bookForSchema = {
    slug: meta.slug,
    title: meta.title,
    author: meta.author,
    categoryId: meta.categoryId,
    rating: meta.rating,
    excerpt: meta.excerpt,
    coverImage: meta.coverImage.startsWith('http') ? meta.coverImage : `${BASE_URL}${meta.coverImage}`,
    affiliateUrl: meta.affiliateLink,
    isbn: meta.isbn,
    publishedAt: meta.publishDate,
  };

  const bookSchema = buildBookSchema(bookForSchema, reviewUrl);
  const reviewSchema = buildReviewSchema(bookForSchema, reviewUrl);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: BASE_URL + '/' },
    { name: 'Reviews', url: BASE_URL + '/reviews' },
    { name: meta.title, url: reviewUrl },
  ]);

  const components = useMDXComponents({});

  return (
    <>
      <SEOHead schema={[bookSchema, reviewSchema, breadcrumbSchema]} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <nav className="text-sm text-blue-grey mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/reviews" className="hover:text-navy">Reviews</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{meta.title}</span>
        </nav>

        <header className="mb-8">
          {category && (
            <Link
              href={`/reviews?category=${meta.categoryId}`}
              className="text-xs font-medium text-blue-grey uppercase tracking-wider hover:text-navy"
            >
              {category.name}
            </Link>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mt-1">
            {meta.title}
          </h1>
          <p className="text-lg text-blue-grey mt-1">by {meta.author}</p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="flex gap-0.5" aria-label={`Rating: ${meta.rating} out of 5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={i <= meta.rating ? 'text-beige' : 'text-blue-grey/40'}>★</span>
              ))}
            </div>
            {meta.publishDate && (
              <time dateTime={meta.publishDate} className="text-sm text-blue-grey">
                {new Date(meta.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>
        </header>

        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          <div className="relative aspect-[2/3] w-48 flex-shrink-0 rounded-xl overflow-hidden bg-blue-grey/20 shadow-soft">
            <Image
              src={meta.coverImage}
              alt={`Cover of ${meta.title}`}
              fill
              sizes="192px"
              priority
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-navy/90 leading-relaxed">{meta.excerpt}</p>
            <a
              href={meta.affiliateLink}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-navy text-cream font-medium hover:bg-navy/90 transition-colors"
            >
              Buy on Amazon
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <AdPlaceholder label="Ad – Before full review" className="my-8" />

        <div className="prose-review">
          <MDXRemote source={content} components={components} />
        </div>

        <div className="mt-10 pt-8 border-t border-beige">
          <a
            href={meta.affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-navy text-cream font-medium hover:bg-navy/90 transition-colors"
          >
            Get this book on Amazon
            <span aria-hidden>→</span>
          </a>
        </div>

        <p className="mt-8 text-sm text-blue-grey">
          As an Amazon Associate we earn from qualifying purchases. See our{' '}
          <Link href="/about#disclosure" className="underline hover:text-navy">affiliate disclosure</Link>.
        </p>
      </article>
    </>
  );
}
