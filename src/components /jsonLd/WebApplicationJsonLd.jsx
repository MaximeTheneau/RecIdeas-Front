/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function WebApplicationJsonLd({ page }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: page.title,
    url: process.env.NEXT_PUBLIC_URL,
    browserRequirements: 'Chrome 70+, Firefox 60+, Safari 12+, Edge 18+, Opera 56+.',
    description: page.metaDescription,
    applicationCategory: 'Multimedia',
    thumbnail: `${page.imgPost}?format=jpeg`,
    logo: 'https://picture.recideas.com/logo-recideas.webp?format=jpeg',
    sameAs: [
      'https://www.facebook.com/people/RecIdeas/61565854959587/?sk=about',
      'https://www.instagram.com/rec.ideas/',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingCount: page.comments.lenght || '0',
    },

    // review: [
    //   reviews.map((review) => (
    //     {
    //       '@type': 'Review',
    //       author: {
    //         '@type': 'Person',
    //         name: review.author_name,
    //       },
    //       datePublished: new Date(review.time * 1000).toISOString(),
    //       reviewBody: review.text,
    //       reviewRating: {
    //         '@type': 'rating',
    //         ratingValue: review.rating,
    //       },
    //     })),
    // ],
    offers: {
      '@type': 'Offer',
      price: 0,
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
