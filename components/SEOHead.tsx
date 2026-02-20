export interface SEOHeadProps {
  schema?: object | object[];
}

/** Renders JSON-LD structured data for SEO. Use with App Router metadata for title/description. */
export default function SEOHead({ schema }: SEOHeadProps) {
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];
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
