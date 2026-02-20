export type CategoryId =
  | 'fiction'
  | 'mystery-thriller'
  | 'romance'
  | 'self-help'
  | 'business-finance'
  | 'technology'
  | 'fantasy'
  | 'non-fiction';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
}

export interface BookReview {
  slug: string;
  title: string;
  author: string;
  categoryId: CategoryId;
  rating: number;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  affiliateUrl: string;
  isbn?: string;
  fullContent?: string;
}
