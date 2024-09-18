import Link from 'next/link';

export default function TableOfContents({ post }) {
  return (
    post.paragraphPosts[0] && (
    <nav className="px-8 py-4 text-xl bg-primary rounded my-4" aria-label="Sommaire">
      <ul className="list-disc  ">
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
