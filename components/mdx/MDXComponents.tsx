import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

/**
 * Tailwind-styled components for MDX content.
 * Used by next-mdx-remote for consistent, safe rendering.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http');
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy underline underline-offset-2 hover:text-navy/80"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href ?? '#'} className="text-navy underline underline-offset-2 hover:text-navy/80" {...props}>
          {children}
        </Link>
      );
    },
    h2: ({ children, ...props }) => (
      <h2 className="font-serif text-xl font-semibold text-navy mt-8 mb-3" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="font-serif text-lg font-semibold text-navy mt-6 mb-2" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-navy/90 leading-relaxed mb-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside text-navy/90 space-y-1 mb-4 pl-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside text-navy/90 space-y-1 mb-4 pl-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-navy" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-navy/90" {...props}>
        {children}
      </em>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-beige pl-4 py-1 my-4 text-navy/80 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code
        className="px-1.5 py-0.5 rounded bg-blue-grey/20 text-navy text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre className="overflow-x-auto rounded-lg bg-navy/5 p-4 my-4 text-sm" {...props}>
        {children}
      </pre>
    ),
    ...components,
  };
}
