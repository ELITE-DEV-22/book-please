# Book, Please!

A modern, SEO-optimized book review website focused on affiliate marketing, high traffic, and monetization. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Design

- **Primary Dark Navy:** `#30364F`
- **Muted Blue Grey:** `#ACBAC4`
- **Warm Beige:** `#E1D9BC`
- **Soft Cream Background:** `#F0F0DB`

## Features

- **Landing page** — Hero with book-opening animation, featured reviews, category grid, newsletter, ad placeholders
- **Reviews hub** — Category filters, search, pagination, affiliate CTAs
- **Individual review pages** — Full content, JSON-LD (Book + Review + Breadcrumb), affiliate buttons
- **About page** — Mission, trust, team placeholder, affiliate disclosure
- **SEO** — Meta titles/descriptions, OpenGraph, structured data, semantic HTML, internal linking
- **Responsive** — Mobile-first navbar, responsive cards and layout

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## MDX content (reviews)

Reviews are MDX files in **`content/reviews/`**. Each `.mdx` file becomes a page at `/reviews/[slug]` (slug = filename without `.mdx`).

**Adding a new review:** create a new file, e.g. `content/reviews/my-book.mdx`, with frontmatter and markdown:

```yaml
---
title: "My Book Review"
author: "Author Name"
category: "Self-Help"   # or Fiction, Mystery & Thriller, Romance, etc.
rating: 5
publishDate: "2026-02-15"
affiliateLink: "https://www.amazon.com/dp/XXX?tag=your-tag"
coverImage: "/images/my-book.jpg"
keywords: ["keyword one", "keyword two"]
excerpt: "Short description for cards and SEO."
---
```

Then write the review body in Markdown/MDX. Rebuild or run `npm run dev`; the new review appears on `/reviews`, the home featured section (if in top 4 by date), and at `/reviews/my-book`.

- **Cover images:** put files in `public/images/` and set `coverImage: "/images/filename.jpg"`.
- **Categories:** use display names that match `lib/categories.ts` (e.g. "Self-Help", "Fiction", "Mystery & Thriller").

## Project structure

- `app/` — App Router pages (`, `reviews`, `reviews/[slug]`, `about`)
- `content/reviews/` — MDX review files (one file = one review page)
- `components/` — Navbar, Hero, BookCard, CategoryFilter, Footer, SEOHead, Newsletter, AdPlaceholder, mdx/
- `lib/` — Types, categories, **reviews** (MDX loading), schema helpers

## Monetization

- Affiliate “Buy on Amazon” buttons on every review and card
- `AdPlaceholder` components for ad slots (after hero, between cards, sidebar)
- Replace placeholders with your ad code or affiliate links

## Environment

Optional: set `NEXT_PUBLIC_SITE_URL` for canonical URLs and OpenGraph (e.g. `https://bookplease.com`).
