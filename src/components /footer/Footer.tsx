import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const t = useTranslations('footer');
  const router = useRouter();
  return (
    <div className=" p-4 leading-loose bg-secondaryLight text-xl">
      <div className="flex justify-around sm:flex-row flex-col">
        <ul className="text-xs">
          <li className="py-4">
            <Link href={`/${router.query.locale === 'fr' ? '' : router.query.locale || ''}`} className="flex items-center font-bold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Logo RecIdeas"
                src="https://picture.recideas.com/logo.webp?width=32px"
                width={32}
                height={32}
              />
              {' '}
              RecIdeas
            </Link>
          </li>
          <li className="py-4">
            <Link href={t('15-recype-link')}>
              {t('15-recype')}
            </Link>
          </li>
          <li className="py-4">
            <Link href={`/${router.query.locale || 'fr'}/dons`}>
              {t('dons')}
            </Link>
          </li>
        </ul>
        <ul className="text-xs">
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
            <Link href={t('who-link')}>
              {t('who')}
            </Link>
          </li>
        </ul>
        <ul className="text-xs ">
          <li className="py-4">
            <Link href={t('terms-link')}>
              {t('terms')}
            </Link>
          </li>
          <li className="py-4">
            <Link href={t('mention-legal-link')}>
              {t('mention-legal')}
            </Link>
          </li>
          <li className="py-4">
            <Link href={t('policy-link')}>
              {t('policy')}
            </Link>
          </li>
        </ul>
      </div>
      <hr className="h-px  bg-gray-200 border-0 " />
      <ul className="flex justify-around w-full sm:w-1/4  py-4 mx-auto">
        <li className="">
          <Link href="https://www.facebook.com/people/RecIdeas/61565854959587/?sk=about" aria-label="Facebook page RecIdeas.com" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <FaFacebook />
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/rec.ideas/" aria-label="Instagram page RecIdeas.com" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <FaInstagram />
          </Link>

        </li>
        <li>
          <Link href="https://x.com/RecIdeas" aria-label="X - Twitter page RecIdeas.com" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <FaXTwitter />
          </Link>
        </li>
      </ul>
    </div>

  );
}
