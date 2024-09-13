'use client'
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";

export default function home() {
  const t = useTranslations('HomePage');

  return (
  <>
    
    <div>
    <p>{t('title')}</p>

      <h1>Index page</h1>
      <p className="text-xl font-semibold text-white">
      
      <span className="ml-2 inline-block">→</span>
      </p>

      <Link href="/gsp">To getStaticProps page</Link>
      <br />

      <Link href="/gsp/first">To dynamic getStaticProps page</Link>
      <br />

    </div>
  </>
  );
}