import Link from 'next/link';

type CategoryProps = {
  locale: string;
  categoryName: string;
  categorySlug: string;
};

export default function Category({ locale, categoryName, categorySlug }: CategoryProps) {
  return (
    <nav aria-label="breadcrumb">
      <ul className="flex space-x-2 ">
        <li>
          <Link href={`/${locale}/blog`} className={`${categoryName ? 'text-gray-500' : 'text-black'}`}>
            Blog
          </Link>
        </li>
        {categoryName && (
        <li>
          {' '}
          &gt;
          {' '}
          <Link href={`/${locale}/blog/${categorySlug}`} className={`${!categoryName ? 'text-gray-500' : 'text-black'}`}>
            {categoryName}
          </Link>
        </li>
        )}
      </ul>
    </nav>

  );
}
