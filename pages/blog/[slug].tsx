import Layout from '../../components/Layout';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import pool from '../../lib/db';

interface Post { id: number; title: string; slug: string; content: string; excerpt: string; meta_title: string; meta_description: string; created_at: string; }

export default function BlogPost({ post }: { post: Post | null }) {
  if (!post) return (
    <Layout title="Post Not Found — FineCustomBoxes">
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }} className="page-section">
        <div style={{ fontSize: '56px', marginBottom: '14px' }}>📝</div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#374151', margin: '0 0 20px 0' }}>Post Not Found</h1>
        <Link href="/blog" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '12px 28px', borderRadius: '10px', fontWeight: 900, textDecoration: 'none' }}>Back to Blog</Link>
      </div>
    </Layout>
  );

  return (
    <Layout title={post.meta_title || post.title} description={post.meta_description || post.excerpt}>

      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#facc15', fontWeight: 700, marginBottom: '14px' }}>
            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: 'white', margin: 0, lineHeight: 1.2, wordBreak: 'break-word' }}>{post.title}</h1>
        </div>
      </section>

      <section style={{ background: 'white' }} className="page-section">
        <div className="narrow-container">
          <div className="blog-content" style={{ fontSize: '16px', color: '#374151', lineHeight: 1.9 }} dangerouslySetInnerHTML={{ __html: post.content }} />
          <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid #f3f4f6' }}>
            <Link href="/blog" style={{ color: '#d97706', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>← Back to Blog</Link>
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
