import Head from 'next/head';

export default function RecypeJsonLd({ post }) {
  const jsonLdData = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: post.title,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.createdAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    image: [
      `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}?format=jpeg`,
    ],
    author: {
      '@type': 'Person',
      name: 'Theneau Maxime',
    },
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
