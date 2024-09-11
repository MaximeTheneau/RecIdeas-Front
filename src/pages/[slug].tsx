import LocaleSwitcher from "@/components /locale-switcher";
import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPathsContext
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import fetcher from '../utils/fetcher';

type GspPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function GspPage(props: GspPageProps) {
  const router = useRouter();
  const { defaultLocale, isFallback, query } = router;

  if (isFallback) {
    return "Loading...";
  }
console.log(props.locale)
  return (
    <div>
      <h1>getStaticProps page</h1>
      <p>Current slug: {query.slug}</p>
      <p>Current locale: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <LocaleSwitcher />

      <Link href={props.post.slug}>To getStaticProps page</Link>
      <br />

      <Link href="/gssp">To getServerSideProps page</Link>
      <br />

      <Link href="/">To index page</Link>
      <br />
    </div>
  );
}




export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params, locale } = context; 

  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}${locale}/api/posts/${params.slug}`);

  return {
    props: {
      post,
      locale,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
  const { locales = [] } = context;
  const paths: { params: { slug: string }; locale: string }[] = [];

  for (const locale of locales) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${locale}/api/posts&category=Page`);
    const posts = await res.json();

    posts.forEach((post: any) => {
      paths.push({
        params: { slug: post.slug },
        locale,
      });
    });
  }

  return {
    paths,
    fallback: false, 
  };
}