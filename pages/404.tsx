import Layout from '../components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout title="404 — Page Not Found | FineCustomBoxes">
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl font-black text-yellow-400 mb-4">404</div>
          <div className="text-6xl mb-6">📦</div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">Page Not Found</h1>
          <p className="text-gray-500 text-lg mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-black hover:bg-gray-800 transition">Go Home</Link>
            <Link href="/products" className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-black hover:bg-yellow-500 transition">View Products</Link>
            <Link href="/quote" className="border-2 border-gray-300 text-gray-600 px-8 py-3 rounded-lg font-black hover:bg-gray-100 transition">Get a Quote</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
