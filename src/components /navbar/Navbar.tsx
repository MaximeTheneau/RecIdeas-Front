import Link from 'next/link';
import { TbMessageLanguage } from 'react-icons/tb';
import { Dropdown } from 'flowbite-react';
import { useTranslations } from 'next-intl';
import { MdFlatware } from 'react-icons/md';

export default function Navbar() {
  const t = useTranslations('link');
  return (
    <nav className="flex justify-between item-center content-center items-center w-full z-10 fixed h-auto font-bold  backdrop-blur ">
      <div className="m-4  hover:text-primary">
        <Link href={t('15-recype-link')}>
          <MdFlatware className="w-8 inline-block" />
          {' '}
          {t('15-recype')}
        </Link>
      </div>
      <div>
        <Dropdown
          aria-label="Language"
          dismissOnClick={false}
          label={<TbMessageLanguage />}
          color="light"
          className="p-2 m-2 hover:bg-gray-200 hover:text-black bg-gray-200 active:bg-violet-700 focus:outline-none"
        >
          <Dropdown.Item as={Link} href="/">Fr</Dropdown.Item>
          <Dropdown.Item as={Link} href="/en">En</Dropdown.Item>
          <Dropdown.Item as={Link} href="/de">De</Dropdown.Item>
          <Dropdown.Item as={Link} href="/es">Es</Dropdown.Item>
          <Dropdown.Item as={Link} href="/it">It</Dropdown.Item>
        </Dropdown>
      </div>
    </nav>

  );
}
