import Link from 'next/link';

export default function Footer() {
  return (
    <div className=" p-4 leading-loose bg-secondary">
      <ul className="flex justify-around sm:flex-row flex-col">
        <li>
          <Link href="/Mentions-legales">
            Mentions légales
          </Link>
        </li>
        <li>
          <Link href="/Contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
