import { useState } from 'react';
import Link from 'next/link';
import { TbMessageLanguage } from 'react-icons/tb';

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
        className="hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        aria-label="languages"
      >
        <TbMessageLanguage />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 px-4 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 absolute left-0 mt-2"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link href="/">Fr</Link>
            </li>
            <li>
              <Link href="/en">En</Link>
            </li>
            <li>
              <Link href="/de">De</Link>
            </li>
            <li>
              <Link href="/es">Es</Link>
            </li>
            <li>
              <Link href="/it">It</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
