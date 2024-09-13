import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';
import '../styles/globals.scss';
import { Rubik, Protest_Guerrilla } from 'next/font/google'
 
const roboto = Rubik({
  weight: '400',
  subsets: ['latin'],
})
const title = Protest_Guerrilla({
  weight: '400',
  subsets: ['latin'],
})

export default function App({Component, pageProps}) {
  const router = useRouter();
 
  return (
    <>
    <style jsx global>{`
      :root {
        --font-heading: ${title.style.fontFamily};
        --font-body: ${roboto.style.fontFamily};
      }
    `}</style>
    <NextIntlClientProvider
      locale={router.query.locale || 'fr'}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
    >
      <main >
        <Component {...pageProps} />
      </main>
    </NextIntlClientProvider>
    </>
  );
}