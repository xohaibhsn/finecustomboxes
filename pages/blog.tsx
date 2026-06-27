import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import pool from '../lib/db';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
}

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <Layout title="Blog — FineCustomBoxes" description="Packaging tips, industry news, and custom box guides from FineCustomBoxes.">
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">Our Blog</h1>
          <p className="mt-4 text-emerald-100 text-lg">Packaging tips, trends & industry insights</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-700">No posts yet</h2>
              <p className="text-gray-500 mt-2">Check back soon for packaging tips & insights!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}
                  className="group border border-gray-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition">
                  <div className="text-sm text-emerald-600 font-medium mb-2">
                    {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600">{post.title}</h2>
                  <p className="text-gray-500 mt-2 leading-relaxed">{post.excerpt}</p>
                  <span className="mt-4 inline-block text-emerald-600 font-semibold group-hover:underline">Read More →</span>
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
    const [rows] = await pool.query(
      'SELECT id, title, slug, excerpt, created_at FROM blog_posts WHERE status = ? ORDER BY created_at DESC',
      ['published']
    ) as any;
    return { props: { posts: JSON.parse(JSON.stringify(rows)) } };
  } catch {
    return { props: { posts: [] } };
  }
};
