/* eslint-disable quote-props */
import Head from 'next/head';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import Cards from '@/components /cards/cards';
import WebSiteJsonLd from '@/components /jsonLd/WebSiteJsonLd';
import WebPageJsonLd from '@/components /jsonLd/WebPageJsonLd';
import fetcher from '../../../utils/fetcher';
// import CategoryPage from '../../../components/category/CategoryPage';

export default function Home({ articles, page } : any) {
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.locale}/blog`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="RecIdeas" />
        <meta property="og:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content="720" />
        <meta property="og:image:height" content="720" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta property="twitter:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="twitter:creator" content="@RecIdeas" />
        <meta property="twitter:image:alt" content={page.altImg || page.heading} />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/fr/blog`} hrefLang="x-default" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/fr/blog`} hrefLang="fr" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/en/blog`} hrefLang="en" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/es/blog`} hrefLang="es" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/it/blog`} hrefLang="it" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/de/blog`} hrefLang="de" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.locale}/blog`}
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
      <WebSiteJsonLd page={page} />
      <WebPageJsonLd page={page} />
      <section>
        <h1 className="w-full sm:w-2/3">{page.heading}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        {/* --Articles--*/}
        <div>
          <Cards cards={articles} />
        </div>
      </section>
    </>
  );
}
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  if (!params?.locale) {
    return {
      notFound: true,
    };
  }

  const { locale } = params;

  const recypeData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/category/blog`);
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/draft/${params.locale}/azeblog11ea`);

  const translation = recypeData.filter(
    (translationFind:
      { locale: string | string[] | undefined }) => translationFind.locale === locale,
  );
  const translationFr = recypeData.filter(
    (translationFind:
      { locale: string | string[] | undefined }) => translationFind.locale === 'fr',
  );
  return {
    props: {
      articles: translation,
      page,
      translationFr,
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en', 'de', 'fr', 'it', 'de', 'es'];
  const paths = locales.map((locale) => ({
    params: { locale },
  }));

  return {
    paths,
    fallback: false,
  };
};
