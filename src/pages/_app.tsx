import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';
import '../styles/globals.scss';
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})


export default function App({Component, pageProps}) {
  const router = useRouter();
 
  return (
    <NextIntlClientProvider
      locale={router.query.locale || 'fr'}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
    >
      <main className={roboto.className} >

        <Component {...pageProps} />
      </main>
    </NextIntlClientProvider>
  );
}