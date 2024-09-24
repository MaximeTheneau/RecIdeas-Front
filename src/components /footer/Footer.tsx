import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaFacebook } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const t = useTranslations('footer');
  const router = useRouter();

  return (
    <div className=" p-4 leading-loose bg-secondary text-xl">
      <ul className="flex justify-around sm:flex-row flex-col">
        <li className="py-4">
          <Link href={t('mention-legal-link')}>
            {t('mention-legal')}
          </Link>
        </li>
        <li className="py-4">
          <Link href={`/${router.query.locale || 'fr'}/blog`}>
            Blog
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
