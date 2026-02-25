export interface SEOHeadProps {
  schema?: object | object[];
}

/** Renders JSON-LD structured data for SEO */
export default function SEOHead({ schema }: SEOHeadProps) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://book-please.vercel.app";

  // 🔥 Default site schema (VERY IMPORTANT)
  const defaultSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Book, Please!",
      url: BASE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/reviews?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Book, Please!",
      url: BASE_URL,
      logo: `${BASE_URL}/images/logo.png`, // optional
    },
  ];

  const customSchemas = Array.isArray(schema)
    ? schema
    : schema
    ? [schema]
    : [];

  const schemas = [...defaultSchemas, ...customSchemas];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}