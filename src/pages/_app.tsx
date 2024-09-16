import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import '../styles/globals.scss';
import { Rubik, Exo } from 'next/font/google';
import Layout from '@/components /layout';
import { AppProps } from 'next/app';
import { ParsedUrlQuery } from 'querystring';

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
      <NextIntlClientProvider
        locale={getLocale(router.query)}
        timeZone="Europe/Vienna"
        messages={pageProps.messages}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextIntlClientProvider>
    </>
  );
}
