const { writeFileSync, existsSync, mkdirSync } = require('fs');

const generateRss = async () => {
  const urlApi = 'https://back.recideas.com/api/';

  // const urlApi = 'http://localhost:8000/api/';
  const baseUrl = 'https://recideas.com/';

  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (pages, frontUrl) => {
    const rssItems = pages
      .map((page) => {
        const pageUrl = page.url.startsWith('/') ? page.url.slice(1) : page.url;

        return `<item>
          <title>${page.title}</title>
          <link>${frontUrl}${pageUrl}</link>
          <description>${page.metaDescription || page.title}</description>
          ${page.createdAt ? `<pubDate>${new Date(page.createdAt).toUTCString()}</pubDate>` : `<pubDate>${new Date('2024-10-10').toUTCString()}</pubDate>`}
          <guid>${frontUrl}${pageUrl}</guid>
        </item>`;
      })
      .join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>RecIdeas RSS Feed</title>
          <link>${frontUrl}</link>
          <description>Les dernières recettes de RecIdeas</description>
          <language>fr</language>
          ${rssItems}
        </channel>
      </rss>`;

    const dirPath = './public/fr';
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
    }

    // Écrire le fichier rss.xml
    writeFileSync('./public/fr/rss.xml', rssXml);
  };

  // Récupérer les données depuis l'API
  const responsePages = await fetchJson(`${urlApi}posts/all`);

  // Générer le fichier RSS
  generateXml(responsePages, baseUrl);

  // const generateXmlTranslation = (pages, frontUrl, desiredLocales) => {
  //   const indexPage = pages.find(
  //     (page) => page.translations && page.translations.some(
  //       (t) => desiredLocales.includes(t.url),
  //     ),
  //   );

  //   const rssItems = pages
  //     .filter((page) => page !== indexPage)
  //     .map((page) => {
  //       if (page.translations && Array.isArray(page.translations)) {
  //         return page.translations
  //           .filter((t) => desiredLocales.includes(t.locale))
  //           .map((t) => {
  //             const pageUrl = t.url.startsWith('/') ? t.url.slice(1) : t.url;

  //             return `<item>
  //               <title>${t.title}</title>
  //               <link>${frontUrl}${pageUrl}</link>
  //               <description>${t.metaDescription || t.title}</description>
  //               ${t.createdAt ? `<pubDate>${new Date(t.createdAt).toUTCString()}</pubDate>` : `<pubDate>${new Date('2024-10-10').toUTCString()}</pubDate>`}
  //               <guid>${frontUrl}${pageUrl}</guid>
  //             </item>`;
  //           })
  //           .join('');
  //       }
  //       return '';
  //     })
  //     .join('');

  //   desiredLocales.forEach((locale) => {
  //     const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
  //       <rss version="2.0">
  //         <channel>
  //           <title>${indexPage ? indexPage.translations.find((t) => t.locale === locale)?.title : 'RecIdeas'}</title>
  //           <link>${frontUrl}${locale}</link>
  //       <description>${indexPage ? indexPage.translations.find((t) => t.locale === locale)?.metaDescription || indexPage.title : 'Les dernières recettes de RecIdeas'}</description>
  //           <langues>${locale}</langues>
  //           ${rssItems}
  //         </channel>
  //       </rss>`;

  //     const dirPath = `./public/${locale}`;
  //     if (!existsSync(dirPath)) {
  //       mkdirSync(dirPath);
  //     }

  //     writeFileSync(`${dirPath}/rss.xml`, rssXml);
  //   });
  // };
  // const desiredLocales = ['de', 'en'];
  // generateXmlTranslation(responsePages, baseUrl, desiredLocales);

  console.log('RSS feed generated successfully!');
};

generateRss();
