/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Card } from 'flowbite-react';

export default function CardLink({ card }) {
  return (
    <li>
      <Card className="max-w-sm w-330 h-330">
        <Link
          href={`/${card.url}`}
          rel="preload"
        >
          <img
            src={`${card.imgPost}?width=330&height=330`}
            alt={card.altImg || card.title}
            width={330}
            height={330}
            loading="lazy"
            decoding="async"
          />
          <p>{card.title}</p>
        </Link>
      </Card>
    </li>
  );
}
