import Link from 'next/link';

type CategoryProps = {
  locale: string;
  categoryName: string | null;
  categorySlug: string | null;
};

export default function Category({ locale, categoryName, categorySlug }: CategoryProps) {
  return (
    <nav aria-label="breadcrumb">
      <ul className="flex space-x-2 list-none my-4 ">
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
