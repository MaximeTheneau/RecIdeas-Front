/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Page</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <section className="flex items-center flex-col">
        <h1>404 Page</h1>
        <p>Sorry</p>
        <button type="button" className="button">
          <Link
            href="/"
          >
            <figure className="">
              <img
                src="https://picture.recideas.com/404-8.webp"
                alt="404 Page"
                width={1106}
                height={885}
              />
            </figure>
          </Link>
        </button>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const messages = (await import('../../messages/fr.json')).default;
  return {
    props: {
      messages,
    },
  };
};
