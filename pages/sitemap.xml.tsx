import { GetServerSideProps } from 'next';

const SITE_URL = 'https://finecustomboxes.com';

const slugs = [
  'cardboard-boxes', 'mailer-boxes', 'kraft-boxes', 'rigid-boxes',
  'corrugated-boxes', 'display-boxes', 'cosmetic-boxes', 'food-boxes',
  'soap-boxes', 'candle-boxes', 'jewelry-boxes', 'shipping-boxes',
];

function generateSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/products</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE_URL}/quote</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE_URL}/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${SITE_URL}/contact</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${SITE_URL}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE_URL}/privacy-policy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>${SITE_URL}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  ${slugs.map(slug => `<url><loc>${SITE_URL}/products/${slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n  ')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() { return null; }
