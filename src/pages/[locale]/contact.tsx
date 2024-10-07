import Head from 'next/head';
import ContactForm from '@/components /contact/Contact';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Post } from '@/types/post';
import ImageLoader from '@/components /image/ImageLoader';
import Link from 'next/link';
import WebSiteJsonLd from '@/components /jsonLd/WebSiteJsonLd';
import WebPageJsonLd from '@/components /jsonLd/WebPageJsonLd';
import fetcher from '../../utils/fetcher';

interface PageProps {
  page: Post;
}

export default function Contact({ page }: PageProps) {
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
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.locale}/contact`} />
        <meta property="og:image" content={`${page.imgPost}?format=jpeg`} />
        <meta property="og:image:width" content={`${page.imgWidth}`} />
        <meta property="og:image:height" content={`${page.imgHeight}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.heading} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={`${page.imgPost}?format=jpeg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.locale}/contact`}
          key="canonical"
        />
      </Head>
      <WebSiteJsonLd />
      <WebPageJsonLd page={page} />
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
          <h1 className="w-2/3">{page.heading}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <div>
          <div>
            <ContactForm />
          </div>
        </div>
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
  const pageData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.locale}/1c1o1n1ta22`);
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
  return {
    props: {
      page,
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
