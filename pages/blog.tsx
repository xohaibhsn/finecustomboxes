import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import pool from '../lib/db';

interface Post { id: number; title: string; slug: string; excerpt: string; created_at: string; }

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <Layout title="Blog — FineCustomBoxes" description="Packaging tips, industry news, and custom box guides from FineCustomBoxes.">
      {/* Hero */}
      <section style={{ background: '#111827', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 900, color: 'white', margin: '0 0 16px 0' }}>Our Blog</h1>
          <p style={{ fontSize: '18px', color: '#9ca3af', margin: 0 }}>Packaging tips, trends & industry insights</p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>📝</div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#374151', margin: '0 0 8px 0' }}>No posts yet</h2>
              <p style={{ color: '#9ca3af', fontSize: '16px', margin: 0 }}>Check back soon for packaging tips & insights!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', borderRadius: '16px', border: '1.5px solid #e5e7eb', overflow: 'hidden', display: 'block', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#facc15'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}>
                  <div style={{ height: '180px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '48px' }}>📝</span>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ fontSize: '12px', color: '#d97706', fontWeight: 700, marginBottom: '10px' }}>
                      {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#111827', margin: '0 0 10px 0', lineHeight: 1.4 }}>{post.title}</h2>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0', lineHeight: 1.7 }}>{post.excerpt}</p>
                    <span style={{ color: '#d97706', fontWeight: 700, fontSize: '14px' }}>Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [rows] = await pool.query('SELECT id, title, slug, excerpt, created_at FROM blog_posts WHERE status = ? ORDER BY created_at DESC', ['published']) as any;
    return { props: { posts: JSON.parse(JSON.stringify(rows)) } };
  } catch {
    return { props: { posts: [] } };
  }
};
