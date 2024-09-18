import Head from 'next/head';

export default function FaqJsonLd({ listPosts }) {
  const jsonLdData = {
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    mainEntity: listPosts.map((liste) => ({
      '@type': 'Question',
      name: liste.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: liste.description,
      },
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
    </Head>
  );
}
