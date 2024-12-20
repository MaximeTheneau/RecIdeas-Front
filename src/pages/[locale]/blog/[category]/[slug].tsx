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
import { FaRegCalendarDays } from 'react-icons/fa6';
import RecypeDaily from '@/components /modal/cookies/RecypeDaily';
import WebSiteJsonLd from '@/components /jsonLd/WebSiteJsonLd';
import Category from '@/components /category/Category';
import BreadcrumbJsonLd from '@/components /jsonLd/BreadcrumbJsonLd';
import TableOfContents from '@/components /tableOfContents/TableOfContents';
import fetcher from '../../../../utils/fetcher';
// import ImageLoader from '../../components /image/ImageLoader';

interface Translations {
  locale: string;
  url: string;
}

interface PageProps {
page: Post;
translations: Translations[];
pageUrlDefault: string;
}
export default function Page({ page, translations, pageUrlDefault }: PageProps) {
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
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.url}`} />
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
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/${pageUrlDefault}`} hrefLang="x-default" />
        <link rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/${pageUrlDefault}`} hrefLang="fr" />
        {
          translations.map(
            (translation: { locale: string; url: string; }) => <link key={translation.locale} rel="alternate" href={`${process.env.NEXT_PUBLIC_URL}/${translation.url}`} hrefLang={`${translation.locale}`} />,
          )
        }
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
      <WebSiteJsonLd />
      {page.paragraphPosts
        && <BreadcrumbJsonLd paragraphPosts={page.paragraphPosts} urlPost={urlPost} />}
      <div className="p-4">
        <article>
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
            <time className="flex justify-start items-center text-link font-bold my-4 w-full border-gray-200 bg-gray-50 p-4">
              <FaRegCalendarDays className="mr-4" />
              {page.formattedDate}
            </time>
            <h1 className="w-full sm:w-2/3">{page.title}</h1>
            <Category
              locale={page.locale || 'fr'}
              categoryName={page.category.name}
              categorySlug={page.category.slug}
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: page.contents }} />
          {page.paragraphPosts && <TableOfContents post={page} />}
          {page.paragraphPosts && page.paragraphPosts.map((paragraphArticle : any) => (
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
        </article>
        <aside className="mx-auto">
          <RecypeDaily locale={page.locale} />
          <Comments posts={page} />
        </aside>
      </div>
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
    const translation = post.translations.find(
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

  const translations = post.translations.map(({ url, locale }: any) => ({
    url,
    locale,
  }));
  return {
    props: {
      page,
      translations,
      pageUrlDefault: post.url,
      messages: (await import(`../../../../../messages/${params.locale}.json`)).default,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string, locale: string, category : string } }[] = [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/category=blog`);
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
