import type {
  GetStaticProps,
} from 'next';
import Head from 'next/head';
import { Post } from '@/types/post';
import fetcher from '../utils/fetcher';
import ImageLoader from '../components /image/ImageLoader';
import Comments from '../components /comments/Comments';

interface PageProps {
  pageData: {
    post: Post;
  };
}
export default function Page({ pageData }: PageProps) {
  // if (isFallback) {
  //   return <div>Loading...</div>; // Affichez un indicateur de chargement
  // }

  const { post } = pageData;
  const page = {
    ...post,
  };
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.locale}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="RecIdeas" />
        <meta property="og:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={`${page.imgWidth}`} />
        <meta property="og:image:height" content={`${page.imgHeight}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta property="twitter:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="twitter:creator" content="@UneTaupe_" />
        <meta property="twitter:image:alt" content={page.altImg || page.title} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.locale}`}
          key="canonical"
        />
        {/* Image Preload */}
        <link
          rel="preload"
          as="image"
          imageSrcSet={page.srcset || ''}
          imageSizes="100w"
          fetchPriority="high"
        />
      </Head>
      <section>
        <figure>
          <ImageLoader
            src={page.imgPost}
            alt={page.altImg || page.title}
            width={page.imgWidth}
            height={page.imgHeight}
            srcset={page.srcset}
            priority
          />
          {page.title !== page.altImg && (
          <figcaption className="caption">
            {page.altImg}
          </figcaption>
          )}
        </figure>
        <h1>{page.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <Comments posts={page} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);

  return {
    props: {
      pageData,
      messages: (await import('../../messages/fr.json')).default,
    },
  };
};
