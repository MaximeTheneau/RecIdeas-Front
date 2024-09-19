import Link from 'next/link';
import { TbMessageLanguage } from 'react-icons/tb';
import { Button, Dropdown } from 'flowbite-react';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('link');
  return (
    <nav className="flex justify-between content-center w-full z-10 fixed h-auto font-bold p-2 backdrop-blur">
      <div className="">
        <ul className="list-none">
          <li>
            <Button color="light" className="  font-black">
              <Link href={t('15-recype-link')}>
                {t('15-recype')}
              </Link>
            </Button>
          </li>
        </ul>
      </div>
      <div>
        <Dropdown
          aria-label="lang"
          dismissOnClick={false}
          label={<TbMessageLanguage />}
          color="light"
          className="p-1 hover:bg-gray-200 hover:text-black bg-gray-200 active:bg-violet-700 focus:outline-none"
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
