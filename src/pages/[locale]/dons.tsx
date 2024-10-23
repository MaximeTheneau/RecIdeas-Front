import useSWR from 'swr';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import fetcher from '@/utils/fetcher';
import WebSiteJsonLd from '@/components /jsonLd/WebSiteJsonLd';
import WebPageJsonLd from '@/components /jsonLd/WebPageJsonLd';
import ImageLoader from '@/components /image/ImageLoader';
import Link from 'next/link';
import DonorsForm from '@/components /donors/DonorsForm';
import { Post } from '@/types/post';
import DonorList from '@/components /donors/DonorItem';

interface Translations {
  locale: string;
}

interface Donors {
  name: string;
}

interface PageProps {
  page: Post;
  translations: Translations[];
  donorsInitial: Donors[];
}

export default function DonsPage({ page, translations, donorsInitial }: PageProps) {
  const { data: donors } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}payment/donors`,
    fetcher,
    { fallbackData: donorsInitial },
  );

  return (
    <>
      <Head>
        <title>{page.heading}</title>
        <meta name="description" content={page.metaDescription} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.heading} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.locale}/dons`} />
        <meta property="og:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={`${page.imgWidth}`} />
        <meta property="og:image:height" content={`${page.imgHeight}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={`${page.imgPost}?format=jpeg`} />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/fr/dons`} hrefLang="x-default" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/fr/dons`} hrefLang="fr" />
        {
          translations.map(
            (translation: { locale: string }) => <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/${translation.locale}/dons`} hrefLang={translation.locale} />,
          )
        }
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.locale}/dons`}
          key="canonical"
        />
      </Head>
      <WebSiteJsonLd />
      <WebPageJsonLd page={page} url={`${page.locale}/dons`} />
      <div className="flex items-end">
        <figure className="w-1/3">
          <ImageLoader
            src={page.imgPost}
            alt={page.altImg || page.title}
            width={page.imgWidth}
            height={page.imgHeight}
            srcset={page.srcset}
            priority
          />
        </figure>
        <h1 className="w-2/3">{page.heading}</h1>
      </div>
      <div dangerouslySetInnerHTML={{ __html: page.contents }} />
      <DonorsForm locale={page.locale} />
      <DonorList donors={donors} />
      {page.paragraphPosts.map((paragraphArticle) => (
        <div key={paragraphArticle.id}>
          {paragraphArticle.subtitle && (
          <h2 id={paragraphArticle.slug}>
            {paragraphArticle.subtitle}
          </h2>
          )}
          {paragraphArticle.paragraph && (
          <div key={paragraphArticle.id}>
            <div
              className="list-disc"
              dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }}
            />
            {paragraphArticle.link && (
            <div>
              <span>
                → A lire aussi :
                <Link href={paragraphArticle.link}>
                  {' '}
                  {paragraphArticle.linkSubtitle}
                </Link>
              </span>
            </div>
            )}
          </div>
          )}
        </div>
      ))}
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
  const pageData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.locale}/1c1DonsZZ`);
  const { post } = pageData;

  let page;
  if (params.locale !== 'fr') {
    const translationList = post.translations.find(
      (translationFind:
      { locale: string | string[] | undefined }) => translationFind.locale === params.locale,
    );
    page = {
      ...post,
      ...translationList,
      url: `${params.locale}/dons`,
    };
  } else {
    page = post;
  }

  const translations = post.translations.map(({ locale }: any) => ({
    locale,
  }));
  const donorsInitial = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}payment/donors`);
  return {
    props: {
      page,
      translations,
      donorsInitial,
      messages: (await import(`../../../messages/${params.locale}.json`)).default,
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
