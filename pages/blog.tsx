import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import pool from '../lib/db';

interface Post { id: number; title: string; slug: string; excerpt: string; created_at: string; }

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <Layout title="Blog — FineCustomBoxes" description="Packaging tips, industry news, and custom box guides from FineCustomBoxes.">

      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Our Blog</h1>
          <p style={{ fontSize: '17px', color: '#9ca3af', margin: 0 }}>Packaging tips, trends & industry insights</p>
        </div>
      </section>

      <section style={{ background: 'white' }} className="page-section">
        <div className="page-container">
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '14px' }}>📝</div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#374151', margin: '0 0 8px 0' }}>No posts yet</h2>
              <p style={{ color: '#9ca3af', fontSize: '15px', margin: 0 }}>Check back soon for packaging tips & insights!</p>
            </div>
          ) : (
            <div className="grid-3">
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', borderRadius: '14px', border: '1.5px solid #e5e7eb', overflow: 'hidden', display: 'block', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#facc15'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}>
                  <div style={{ height: '160px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '40px' }}>📝</span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontSize: '11px', color: '#d97706', fontWeight: 700, marginBottom: '8px' }}>
                      {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h2 style={{ fontSize: '17px', fontWeight: 900, color: '#111827', margin: '0 0 8px 0', lineHeight: 1.4 }}>{post.title}</h2>
                    <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 14px 0', lineHeight: 1.7 }}>{post.excerpt}</p>
                    <span style={{ color: '#d97706', fontWeight: 700, fontSize: '13px' }}>Read More →</span>
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
