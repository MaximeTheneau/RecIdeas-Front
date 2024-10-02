const fs = require('fs');

const generateSitemap = async () => {
  const urlApi = 'https://back.recideas.com/api/';
  // const urlApi = 'http://localhost:8000/api/';

  const baseUrl = 'https://recideas.com/';

  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (pages, frontUrl) => {
    const sitemapXmlFr = pages
      .map((page) => {
        const pageUrl = page.url.startsWith('/') ? page.url.slice(1) : page.url;

        const translationLinks = page.translations && Array.isArray(page.translations)
          ? page.translations.map((t) => `<xhtml:link rel="alternate" hreflang="${t.locale}" href="${frontUrl}${t.url}" />
          `).join('')
          : '';

        return `<url>
          <loc>${frontUrl}${pageUrl}</loc>
          ${translationLinks}
        </url>`;
      })
      .join('');

    const sitemapXmlTrans = pages
      .map((page) => (page.translations && Array.isArray(page.translations)
        ? page.translations.map((t) => {
          const translationUrl = t.url.startsWith('/') ? t.url.slice(1) : t.url;

          const translationLinks = page.translations
            .filter((trans) => trans.locale !== t.locale)
            .map((trans) => `<xhtml:link rel="alternate" hreflang="${trans.locale}" href="${frontUrl}${trans.url}" />
              `).join('');

          const originalPageLink = `<xhtml:link rel="alternate" hreflang="${page.locale}" href="${frontUrl}${page.url.startsWith('/') ? page.url.slice(1) : page.url}" />`;

          return `<url>
                <loc>${frontUrl}${translationUrl}</loc>
                ${originalPageLink}
                ${translationLinks}
              </url>`;
        }).join('')
        : ''))
      .join('');

    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${sitemapXmlFr}
        ${sitemapXmlTrans}
      </urlset>`;

    // Écrire le fichier sitemap.xml
    fs.writeFileSync('./public/sitemap.xml', sitemapIndexXml);
  };

  // Récupérer les données depuis l'API
  const responsePages = await fetchJson(`${urlApi}posts/all`);

  // Générer le sitemap
  generateXml(responsePages, baseUrl);

  console.log('Sitemap generated successfully!');
};

generateSitemap();
