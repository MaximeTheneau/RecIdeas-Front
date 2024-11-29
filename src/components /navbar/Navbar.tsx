import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { MdFlatware } from 'react-icons/md';
import Dropdown from '../ui/Dropdown';

export default function Navbar() {
  const t = useTranslations('link');
  return (
    <nav className="pr-8 flex justify-between item-center content-center items-center w-full z-10 fixed h-auto font-bold backdrop-blur ">
      <div className="m-4 font-heading  hover:text-primary">
        <Link href={t('15-recype-link')}>
          <MdFlatware className="w-8 inline-block" />
          {' '}
          {t('15-recype')}
        </Link>
      </div>
      <div>
        <Dropdown />
      </div>
    </nav>

  );
}
