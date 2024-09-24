/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Card } from 'flowbite-react';

export default function CardLink({ card }) {
  return (
    <li className="py-4 max-w-80 min-h-80 hover:text-primary">
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
            className="w-full"
          />
          <p className="font-bold py-4">{card.title}</p>
        </Link>
      </Card>
    </li>
  );
}
