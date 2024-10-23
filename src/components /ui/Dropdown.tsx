import { useState } from 'react';
import Link from 'next/link';
import { TbMessageLanguage } from 'react-icons/tb';
import Flags from '../flags/Flags';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="hover:bg-white hover:text-primary  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
        type="button"
        aria-label="languages"
      >
        <TbMessageLanguage />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 px-4 bg-white divide-y divide-gray-100 rounded-lg shadow absolute left-0 mt-2"
        >
          <ul className="py-2 text-sm text-gray-700">
            <li className="mb-2">
              <Link href="/">
                <Flags language="fr" />
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/en"><Flags language="en" /></Link>
            </li>
            <li className="mb-2">
              <Link href="/de"><Flags language="de" /></Link>
            </li>
            <li className="mb-2">
              <Link href="/es"><Flags language="es" /></Link>
            </li>
            <li className="mb-2">
              <Link href="/it"><Flags language="it" /></Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
