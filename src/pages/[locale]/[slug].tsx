import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import Head from 'next/head';
import { Post } from '@/types/post';
import TableOfContents from '@/components /tableOfContents/TableOfContents';
import ImageLoader from '@/components /image/ImageLoader';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from 'flowbite-react';
import fetcher from '../../utils/fetcher';
// import ImageLoader from '../../components /image/ImageLoader';
import Comments from '../../components /comments/Comments';
import FormRecype from '../../components /formRecype/FormRecype';
import BreadcrumbJsonLd from '../../components /jsonLd/BreadcrumbJsonLd';

interface PageProps {
    page: Post;
    isRecypePage: boolean;
    recypeDefault: string ;
    dailyRecypeData: any;
}
export default function Page({
  page, isRecypePage, recypeDefault, dailyRecypeData,
}: PageProps) {
  const t = useTranslations('recype');

  const dailyRecype = dailyRecypeData.filter(
    (recype: { locale: string; }) => recype.locale === page.locale,
  );
  // if (isFallback) {
  //   return <div>Loading...</div>; // Affichez un indicateur de chargement
  // }
  const urlPost = `${process.env.NEXT_PUBLIC_URL}${page.url}`;
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
        <BreadcrumbJsonLd paragraphPosts={page.paragraphPosts} urlPost={urlPost} />
      </Head>
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
        {isRecypePage && (
        <Button className="text-link font-bold my-4 w-full hover:text-white" color="light">
          <Link href={`/${dailyRecype[0].url}`}>
            {t('link-daily-recype')}
            {' '}
            {dailyRecype[0].title}
          </Link>
        </Button>
        )}
        {isRecypePage && <FormRecype locale={page.locale} recypeDefault={recypeDefault} />}
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
        {isRecypePage && <Comments posts={page} />}
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
  const recype = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/draft/${params.locale}/azeaze12aazxsd`);
  const dailyRecypeData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/daily-recype`);
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
  const isRecypePage = page.slug.startsWith('15');
  return {
    props: {
      page,
      messages: (await import(`../../../messages/${params.locale}.json`)).default,
      isRecypePage,
      recypeDefault: recype.contents,
      dailyRecypeData,
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
