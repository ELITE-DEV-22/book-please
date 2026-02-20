import type { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';

export const metadata: Metadata = {
  title: 'About Us | Mission & Trust',
  description:
    'Learn about Book, Please! Our mission is honest book reviews, curated reading recommendations, and helping you find the best books to read. Affiliate disclosure included.',
  openGraph: {
    title: 'About Book, Please!',
    description: 'Honest book reviews and reading guides. Our mission and why readers trust us.',
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Book, Please!',
  description: 'Mission, team, and affiliate disclosure for Book, Please! – trusted book reviews and reading guides.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://bookplease.com') + '/about',
};

export default function AboutPage() {
  return (
    <>
      <SEOHead schema={aboutSchema} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-8">
          About Book, Please!
        </h1>

        <section className="mb-12" aria-labelledby="mission">
          <h2 id="mission" className="font-serif text-2xl font-semibold text-navy mb-4">
            Our Mission
          </h2>
          <p className="text-navy/90 leading-relaxed mb-4">
            <strong>Book, Please!</strong> exists to help readers find their next great read. We publish honest book reviews, 
            curated reading recommendations, and guides so you can discover the best books to read—whether you're into 
            top fiction books, mystery thriller reviews, self-help book reviews, business book summaries, or bestselling books.
          </p>
          <p className="text-navy/90 leading-relaxed">
            We focus on quality over quantity. Every review is written to give you a clear sense of what a book offers 
            and whether it's right for you. No fluff, no hype—just useful, trustworthy book recommendations for 2026 and beyond.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="trust">
          <h2 id="trust" className="font-serif text-2xl font-semibold text-navy mb-4">
            Why Readers Trust Us
          </h2>
          <ul className="list-disc list-inside text-navy/90 space-y-2 leading-relaxed">
            <li><strong>Honest book reviews</strong> — We share what we really think, including downsides when relevant.</li>
            <li><strong>Curated recommendations</strong> — We only review books we believe are worth your time.</li>
            <li><strong>Clear categories</strong> — Fiction, mystery & thriller, romance, self-help, business & finance, technology, fantasy, and non-fiction.</li>
            <li><strong>SEO-friendly and reader-friendly</strong> — Our content is built to help you find answers and discover new titles.</li>
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="team">
          <h2 id="team" className="font-serif text-2xl font-semibold text-navy mb-4">
            The Team
          </h2>
          <p className="text-navy/90 leading-relaxed">
            Book, Please! is run by a small team of avid readers and reviewers. We're book lovers first—we read across 
            genres and care about helping others find stories and ideas that matter. (Team member bios and photos can be 
            added here as you grow.)
          </p>
        </section>

        <section id="disclosure" className="mb-12 rounded-2xl bg-beige/40 border border-beige p-6" aria-labelledby="disclosure-heading">
          <h2 id="disclosure-heading" className="font-serif text-2xl font-semibold text-navy mb-4">
            Affiliate Disclosure
          </h2>
          <p className="text-navy/90 leading-relaxed mb-4">
            To support the site, we use affiliate links. When you click a "Buy on Amazon" (or similar) button and make a 
            purchase, we may earn a small commission at no extra cost to you. This helps us keep producing honest book 
            reviews and reading guides.
          </p>
          <p className="text-navy/90 leading-relaxed">
            Our recommendations are not influenced by affiliate partnerships. We only recommend books we genuinely 
            believe are among the best books to read in their category. Thank you for supporting Book, Please!
          </p>
        </section>

        <p className="text-blue-grey">
          <Link href="/reviews" className="text-navy font-medium hover:underline">
            Browse all book reviews
          </Link>
          {' · '}
          <Link href="/" className="text-navy font-medium hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </>
  );
}
