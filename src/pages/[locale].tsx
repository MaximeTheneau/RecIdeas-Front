import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import Head from 'next/head';
import { Post } from '@/types/post';
import TableOfContents from '@/components /tableOfContents/TableOfContents';
import BreadcrumbJsonLd from '@/components /jsonLd/BreadcrumbJsonLd';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { MdFlatware } from 'react-icons/md';
import WebSiteJsonLd from '@/components /jsonLd/WebSiteJsonLd';
import WebPageJsonLd from '@/components /jsonLd/WebPageJsonLd';
import fetcher from '../utils/fetcher';
import ImageLoader from '../components /image/ImageLoader';
import Comments from '../components /comments/Comments';

interface Translations {
  locale: string;
  url: string;
}

interface PageProps {
page: Post;
translations: Translations[];
dailyRecype: any;
}

export default function Page({ page, translations, dailyRecype }: PageProps) {
  const t = useTranslations('link');
  const tr = useTranslations('recype');

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
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/`} hrefLang="x-default" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}`} hrefLang="fr" />
        {
          translations.map(
            (translation: { locale: string; url: string; }) => <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/${translation.url}`} hrefLang={`${translation.locale}`} />,
          )
        }
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
      <WebSiteJsonLd />
      <WebPageJsonLd page={page} url={null} />
      <BreadcrumbJsonLd paragraphPosts={page.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}/${page.locale}`} />
      <section>
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
          <h1 className="w-2/3">{page.title}</h1>
        </div>

        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <div className="flex flex-col items-center my-4">
          <Button className="font-black text-black bg-primary " as={Link} href={t('15-recype-link')}>
            <MdFlatware className="w-8 inline-block" />
            {' '}
            {t('15-recype')}
          </Button>
        </div>
        <TableOfContents post={page} />
        {page.paragraphPosts.map((paragraphArticle : any) => (
          <div key={paragraphArticle.id}>
            {paragraphArticle.subtitle && (
              <h2 id={paragraphArticle.slug}>
                {paragraphArticle.subtitle}
              </h2>
            )}
            {paragraphArticle.paragraph && (
              <div key={paragraphArticle.id}>
                {/* {paragraphArticle.imgPostParagh && (
                <figure className={styles.page__contents__paragraph__figure}>
                  <ImageLoader
                    src={paragraphArticle.imgPost}
                    alt={paragraphArticle.altImg}
                    width={paragraphArticle.imgWidth}
                    height={paragraphArticle.imgHeight}
                    srcset={paragraphArticle.srcset}
                  />
                  {paragraphArticle.subtitle !== paragraphArticle.altImgParagh && (
                  <figcaption className="caption">
                    {paragraphArticle.altImg}
                  </figcaption>
                  )}
                </figure>
                )} */}
                <div
                  dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }}
                />

                {/* {paragraphArticle.link && (
                  <div className={styles.page__contents__paragraph__links}>
                    <span className={styles.page__contents__paragraph__links__link}>
                      → A lire aussi :
                      <Link href={paragraphArticle.link}>
                        {' '}
                        {paragraphArticle.linkSubtitle}
                      </Link>
                    </span>
                  </div>
                )} */}
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-start items-center text-link font-bold my-4 w-full border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
          <Link href={`/${dailyRecype[0].url}`}>
            {tr('link-daily-recype')}
            {' '}
            {dailyRecype[0].title}
          </Link>
        </div>
        <Comments posts={page} />
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
  const pageData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.locale}/${params.locale}home`);
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
    };
  } else {
    page = post;
  }
  const translations = post.translations.map(({ url, locale }: any) => ({
    url,
    locale,
  }));
  const dailyRecypeData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/daily-recype`);
  const dailyRecype = dailyRecypeData.filter(
    (recype: { locale: string; }) => recype.locale === page.locale,
  );
  return {
    props: {
      page,
      translations,
      dailyRecype,
      messages: (await import(`../../messages/${params.locale}.json`)).default,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string, locale: string } }[] = [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/homeAll`);
  const posts = await res.json();

  posts.translation.forEach((post: any) => {
    paths.push({
      params: { locale: post.locale, slug: post.slug },
    });
  });

  return {
    paths,
    fallback: false,
  };
};
