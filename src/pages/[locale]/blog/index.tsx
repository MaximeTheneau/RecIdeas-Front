/* eslint-disable quote-props */
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import Cards from '@/components /cards/cards';
import fetcher from '../../../utils/fetcher';
// import CategoryPage from '../../../components/category/CategoryPage';

export default function Home({ articles } : any) {
  return (
    <section>
      {/* --Articles--*/}
      <div>
        <Cards cards={articles} />
      </div>
    </section>
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

  // const posts = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${locale}/blog`);
  const pageData = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/category/blog`);
  const translation = pageData.filter(
    (translationFind:
      { locale: string | string[] | undefined }) => translationFind.locale === locale,
  );
  const translationFr = pageData.filter(
    (translationFind:
      { locale: string | string[] | undefined }) => translationFind.locale === 'fr',
  );
  return {
    props: {
      articles: translation,
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
