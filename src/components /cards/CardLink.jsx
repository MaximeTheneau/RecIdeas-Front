/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Card from '../ui/Card';

export default function CardLink({ card }) {
  return (
    <li className="py-4 w-1/2 sm:w-1/1 max-w-80 hover:text-primary">
      <Card>
        <Link
          href={`/${card.url}`}
          rel="preload"
        >
          <img
            src={`${card.imgPost || card.post.imgPost}?width=330&height=330`}
            alt={card.altImg || card.post.imgPost}
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            className="w-full "
          />
          <p className="font-bold py-4 px-2">{card.title}</p>
        </Link>
      </Card>
    </li>
  );
}
