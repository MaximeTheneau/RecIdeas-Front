/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function WebPageJsonLd({ page }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: `${process.env.NEXT_PUBLIC_URL}/${page.url}`,
    description: page.metaDescription,
    sameAs: [
      'https://www.facebook.com/people/RecIdeas/61565854959587/?sk=about',
      'https://www.instagram.com/rec.ideas/',
    ],
    image: `${page.imgPost}?format=jpeg`,
    inLanguage: page.locale,
    datePublished: page.createdAt,
    ...(page.updatedAt && { dateModified: page.updatedAt }),
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
