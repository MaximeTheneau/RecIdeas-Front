import Head from 'next/head';

export default function ArticleJsonLd({ post, urlPost }) {
  const jsonLdData = {
    '@context': 'https://schema.org/',
    '@type': 'Article',
    name: post.title,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.createdAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    url: urlPost,
    articleSection: `${post.subcategory ? `${post.subcategory.name},` : ''} ${post.category.name}`,
    isAccessibleForFree: true,
    keywords: `${post.title}, ${post.category.name}${post.subcategory ? `, ${post.subcategory.name}` : ''}`,
    articleBody: post.contents,
    image: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}?format=jpeg`,
      caption: post.title,
    },
    associatedMedia: {
      '@type': 'ImageObject',
      contentUrl: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}?format=jpeg`,
      description: post.title,
    },
    author: {
      '@type': 'Person',
      name: 'Laurent THENEAU',
      url: `${process.env.NEXT_PUBLIC_URL}/Taupier-agree-professionnel-depuis-1994`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Une taupe chez vous',
    },
    commentCount: post.comments.length,
    comment: [
      post.comments.map((comment) => ({
        '@type': 'Comment',
        author: {
          '@type': 'Person',
          name: comment.User,
        },
        description: comment.comment,
        dateCreated: comment.createdAt,
      })),
    ],
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
