import Layout from '../../components/Layout';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import pool from '../../lib/db';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  created_at: string;
}

export default function BlogPost({ post }: { post: Post | null }) {
  if (!post) {
    return (
      <Layout title="Post Not Found — FineCustomBoxes">
        <div className="text-center py-40">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold text-gray-700">Post Not Found</h1>
          <Link href="/blog" className="mt-6 inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold">
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={post.meta_title || post.title}
      description={post.meta_description || post.excerpt}
    >
      <section className="bg-gray-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-emerald-300 text-sm mb-4">
            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">{post.title}</h1>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-emerald-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/blog" className="text-emerald-600 font-semibold hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = ? AND status = ?',
      [params?.slug, 'published']
    ) as any;
    if (!rows.length) return { props: { post: null } };
    return { props: { post: JSON.parse(JSON.stringify(rows[0])) } };
  } catch {
    return { props: { post: null } };
  }
};
