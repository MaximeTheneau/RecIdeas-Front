const fs = require('fs');

const generateSitemap = async () => {
  const urlApi = 'https://back.recideas.com/api/';
  const urlFront = 'https://recideas.com/';

  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (pages, urlFront) => {
    const sitemapXml = pages
      .map((page) => `<url>
          <loc>${urlFront}${page.url}</loc>
          <lastmod>${page.updatedAt ? page.updatedAt : new Date().toISOString()}</lastmod>
        </url>`)
      .join('');

    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapXml}
      </urlset>`;

    fs.writeFileSync('./public/sitemap.xml', sitemapIndexXml);
  };

  // Fetch data from API
  const responsePages = await fetchJson(`${urlApi}posts/all`);
  const pagesWithPriority = responsePages.map((page) => {
    if (page.slug === 'home') {
      page.url = '';
    }
    return page;
  });
  generateXml(pagesWithPriority, urlFront);

  // Generate sitemap index (if needed)
  // ...
  const totalNumPages = responsePages.length;
  console.log(`Total number of pages in the sitemap: ${totalNumPages}`);

  console.log('Sitemap generated successfully!');
};

generateSitemap();
