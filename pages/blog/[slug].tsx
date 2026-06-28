import Layout from '../../components/Layout';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import pool from '../../lib/db';

interface Post { id: number; title: string; slug: string; content: string; excerpt: string; meta_title: string; meta_description: string; created_at: string; }

export default function BlogPost({ post }: { post: Post | null }) {
  if (!post) return (
    <Layout title="Post Not Found — FineCustomBoxes">
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '80px 48px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📝</div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#374151', margin: '0 0 12px 0' }}>Post Not Found</h1>
        <Link href="/blog" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '14px 32px', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', marginTop: '16px' }}>Back to Blog</Link>
      </div>
    </Layout>
  );

  return (
    <Layout title={post.meta_title || post.title} description={post.meta_description || post.excerpt}>
      {/* Hero */}
      <section style={{ background: '#111827', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#facc15', fontWeight: 700, marginBottom: '16px' }}>
            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'white', margin: 0, lineHeight: 1.2 }}>{post.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.9 }} dangerouslySetInnerHTML={{ __html: post.content }} />
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #f3f4f6' }}>
            <Link href="/blog" style={{ color: '#d97706', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>← Back to Blog</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE slug = ? AND status = ?', [params?.slug, 'published']) as any;
    if (!rows.length) return { props: { post: null } };
    return { props: { post: JSON.parse(JSON.stringify(rows[0])) } };
  } catch {
    return { props: { post: null } };
  }
};
