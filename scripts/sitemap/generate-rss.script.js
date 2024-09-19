const fs = require('fs');
// const xml = require('xml');

const RSS_NAMESPACE = 'http://www.w3.org/2005/Atom';
const SITE_URL = 'https://recideas.com';
const FEED_URL = `${SITE_URL}/rss.xml`;
const API_URL = 'https://back.recideas.com/api/posts&category=Articles';

const fetchPostsFromApi = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Expected an array of posts');
    }

    return data.map((post) => ({
      title: post.title || 'Untitled',
      description: post.metaDescription || 'No description available',
      link: `${SITE_URL}${post.url || '/'}`,
      pubDate: new Date(post.updatedAt || post.createdAt).toUTCString(),
      guid: `${SITE_URL}${post.url || '/'}`,
    }));
  } catch (error) {
    console.error('Error fetching posts from API:', error);
    throw error;
  }
};

const generateRssFeed = async () => {
  try {
    const posts = await fetchPostsFromApi();

    const rssItems = posts.map((post) => ({
      item: [
        { title: post.title },
        { description: post.description },
        { link: post.link },
        { guid: post.guid },
        { pubDate: post.pubDate },
      ],
    }));

    const rssFeed = xml({
      rss: [
        { _attr: { version: '2.0', 'xmlns:atom': 'http://www.w3.org/2005/Atom' } },
        {
          channel: [
            { title: 'recideas.com ' },
            { link: SITE_URL },
            { description: 'Generateur de recette' },
            { 'atom:link': { _attr: { href: FEED_URL, rel: 'self', type: 'application/rss+xml' } } },
            ...rssItems,
          ],
        },
      ],
      _attr: { xmlns: RSS_NAMESPACE },
    });

    fs.writeFileSync('./public/rss.xml', rssFeed, 'utf8');
    console.log('RSS feed generated successfully!');
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    process.exit(1); // Exit with error code
  }
};

generateRssFeed();
