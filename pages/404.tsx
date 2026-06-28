import Layout from '../components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout title="404 — Page Not Found | FineCustomBoxes">
      <div style={{ minHeight: '80vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '80px', fontWeight: 900, color: '#facc15', lineHeight: 1, marginBottom: '8px' }}>404</div>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>📦</div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', margin: '0 0 12px 0' }}>Page Not Found</h1>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: '0 0 32px 0', lineHeight: 1.7 }}>Oops! The page you're looking for doesn't exist or has been moved.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', fontSize: '15px' }}>Go Home</Link>
            <Link href="/products" style={{ display: 'inline-block', background: '#facc15', color: '#111827', padding: '14px 28px', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', fontSize: '15px' }}>View Products</Link>
            <Link href="/quote" style={{ display: 'inline-block', background: 'white', color: '#111827', padding: '14px 28px', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', fontSize: '15px', border: '2px solid #e5e7eb' }}>Get a Quote</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
