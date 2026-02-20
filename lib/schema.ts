import type { BookReview } from './types';
import { getCategoryById } from './categories';

export function buildBookSchema(book: BookReview, reviewUrl: string) {
  const category = getCategoryById(book.categoryId);
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: book.author,
    },
    image: book.coverImage,
    ...(book.isbn && { isbn: book.isbn }),
    ...(category && { genre: category.name }),
  };
}

export function buildReviewSchema(book: BookReview, reviewUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: buildBookSchema(book, reviewUrl),
    reviewRating: {
      '@type': 'Rating',
      ratingValue: book.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Organization',
      name: 'Book, Please!',
    },
    reviewBody: book.excerpt,
    url: reviewUrl,
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
