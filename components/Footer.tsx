import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-semibold text-beige mb-3">Book, Please!</h3>
            <p className="text-blue-grey text-sm">
              Trusted book reviews and reading guides. Honest reviews, curated recommendations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-beige mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/reviews" className="text-blue-grey hover:text-cream transition-colors">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-grey hover:text-cream transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-beige mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-blue-grey">
              <li>
                <Link href="/about#disclosure" className="hover:text-cream transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-navy/60 text-center text-blue-grey text-sm">
          &copy; {currentYear} Book, Please!. All rights reserved.
        </div>
      </div>
    </footer>
  );
}