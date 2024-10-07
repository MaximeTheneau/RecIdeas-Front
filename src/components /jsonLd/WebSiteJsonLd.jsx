/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function WebSiteJsonLd({ page }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: page.title,
    url: process.env.NEXT_PUBLIC_URL,
    sameAs: [
      'https://www.facebook.com/people/RecIdeas/61565854959587/?sk=about',
      'https://www.instagram.com/rec.ideas/',
    ],
    image: 'https://picture.recideas.com/15-idees-de-recettes-1.webp?format=jpeg',
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
