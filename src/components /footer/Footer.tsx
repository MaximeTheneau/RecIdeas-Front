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
    <div className=" p-8 leading-loose bg-secondaryLight text-xl">
      <ul className="flex justify-around sm:flex-row flex-col item-center">
        <li className="">
          <Link href={t('mention-legal-link')}>
            {t('mention-legal')}
          </Link>
        </li>
        <li className="">
          <Link href={`/${router.query.locale || 'fr'}/blog`}>
            Blog
          </Link>
        </li>
        <li className="">
          <Link href={`/${router.query.locale || 'fr'}/contact`}>
            {t('contact')}
          </Link>
        </li>
        <li className="flex justify-between w-1/3 sm:w-1/12">
          <Link href="https://www.facebook.com/people/RecIdeas/61565854959587/?sk=about" aria-label="Facebook page RecIdeas.com">
            <FaFacebook />
          </Link>
          <Link href="https://www.instagram.com/rec.ideas/" aria-label="Instagram page RecIdeas.com">
            <FaInstagram />
          </Link>
        </li>
        {/* <li>
            <Link href="/twitter">
              <FaXTwitter />
            </Link>
          </li> */}
      </ul>
    </div>
  );
}
