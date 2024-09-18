import Head from 'next/head';

export default function BreadcrumbJsonLd({ paragraphPosts, urlPost }) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: paragraphPosts.map((paragraphArticle, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: paragraphArticle.subtitle,
              item: `${urlPost}#${paragraphArticle.slug}`,
            })),
          }),
        }}
      />
    </Head>
  );
}
