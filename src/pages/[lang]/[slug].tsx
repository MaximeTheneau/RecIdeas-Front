import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import fetcher from '../../utils/fetcher';

type GspPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function GspPage(props: GspPageProps) {
  const router = useRouter();
  const { defaultLocale, isFallback, query } = router;

  if (isFallback) {
    return "Loading...";
  }
  return (
    <div>
    </div>
  );
}




export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  if (!params?.slug) {
    return {
      notFound: true, 
    };
  }
  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}api/posts/${params.slug}`);
  return {
    props: {
      post,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  
  const paths: { params: { slug: string, lang: string } }[] = [];

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/posts&category=Page`);
  const posts = await res.json();

  posts.forEach((post: any) => {
    paths.push({
      params: { lang: post.locale, slug: post.slug },
    });
  });

  return {
    paths,
    fallback: false, 
  };
}
