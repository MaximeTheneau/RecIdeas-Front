import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <div className=" p-4 leading-loose bg-secondary">
      <ul className="flex justify-around sm:flex-row flex-col">
        <li>
          <Link href={t('mention-legal-link')}>
            {t('mention-legal')}
          </Link>
        </li>
        <ul className="flex justify-around sm:flex-row flex-col w-1/12">
          <li>
            <Link href="https://www.facebook.com/people/RecIdeas/61565854959587/?sk=about">
              <FaFacebook />
            </Link>
          </li>
          {/* <li>
            <Link href="/twitter">
              <FaXTwitter />
            </Link>
          </li> */}
        </ul>
      </ul>
    </div>
  );
}
