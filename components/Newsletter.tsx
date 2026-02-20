'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    // Placeholder: wire to your email provider (e.g. ConvertKit, Mailchimp)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  }

  return (
    <section className="py-16 bg-navy text-cream" aria-labelledby="newsletter-heading">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          id="newsletter-heading"
          className="font-serif text-2xl sm:text-3xl font-semibold text-beige mb-2"
          initial={{ opacity: 1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get reading recommendations
        </motion.h2>
        <motion.p
          className="text-blue-grey mb-6"
          initial={{ opacity: 1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          Join our newsletter for honest book reviews and best books to read, delivered to your inbox.
        </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          initial={{ opacity: 1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-4 py-3 rounded-xl bg-cream/10 border border-beige/30 text-cream placeholder-blue-grey focus:outline-none focus:ring-2 focus:ring-beige"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3 rounded-xl bg-beige text-navy font-medium hover:bg-beige/90 transition-colors disabled:opacity-70"
          >
            {status === 'loading' ? 'Subscribing…' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
