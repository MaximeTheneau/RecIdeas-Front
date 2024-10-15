/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Card from '../ui/Card';

export default function CardLink({ card }) {
  return (
    <li className="p-2 w-1/2 sm:w-1/1 max-w-80 hover:text-primary hover:opacity-80">
      <Card>
        <Link
          href={`/${card.url}`}
          rel="preload"
        >
          <img
            src={`${card.imgPost}?width=330&height=330`}
            alt={card.altImg}
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            className="w-full "
          />
          <time dateTime={new Date(card.createdAt || card.post.createdAt).toISOString()} className="block text-sm text-gray-500 px-2 pt-2">
            {card.formattedDate }
          </time>
          <p className="font-bold py-4 px-2">{card.title}</p>
        </Link>
      </Card>
    </li>
  );
}
