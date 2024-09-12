/* eslint-disable quote-props */
import Head from 'next/head';
import fetcher from '../../utils/fetcher';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);
  const posts = await res.json();
  const paths = posts.translation.map((post) => ({ params: { lang: post.locale } }));
  return { paths, fallback: false };
}

export async function getStaticProps() {

  const articles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);

  return {
    props: {
      articles,
    },
  };
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>{subcategory.name}</title>
        <meta name="description" content={`${subcategory.name} : Retrouvez tous les articles`} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={subcategory.name} />
        <meta property="og:description" content={`${subcategory.name} : Retrouvez tous les articles`} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={urlPost} />
        <meta property="og:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="720" />
        <meta property="article:section" content={subcategory.name} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={subcategory.name} />
        <meta property="twitter:description" content={`${subcategory.name} : Retrouvez tous les articles`} />
        <meta property="twitter:site" content="@UneTaupe_" />
        <meta property="twitter:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <meta property="twitter:creator" content="@UneTaupe_" />
        <meta property="twitter:image:alt" content={`${subcategory.name} : Retrouvez tous les articles`} />
        <meta property="twitter:domain" content={urlPost} />
        <meta property="twitter:url" content={urlPost} />
        <meta property="og:image" content="https://picture.unetaupechezvous.fr/Accueil.webp?format=jpeg" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/Articles/${subcategory.slug}`}
          key="canonical"
        />
      </Head>
      <>
        <section>
          <h1>{subcategory.name}</h1>
          <CategoryPage
            category={false}
            subcategoryPost={subcategory.name}
            subcategoryList={subcategoryList}
          />
        </section>
        <section>
          {/* --Articles--*/}
          <p>Les derniers articles :</p>
          <div className={styles.home}>
            <Cards cards={articles} />
          </div>
        </section>
      </>
    </>
  );
}
