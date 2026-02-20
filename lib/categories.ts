import type { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'fiction', name: 'Fiction', slug: 'fiction', description: 'Literary and general fiction reviews' },
  { id: 'mystery-thriller', name: 'Mystery & Thriller', slug: 'mystery-thriller', description: 'Mystery and thriller book reviews' },
  { id: 'romance', name: 'Romance', slug: 'romance', description: 'Romance novel reviews' },
  { id: 'self-help', name: 'Self-Help', slug: 'self-help', description: 'Self-help and personal development' },
  { id: 'business-finance', name: 'Business & Finance', slug: 'business-finance', description: 'Business and finance book summaries' },
  { id: 'technology', name: 'Technology', slug: 'technology', description: 'Tech and productivity books' },
  { id: 'fantasy', name: 'Fantasy', slug: 'fantasy', description: 'Fantasy and speculative fiction' },
  { id: 'non-fiction', name: 'Non-Fiction', slug: 'non-fiction', description: 'Non-fiction and biography' },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
