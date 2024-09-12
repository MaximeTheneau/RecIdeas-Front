/* eslint-disable quote-props */
import Head from 'next/head';
import fetcher from '../../utils/fetcher';
import ImageLoader from '../../components /image/ImageLoader';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);
  const posts = await res.json();
  const paths = posts.translation.map((post) => ({ params: { lang: post.locale } }));
  return { paths, fallback: false };
}

export async function getStaticProps() {
  
  const pageData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);
  return {
    props: {
      pageData,
    },
  };
}

export default function Home({ pageData }) {
  const router = useRouter();
  const { query } = router;

  // const page = pageData.post

  const page = pageData ? pageData.translation.find(translation => translation.locale === query.lang ) : pageData.post
  console.log(router)
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
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
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

        {/* <Comments posts={page} /> */}
      </section>
    </>
  );
}
