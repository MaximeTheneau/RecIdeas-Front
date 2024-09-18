import Link from 'next/link';

export default function TableOfContents({ post }) {
  return (
    post.paragraphPosts[0] && (
    <nav className="" aria-label="Sommaire">
      <ul className="list-disc mr-4 flex justify-center">
        {post.paragraphPosts.map((paragraphArticle) => (
          <li key={paragraphArticle.slug} className="">
            <Link href={`#${paragraphArticle.slug}`} className="">{paragraphArticle.subtitle}</Link>
          </li>
        ))}
      </ul>
    </nav>
    )
  );
}
