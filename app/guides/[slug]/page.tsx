import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllGuides, getGuideBySlug } from '@/lib/guides';
import { buildBreadcrumbSchema } from '@/lib/schema';
import SEOHead from '@/components/SEOHead';
import { useMDXComponents } from '@/components/mdx/MDXComponents';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bookplease.com';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Guide not found' };

  const { meta } = guide;
  const title = `${meta.title} | Book, Please!`;
  const description = meta.excerpt.slice(0, 155) + (meta.excerpt.length > 155 ? '…' : '');

  return {
    title,
    description,
    keywords: meta.keywords?.length ? meta.keywords : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${BASE_URL}/guides/${meta.slug}`,
      publishedTime: meta.publishDate,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { meta, content } = guide;
  const guideUrl = `${BASE_URL}/guides/${meta.slug}`;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: BASE_URL + '/' },
    { name: 'Guides', url: BASE_URL + '/guides' },
    { name: meta.title, url: guideUrl },
  ]);

  const itemListSchema =
    meta.items && meta.items.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: meta.title,
          itemListOrder: 'http://schema.org/ItemListOrderAscending',
          itemListElement: meta.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            url: item.url ? `${BASE_URL}${item.url}` : undefined,
          })),
        }
      : undefined;

  const components = useMDXComponents({});

  return (
    <>
      <SEOHead schema={[breadcrumbSchema, ...(itemListSchema ? [itemListSchema] : [])]} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <nav className="text-sm text-blue-grey mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-navy">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{meta.title}</span>
        </nav>

        <header className="mb-8">
          {meta.category && (
            <p className="text-xs font-medium uppercase tracking-wider text-blue-grey mb-1">
              {meta.category}
            </p>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            {meta.title}
          </h1>
          {meta.publishDate && (
            <time
              dateTime={meta.publishDate}
              className="text-sm text-blue-grey mt-2 block"
            >
              Updated{' '}
              {new Date(meta.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </header>

        <div className="prose-review">
          <MDXRemote source={content} components={components} />
        </div>
      </article>
    </>
  );
}

