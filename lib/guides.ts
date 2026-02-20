import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface GuideFrontmatter {
  title: string;
  publishDate: string;
  excerpt?: string;
  keywords?: string[];
  category?: string;
  // Optional: structured data helpers for ItemList
  items?: { title: string; url?: string }[];
}

export interface GuideMeta {
  slug: string;
  title: string;
  publishDate: string;
  excerpt: string;
  keywords: string[];
  category?: string;
  items?: { title: string; url?: string }[];
}

export interface GuideWithContent {
  meta: GuideMeta;
  content: string;
}

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

function getExcerptFromContent(content: string, fm: GuideFrontmatter): string {
  if (fm.excerpt && fm.excerpt.trim()) return fm.excerpt.trim();
  const plain = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();
  return plain.slice(0, 180) + (plain.length > 180 ? '…' : '');
}

function parseGuide(slug: string): GuideWithContent | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const fm = data as GuideFrontmatter;
  if (!fm.title) return null;

  const meta: GuideMeta = {
    slug,
    title: fm.title,
    publishDate: fm.publishDate || '',
    excerpt: getExcerptFromContent(content, fm),
    keywords: Array.isArray(fm.keywords) ? fm.keywords : [],
    category: fm.category,
    items: Array.isArray(fm.items) ? fm.items : undefined,
  };

  return { meta, content: content.trim() };
}

export function getAllGuides(): GuideMeta[] {
  const slugs = getGuideSlugs();
  const guides: GuideMeta[] = [];
  for (const slug of slugs) {
    const parsed = parseGuide(slug);
    if (parsed) guides.push(parsed.meta);
  }
  return guides.sort((a, b) => {
    const dA = new Date(a.publishDate).getTime();
    const dB = new Date(b.publishDate).getTime();
    return dB - dA;
  });
}

export function getGuideBySlug(slug: string): GuideWithContent | null {
  return parseGuide(slug);
}

