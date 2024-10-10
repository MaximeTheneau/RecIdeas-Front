import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import '../styles/globals.scss';
import { Rubik, Exo } from 'next/font/google';
import Layout from '@/components /layout';
import { AppProps } from 'next/app';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import CookiesModal from '../components /modal/cookies/Cookies';
import { CookiesProvider } from '../context/CookiesContext';

const roboto = Rubik({
  weight: '400',
  subsets: ['latin'],
});
const title = Exo({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  function getLocale(query: ParsedUrlQuery): string {
    if (Array.isArray(query.locale)) {
      return query.locale[0];
    }
    return query.locale || 'fr';
  }

  return (
    <>
      <style jsx global>
        {`
      :root {
        --font-heading: ${title.style.fontFamily};
        --font-body: ${roboto.style.fontFamily};
      }
    `}
      </style>
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER_ID} />
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE} />
        <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_WEBMASTER_ID} />
        <meta name="ahrefs-site-verification" content="80e1e4c68c5760798a0c167d6db84e79e9b343301fd1eb054f1da5fc8529e778" />
        <meta name="msvalidate.01" content="ED971B0CFF044FFA9DE24B864BA7ED75" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="google-adsense-account" content="ca-pub-9194552698690511" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        /> */}
      </Head>
      <NextIntlClientProvider
        locale={getLocale(router.query)}
        timeZone="Europe/Vienna"
        messages={pageProps.messages}
      >
        <CookiesProvider>
          <CookiesModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CookiesProvider>
      </NextIntlClientProvider>
    </>
  );
}
