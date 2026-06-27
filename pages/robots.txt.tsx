import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin-login
Disallow: /api/

Sitemap: https://finecustomboxes.com/sitemap.xml`);
  res.end();
  return { props: {} };
};

export default function Robots() { return null; }
