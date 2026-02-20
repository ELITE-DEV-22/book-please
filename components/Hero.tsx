'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  // On the very first visit after deploy, hydration/animation timing can vary.
  // We render a static (non-hidden) hero first, then remount once on the client
  // so Framer Motion reliably runs initial → animate without requiring a refresh.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const playKey = mounted ? 'play' : 'static';

  const initialFadeUp = mounted ? { opacity: 0, y: 20 } : false;
  const animateFadeUp = { opacity: 1, y: 0 };

  return (
    <section className="relative overflow-hidden bg-cream pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div
        key={playKey}
        className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
      >
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy mb-4"
            initial={initialFadeUp}
            animate={animateFadeUp}
            transition={{ duration: 0.5 }}
          >
            Book, Please!
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-grey mb-8 max-w-xl mx-auto lg:mx-0"
            initial={initialFadeUp}
            animate={animateFadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Trusted Book Reviews & Reading Guides
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={initialFadeUp}
            animate={animateFadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy text-cream font-medium hover:bg-navy/90 transition-colors shadow-soft"
            >
              Reviews
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-beige text-navy font-medium hover:bg-beige/80 transition-colors border border-navy/10"
            >
              About
            </Link>
          </motion.div>
        </div>

        {/* Book opening animation */}
        <motion.div
          className="relative flex-shrink-0"
          initial={mounted ? { opacity: 0, scale: 0.92 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-48 h-64 sm:w-56 sm:h-72">
            {/* Book spine + left cover */}
            <motion.div
              className="absolute inset-0 rounded-book bg-navy shadow-soft-lg origin-right"
              style={{ transformStyle: 'preserve-3d' }}
              initial={
                mounted ? { transform: 'perspective(800px) rotateY(-50deg)' } : false
              }
              animate={{ transform: 'perspective(800px) rotateY(-15deg)' }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-cream/80 text-sm rotate-[-90deg] whitespace-nowrap tracking-widest">
                  BOOK, PLEASE
                </span>
              </div>
            </motion.div>
            {/* Right page (open book) */}
            <motion.div
              className="absolute right-0 top-0 w-[45%] h-full rounded-r-lg bg-cream border border-beige shadow-soft-lg origin-left"
              initial={
                mounted ? { transform: 'perspective(800px) rotateY(50deg)' } : false
              }
              animate={{ transform: 'perspective(800px) rotateY(15deg)' }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            >
              <div className="p-4 h-full flex flex-col justify-center text-navy/80 text-xs font-serif">
                <span className="block mb-1">Trusted reviews</span>
                <span className="block mb-1">Honest recommendations</span>
                <span className="block">Best books to read</span>
              </div>
            </motion.div>
            {/* Decorative line (spine) */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-navy/20 rounded-l-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
