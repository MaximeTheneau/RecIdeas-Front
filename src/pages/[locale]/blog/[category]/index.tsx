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
import fetcher from '@/utils/fetcher';
import Category from '@/components /category/Category';
// import CategoryPage from '../../../components/category/CategoryPage';

export default function Home({
  articles, page, pageUrlDefault, pageFrUrlDefault,
} : any) {
  const url = `${process.env.NEXT_PUBLIC_URL}/${pageUrlDefault?.locale || 'fr'}/blog/${pageUrlDefault?.category.slug || pageFrUrlDefault.category.slug}`;
  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:url" content={url} />
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
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/fr/blog/${pageFrUrlDefault.category.slug}`} hrefLang="x-default" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/fr/blog/${pageFrUrlDefault.category.slug}`} hrefLang="fr" />
        {
          articles[0].translations.map(
            (translation: any) => <link key={translation.locale} rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/${translation.locale}/blog/${translation.category.slug}`} hrefLang={`${translation.locale}`} />,
          )
        }
        <link
          rel="canonical"
          href={url}
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
      <WebSiteJsonLd />
      <WebPageJsonLd page={page} url={null} />
      <section>
        <h1 className="w-full ">{page.heading}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <Category
          locale={pageUrlDefault?.locale || 'fr'}
          categoryName={pageUrlDefault?.category.name || pageFrUrlDefault.category.name}
          categorySlug={pageUrlDefault?.category.slug || pageFrUrlDefault.category.slug}
        />
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

  const { locale, category } = params;

  const recypeData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/category/${category}`);
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/draft/${locale}/azedailyRec11ea`);

  //   const translation = recypeData.filter(
  //     (translationFind:
  //       { locale: string | string[] | undefined }) => translationFind.locale === locale,
  //   );

  const translatedPosts = recypeData.map((post: any) => {
    const translation = post.translations.find(
      (t: { locale: string }) => t.locale === locale,
    );
    return { ...post, ...translation };
  });

  const pageUrlDefault = recypeData[0].translations.find(
    (tf: any) => tf.locale === locale,
  );

  return {
    props: {
      articles: translatedPosts,
      page,
      pageUrlDefault: pageUrlDefault || null,
      pageFrUrlDefault: recypeData[0],
      messages: (await import(`../../../../../messages/${locale}.json`)).default,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { category: string, locale: string } }[] = [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/category=blog`);
  const posts = await res.json();

  posts.forEach((post: any) => {
    paths.push({
      params: { locale: post.locale, category: post.category.slug },
    });
  });

  return {
    paths,
    fallback: false,
  };
};
