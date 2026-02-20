import type { CategoryId } from './types';

/** Raw frontmatter as written in MDX (category is display name). */
export interface ReviewFrontmatter {
  title: string;
  author: string;
  category: string;
  rating: number;
  publishDate: string;
  affiliateLink: string;
  coverImage: string;
  keywords?: string[];
  excerpt?: string;
  isbn?: string;
}

/** Review metadata with slug and normalized categoryId for app use. */
export interface ReviewMeta {
  slug: string;
  title: string;
  author: string;
  category: string;
  categoryId: CategoryId;
  rating: number;
  publishDate: string;
  affiliateLink: string;
  coverImage: string;
  keywords: string[];
  excerpt: string;
  isbn?: string;
}

/** Full review for a single page: metadata + raw MDX content. */
export interface ReviewWithContent {
  meta: ReviewMeta;
  content: string;
}
