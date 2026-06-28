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
      {/* Hero */}
      <section style={{ background: '#111827', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 900, color: 'white', margin: '0 0 16px 0' }}>Our Products</h1>
          <p style={{ fontSize: '18px', color: '#9ca3af', margin: 0 }}>Custom packaging solutions for every industry & need</p>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {products.map(p => (
              <Link key={p.slug} href={`/products/${p.slug}`} style={{ textDecoration: 'none', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid #e5e7eb', display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#facc15'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}>
                <div style={{ height: '180px', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ width: '64px', height: '64px', border: '2px dashed #d1d5db', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" fill="none" stroke="#d1d5db" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontWeight: 900, color: '#111827', fontSize: '15px', margin: '0 0 6px 0' }}>{p.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 12px 0' }}>{p.desc}</p>
                  <span style={{ color: '#d97706', fontSize: '13px', fontWeight: 700 }}>Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#facc15', padding: '80px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#111827', margin: '0 0 12px 0' }}>Don't See What You Need?</h2>
          <p style={{ fontSize: '17px', color: '#78350f', margin: '0 0 28px 0' }}>We can manufacture any custom box style. Contact us with your requirements!</p>
          <Link href="/quote" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '16px 48px', borderRadius: '14px', fontWeight: 900, textDecoration: 'none', fontSize: '17px' }}>
            Get Custom Quote →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
