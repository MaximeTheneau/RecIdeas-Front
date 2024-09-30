const fs = require('fs');

const generateRss = async () => {
  const urlApi = 'http://localhost:8000/api/';
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
          <description>${page.metaDescription || 'Description non disponible'}</description>
          <pubDate>${new Date(page.createdAt).toUTCString()}</pubDate>
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

    // Écrire le fichier rss.xml
    fs.writeFileSync('./public/fr/rss.xml', rssXml);
  };

  // Récupérer les données depuis l'API
  const responsePages = await fetchJson(`${urlApi}posts/all`);

  // Générer le fichier RSS
  generateXml(responsePages, baseUrl);

  const generateXmlTranslation = (pages, frontUrl) => {
    pages.forEach((page) => {
      if (page.translations && Array.isArray(page.translations)) {
        page.translations.forEach((t) => {
          const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
            <rss version="2.0">
              <channel>
                <title>RecIdeas RSS Feed</title>
                <link>${frontUrl}${t}</link>
              `;

          const dirPath = `./public/${t.locale}`;
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
          }

          fs.writeFileSync(`${dirPath}/rss.xml`, rssXml);
        });
      }
    });
  };

  generateXmlTranslation(responsePages, baseUrl);

  console.log('RSS feed generated successfully!');
};

generateRss();
