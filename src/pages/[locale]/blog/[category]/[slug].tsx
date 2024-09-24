import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import Head from 'next/head';
import { Post } from '@/types/post';
import ImageLoader from '@/components /image/ImageLoader';
import Comments from '@/components /comments/Comments';
import RecypeJsonLd from '@/components /jsonLd/RecypeJsonLd';
import fetcher from '../../../../utils/fetcher';
// import ImageLoader from '../../components /image/ImageLoader';

interface PageProps {
    page: Post;

}
export default function Page({ page }: PageProps) {
  // if (isFallback) {
  //   return <div>Loading...</div>; // Affichez un indicateur de chargement
  // }
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
        <meta property="twitter:creator" content="@RecIdeas" />
        <meta property="twitter:image:alt" content={page.altImg || page.title} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.url}`}
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
      <RecypeJsonLd post={page} />
      <section>
        <div className="">
          <figure>
            <ImageLoader
              src={page.imgPost}
              alt={page.altImg || page.title}
              width={page.imgWidth}
              height={page.imgHeight}
              srcset={page.srcset}
              priority
            />
          </figure>
          <h1 className="w-full sm:w-2/3">{page.title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <Comments posts={page} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }
  const pageData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.locale}/${params.slug}`);

  const { post } = pageData;
  let page;
  if (params.locale !== 'fr') {
    const translations = Array.isArray(pageData.translation)
      ? pageData.translation
      : [pageData.translation];

    const translation = translations.find(
      (translationFind:
      { locale: string | string[] | undefined }) => translationFind.locale === params.locale,
    );
    page = {
      ...post,
      ...translation,
    };
  } else {
    page = post;
  }
  return {
    props: {
      page,
      messages: (await import(`../../../../../messages/${params.locale}.json`)).default,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string, locale: string, category : string } }[] = [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/category/blog`);
  const posts = await res.json();

  posts.forEach((post: any) => {
    paths.push({
      params: { locale: post.locale, slug: post.slug, category: post.category.slug },
    });
  });

  return {
    paths,
    fallback: false,
  };
};
