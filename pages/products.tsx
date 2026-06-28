import Layout from '../components/Layout';
import Link from 'next/link';

const products = [
  { name: 'Cardboard Boxes', slug: 'cardboard-boxes', desc: 'Lightweight & durable for all products.', bg: '#f3f4f6' },
  { name: 'Mailer Boxes', slug: 'mailer-boxes', desc: 'Perfect for eCommerce shipping.', bg: '#f3f4f6' },
  { name: 'Kraft Boxes', slug: 'kraft-boxes', desc: 'Eco-friendly natural packaging.', bg: '#fefce8' },
  { name: 'Rigid Boxes', slug: 'rigid-boxes', desc: 'Premium feel for luxury products.', bg: '#f3f4f6' },
  { name: 'Corrugated Boxes', slug: 'corrugated-boxes', desc: 'Heavy duty industrial packaging.', bg: '#f3f4f6' },
  { name: 'Display Boxes', slug: 'display-boxes', desc: 'Retail-ready display solutions.', bg: '#f3f4f6' },
  { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes', desc: 'Elegant beauty packaging.', bg: '#fdf2f8' },
  { name: 'Food Boxes', slug: 'food-boxes', desc: 'Safe & certified food packaging.', bg: '#fff7ed' },
  { name: 'Soap Boxes', slug: 'soap-boxes', desc: 'Custom printed soap packaging.', bg: '#fefce8' },
  { name: 'Candle Boxes', slug: 'candle-boxes', desc: 'Stylish candle packaging.', bg: '#fefce8' },
  { name: 'Jewelry Boxes', slug: 'jewelry-boxes', desc: 'Luxurious jewelry packaging.', bg: '#f3f4f6' },
  { name: 'Shipping Boxes', slug: 'shipping-boxes', desc: 'Strong shipping boxes.', bg: '#f3f4f6' },
];

export default function Products() {
  return (
    <Layout title="Custom Packaging Products — FineCustomBoxes" description="Browse our wide range of custom packaging boxes.">

      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Our Products</h1>
          <p style={{ fontSize: '17px', color: '#ffffff', margin: 0 }}>Custom packaging solutions for every industry & need</p>
        </div>
      </section>

      <section style={{ background: 'white' }} className="page-section">
        <div className="page-container">
          <div className="grid-4">
            {products.map(p => (
              <Link key={p.slug} href={`/products/${p.slug}`} style={{ textDecoration: 'none', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #e5e7eb', display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#facc15'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}>
                <div style={{ height: '160px', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ width: '56px', height: '56px', border: '2px dashed #d1d5db', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" fill="none" stroke="#d1d5db" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontWeight: 900, color: '#111827', fontSize: '14px', margin: '0 0 4px 0' }}>{p.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 10px 0' }}>{p.desc}</p>
                  <span style={{ color: '#d97706', fontSize: '12px', fontWeight: 700 }}>Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#facc15', textAlign: 'center' }} className="page-section">
        <div className="page-container">
          <h2 className="cta-title">Don't See What You Need?</h2>
          <p style={{ fontSize: '17px', color: '#78350f', margin: '0 0 28px 0' }}>We can manufacture any custom box style!</p>
          <Link href="/quote" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '16px 44px', borderRadius: '14px', fontWeight: 900, textDecoration: 'none', fontSize: '17px' }}>Get Custom Quote →</Link>
        </div>
      </section>

    </Layout>
  );
}
