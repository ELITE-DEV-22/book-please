import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { CategoryId } from './types';
import { CATEGORIES } from './categories';
import type { ReviewFrontmatter, ReviewMeta, ReviewWithContent } from './review-types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'reviews');

/** Map frontmatter category string to CategoryId. */
function categoryToId(category: string): CategoryId {
  const normalized = category.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-');
  const found = CATEGORIES.find(
    (c) => c.slug === normalized || c.name.toLowerCase() === category.toLowerCase()
  );
  return (found?.id ?? 'non-fiction') as CategoryId;
}

/** Get excerpt from content (strip markdown, first ~160 chars) or use frontmatter. */
function getExcerpt(content: string, frontmatter: ReviewFrontmatter): string {
  if (frontmatter.excerpt && frontmatter.excerpt.trim()) return frontmatter.excerpt.trim();
  const plain = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();
  return plain.slice(0, 160) + (plain.length > 160 ? '…' : '');
}

/** Read all MDX filenames and return slugs. */
function getReviewSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

/** Parse one MDX file into frontmatter + content. */
function parseReviewFile(slug: string): { frontmatter: ReviewFrontmatter; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as ReviewFrontmatter;
  if (!frontmatter.title || !frontmatter.author) return null;
  return {
    frontmatter: {
      ...frontmatter,
      keywords: Array.isArray(frontmatter.keywords) ? frontmatter.keywords : [],
    },
    content: content.trim(),
  };
}

/** Build ReviewMeta from slug + parsed file. */
function toReviewMeta(slug: string, frontmatter: ReviewFrontmatter, content: string): ReviewMeta {
  const categoryId = categoryToId(frontmatter.category);
  return {
    slug,
    title: frontmatter.title,
    author: frontmatter.author,
    category: frontmatter.category,
    categoryId,
    rating: Number(frontmatter.rating) || 5,
    publishDate: frontmatter.publishDate || '',
    affiliateLink: frontmatter.affiliateLink || '#',
    coverImage: frontmatter.coverImage || '/images/placeholder-book.svg',
    keywords: Array.isArray(frontmatter.keywords) ? frontmatter.keywords : [],
    excerpt: getExcerpt(content, frontmatter),
    isbn: frontmatter.isbn,
  };
}

/**
 * Returns metadata for all reviews (for list page, cards, filters).
 * Sorted by publishDate descending by default.
 */
export function getAllReviews(): ReviewMeta[] {
  const slugs = getReviewSlugs();
  const reviews: ReviewMeta[] = [];
  for (const slug of slugs) {
    const parsed = parseReviewFile(slug);
    if (parsed) {
      reviews.push(toReviewMeta(slug, parsed.frontmatter, parsed.content));
    }
  }
  return sortReviewsByDate(reviews);
}

/**
 * Returns a single review by slug with full MDX content.
 * Use for the review page; content is passed to MDXRemote.
 */
export function getReviewBySlug(slug: string): ReviewWithContent | null {
  const parsed = parseReviewFile(slug);
  if (!parsed) return null;
  const meta = toReviewMeta(slug, parsed.frontmatter, parsed.content);
  return { meta, content: parsed.content };
}

/**
 * Filter reviews by category (categoryId).
 */
export function getReviewsByCategory(reviews: ReviewMeta[], categoryId: string): ReviewMeta[] {
  if (!categoryId) return reviews;
  return reviews.filter((r) => r.categoryId === categoryId);
}

/**
 * Sort reviews by publishDate descending (newest first).
 */
export function sortReviewsByDate(reviews: ReviewMeta[]): ReviewMeta[] {
  return [...reviews].sort((a, b) => {
    const dA = new Date(a.publishDate).getTime();
    const dB = new Date(b.publishDate).getTime();
    return dB - dA;
  });
}
