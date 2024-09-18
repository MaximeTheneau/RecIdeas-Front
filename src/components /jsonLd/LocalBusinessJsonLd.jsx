/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function LocalBusinessJsonLd({ descriptionMeta, reviewsData }) {
  const {
    result,
    reviews = result.reviews,
  } = reviewsData;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: result.name,
    description: descriptionMeta,
    image: 'https://picture.unetaupechezvous.fr/Une-Taupe-Chez-Vous-Taupier-10.webp',
    logo: 'https://picture.unetaupechezvous.fr/logo-une-taupe-chez-vous.png',
    sameAs: [
      'https://www.facebook.com/unetaupechezvous/',
      'https://twitter.com/UneTaupe_',
      'https://www.linkedin.com/company/une-taupe-chez-vous',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '71 rue Marie Curie',
      addressLocality: 'Garrenne Sur Eure',
      postalCode: '27780',
      addressCountry: 'FR',
    },
    telephone: '+33232264958',
    url: process.env.NEXT_PUBLIC_URL,
    areaServed: {
      '@type': 'Place',
      name: 'Yvelines',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: result.rating,
      reviewCount: result.user_ratings_total,
    },
    review: [
      reviews.map((review) => (
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: review.author_name,
          },
          datePublished: new Date(review.time * 1000).toISOString(),
          reviewBody: review.text,
          reviewRating: {
            '@type': 'rating',
            ratingValue: review.rating,
          },
        })),
    ],
    priceRange: 'À partir de 150 € TTC',
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
