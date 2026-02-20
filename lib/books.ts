import type { BookReview } from './types';

// Placeholder cover URLs – replace with real affiliate/Amazon cover images in production
const placeholder = (title: string) =>
  `https://placehold.co/200x300/E1D9BC/30364F?text=${encodeURIComponent(title.slice(0, 15))}`;

export const BOOKS: BookReview[] = [
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    categoryId: 'self-help',
    rating: 5,
    excerpt:
      'Tiny changes, remarkable results. Our honest book review of Atomic Habits covers why this self-help staple deserves its spot among the best books to read for building better habits and lasting change.',
    coverImage: placeholder('Atomic Habits'),
    publishedAt: '2025-01-15',
    affiliateUrl: 'https://www.amazon.com/dp/0735211299?tag=bookplease-20',
    isbn: '978-0735211292',
    fullContent: `Atomic Habits by James Clear is one of the most impactful self-help books of the decade. Our book review finds it delivers on its promise: small, consistent changes compound into remarkable results.

**Why we recommend it:** Clear's framework (Cue, Craving, Response, Reward) is easy to apply. Whether you want to read more, exercise, or build a business habit, this book gives you the system. Perfect for anyone searching for honest book reviews on habit-building—we stand behind this as a top pick for best books to read in the self-help category.

**Best for:** Readers who want actionable, science-backed advice without fluff. Ideal for book recommendations 2026.`,
  },
  {
    slug: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    categoryId: 'fiction',
    rating: 5,
    excerpt:
      'A lone astronaut must save Earth in this gripping science fiction novel. Our fiction book review explores why Project Hail Mary ranks among the top fiction books and best books to read in 2026.',
    coverImage: placeholder('Project Hail Mary'),
    publishedAt: '2025-01-10',
    affiliateUrl: 'https://www.amazon.com/dp/0593135202?tag=bookplease-20',
    isbn: '978-0593135204',
    fullContent: `Andy Weir's Project Hail Mary is a bestselling books review favorite for good reason. It combines hard science with heart and humor.

**Why we recommend it:** If you loved The Martian, this delivers the same voice with a grander stakes. Our honest book review: the pacing is excellent, the science is fun, and the friendship at the core is memorable. One of our top book recommendations 2026 for fiction and science fiction fans.`,
  },
  {
    slug: 'the-midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    categoryId: 'fiction',
    rating: 4,
    excerpt:
      'Between life and death there is a library. Our book review of The Midnight Library examines this bestselling novel about regret, choice, and the lives we might have led—a standout in top fiction books.',
    coverImage: placeholder('The Midnight Library'),
    publishedAt: '2025-01-08',
    affiliateUrl: 'https://www.amazon.com/dp/0525559477?tag=bookplease-20',
    isbn: '978-0525559474',
    fullContent: `The Midnight Library by Matt Haig has earned its place on every "best books to read" list. Our book review finds it thoughtful and uplifting.

**Why we recommend it:** The concept—a library where each book is a different version of your life—is executed with warmth and wit. Haig balances heavy themes with readability. A strong pick for readers who want fiction that feels meaningful. Honest book reviews often cite the ending; we found it satisfying.`,
  },
  {
    slug: 'the-silent-patient',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    categoryId: 'mystery-thriller',
    rating: 4,
    excerpt:
      'A woman shoots her husband and never speaks again. Our mystery thriller review of The Silent Patient breaks down the twists that make it a must-read in mystery thriller reviews and bestseller lists.',
    coverImage: placeholder('The Silent Patient'),
    publishedAt: '2025-01-05',
    affiliateUrl: 'https://www.amazon.com/dp/1250301696?tag=bookplease-20',
    isbn: '978-1250301697',
    fullContent: `The Silent Patient is a staple in mystery thriller reviews for its sharp twist and tight pacing. Our honest book review: it delivers a memorable payoff.

**Why we recommend it:** Michaelides keeps you guessing without feeling cheap. The therapy-frame narrative adds depth. If you're looking for mystery thriller reviews that lead to a single unputdownable book, this is it. One of our top mystery thriller picks for book recommendations 2026.`,
  },
  {
    slug: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    categoryId: 'business-finance',
    rating: 5,
    excerpt:
      'Rules for focused success in a distracted world. Our business book summary of Deep Work explains why it remains essential reading for productivity and career growth—a key business book summary.',
    coverImage: placeholder('Deep Work'),
    publishedAt: '2025-01-12',
    affiliateUrl: 'https://www.amazon.com/dp/1455586692?tag=bookplease-20',
    isbn: '978-1455586691',
    fullContent: `Cal Newport's Deep Work is a business book summary favorite. Our book review finds it one of the best books to read for anyone who needs to do cognitively demanding work.

**Why we recommend it:** Newport makes a compelling case for blocking distraction and building a deep work habit. The business book summary takeaway: focus is a skill you can train. Highly recommended in our honest book reviews for knowledge workers and students.`,
  },
  {
    slug: 'the-seven-husbands-of-evelyn-hugo',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    categoryId: 'romance',
    rating: 5,
    excerpt:
      'A legendary star tells her story at last. Our romance and fiction book review of The Seven Husbands of Evelyn Hugo explores why it tops best books to read and book recommendations 2026 lists.',
    coverImage: placeholder('Evelyn Hugo'),
    publishedAt: '2025-01-03',
    affiliateUrl: 'https://www.amazon.com/dp/1501161938?tag=bookplease-20',
    isbn: '978-1501161933',
    fullContent: `The Seven Husbands of Evelyn Hugo is that rare book that crosses romance, historical fiction, and literary appeal. Our book review: it's one of the best books to read for character and plot.

**Why we recommend it:** Reid's storytelling is immersive. You get Hollywood glamour, secrets, and a moving love story. Consistently in bestselling books review roundups—our honest book review agrees. Strong pick for book recommendations 2026.`,
  },
  {
    slug: 'the-pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    categoryId: 'technology',
    rating: 5,
    excerpt:
      'Your journey to mastery. Our technology book review of The Pragmatic Programmer covers why it remains a top book for software developers and one of the best books to read in tech.',
    coverImage: placeholder('Pragmatic Programmer'),
    publishedAt: '2025-01-07',
    affiliateUrl: 'https://www.amazon.com/dp/0135957052?tag=bookplease-20',
    isbn: '978-0135957059',
    fullContent: `The Pragmatic Programmer is a technology book that has aged well. Our book review finds its advice on craft, automation, and career still relevant.

**Why we recommend it:** Practical tips you can use daily. Whether you're new or experienced, there's something to take away. Our honest book review places it among the best books to read for developers. A solid book recommendations 2026 pick for the tech category.`,
  },
  {
    slug: 'the-midnight-bargain',
    title: 'The Midnight Bargain',
    author: 'C.L. Polk',
    categoryId: 'fantasy',
    rating: 4,
    excerpt:
      'Magic, marriage, and sacrifice in a Regency-style fantasy. Our fantasy book review of The Midnight Bargain explores its blend of romance and magic—a standout in fantasy and top fiction books.',
    coverImage: placeholder('The Midnight Bargain'),
    publishedAt: '2025-01-02',
    affiliateUrl: 'https://www.amazon.com/dp/0316499966?tag=bookplease-20',
    isbn: '978-0316499969',
    fullContent: `The Midnight Bargain by C.L. Polk is a fantasy novel with strong romance and a clever magic system. Our book review: it's fresh and engaging.

**Why we recommend it:** Polk balances societal stakes with personal desire. The heroine's choice between magic and marriage drives the plot. A strong entry in fantasy book reviews and a good book recommendations 2026 choice for fantasy and romance readers.`,
  },
  {
    slug: 'sapiens',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    categoryId: 'non-fiction',
    rating: 5,
    excerpt:
      "From the Stone Age to the 21st century. Our non-fiction book review of Sapiens explains why it's one of the best books to read for understanding humanity and a bestselling books review staple.",
    coverImage: placeholder('Sapiens'),
    publishedAt: '2025-01-01',
    affiliateUrl: 'https://www.amazon.com/dp/0062316117?tag=bookplease-20',
    isbn: '978-0062316110',
    fullContent: `Sapiens by Yuval Noah Harari is a non-fiction blockbuster. Our honest book review: it's sweeping, thought-provoking, and accessible.

**Why we recommend it:** Harari ties together biology, history, and culture in a narrative that keeps you turning pages. Consistently in best books to read and book recommendations 2026 lists. Our book review recommends it for anyone curious about how we got here.`,
  },
];

export function getBookBySlug(slug: string): BookReview | undefined {
  return BOOKS.find((b) => b.slug === slug);
}

export function getBooksByCategory(categoryId: string): BookReview[] {
  if (!categoryId) return BOOKS;
  return BOOKS.filter((b) => b.categoryId === categoryId);
}

export function getFeaturedBooks(limit = 4): BookReview[] {
  return BOOKS.slice(0, limit);
}
