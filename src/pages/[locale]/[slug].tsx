import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import fetcher from '../../utils/fetcher';
import ImageLoader from '../../components /image/ImageLoader';
import FormRecype from '../../components /formRecype/FormRecype';
import Comments from '../../components /comments/Comments';

type GspPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page(props: GspPageProps) {
  const router = useRouter();
  const { isFallback, query } = router;
  console.log(Array.isArray(props.pageData.translation));

  const translations = Array.isArray(props.pageData.translation)
    ? props.pageData.translation
    : [props.pageData.translation];

  const page = translations.find(
    (translation: { locale: string | string[] | undefined }) => translation.locale === query.locale,
  ) || props.pageData.post;
  if (isFallback) {
    return 'Loading...';
  }
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={page.imgWidth} />
        <meta property="og:image:height" content={page.imgHeight} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta property="twitter:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="twitter:creator" content="@UneTaupe_" />
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
          imageSrcSet={page.srcset}
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
        <FormRecype locale={query.locale} />
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
  const pageData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);

  return {
    props: {
      pageData,
      messages: (await import(`../../../messages/${params.locale}.json`)).default,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string, locale: string } }[] = [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Page`);
  const posts = await res.json();

  posts.forEach((post: any) => {
    paths.push({
      params: { locale: post.locale, slug: post.slug },
    });
  });

  return {
    paths,
    fallback: false,
  };
};
