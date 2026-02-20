# Book review content (MDX)

Each `.mdx` file in this folder becomes a review page at `/reviews/[slug]`, where `slug` is the filename without `.mdx`.

## Frontmatter (required)

| Field           | Type     | Example / notes                                      |
|----------------|----------|------------------------------------------------------|
| `title`        | string   | `"Atomic Habits Review"`                            |
| `author`       | string   | `"James Clear"`                                      |
| `category`     | string   | `"Self-Help"`, `"Fiction"`, `"Mystery & Thriller"`, etc. |
| `rating`       | number   | 1–5                                                  |
| `publishDate`  | string   | `"2026-02-15"` (YYYY-MM-DD)                          |
| `affiliateLink`| string   | Your Amazon (or other) affiliate URL                 |
| `coverImage`   | string   | `"/images/atomic-habits.jpg"` (under `public/images/`) |
| `excerpt`      | string   | Short summary for cards and meta description (optional; auto from body if omitted) |
| `keywords`     | string[] | SEO keywords (optional)                              |
| `isbn`         | string   | For schema (optional)                               |

## Body

Write the review in **Markdown** (or MDX). You can use:

- **Bold**, *italic*, [links](url)
- Headings: `## Why we recommend it`
- Lists, blockquotes, code

Categories are normalized to slugs (e.g. "Self-Help" → `self-help`) for filtering on the reviews page.
