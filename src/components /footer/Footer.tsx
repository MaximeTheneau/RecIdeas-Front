import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
// import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const t = useTranslations('footer');
  const router = useRouter();

  return (
    <div className=" p-4 leading-loose bg-secondaryLight text-xl">
      <ul className="flex justify-around w-full sm:w-1/4  py-4 mx-auto">
        <li className="">
          <Link href="https://www.facebook.com/people/RecIdeas/61565854959587/?sk=about" aria-label="Facebook page RecIdeas.com" target="_blank">
            <FaFacebook />
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/rec.ideas/" aria-label="Instagram page RecIdeas.com" target="_blank">
            <FaInstagram />
          </Link>

        </li>
        {/* <li>
            <Link href="/twitter">
              <FaXTwitter />
            </Link>
          </li> */}
      </ul>

      <ul className="flex justify-around sm:flex-row flex-col item-center text-xs ">
        <li className="py-4">
          <Link href={`/${router.query.locale || 'fr'}/blog`}>
            Blog
          </Link>
        </li>
        <li className="py-4">
          <Link href={`/${router.query.locale || 'fr'}/contact`}>
            {t('contact')}
          </Link>
        </li>
        <li className="py-4">
          <Link href={t('terms-link')}>
            {t('terms')}
          </Link>
        </li>
        <li className="py-4">
          <Link href={t('who-link')}>
            {t('who')}
          </Link>
        </li>
        <li className="py-4">
          <Link href={t('mention-legal-link')}>
            {t('mention-legal')}
          </Link>
        </li>

      </ul>
    </div>

  );
}
