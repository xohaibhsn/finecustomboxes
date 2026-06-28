import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const productData: Record<string, { name: string; desc: string; features: string[]; materials: string[] }> = {
  'cardboard-boxes': { name: 'Cardboard Boxes', desc: 'Our custom cardboard boxes are perfect for retail packaging, product boxes, and subscription boxes. Lightweight yet durable, fully customized with your brand colors, logo, and design.', features: ['Full color CMYK printing', 'Gloss or matte finish', 'Custom sizes available', 'Low minimum order (50 units)', 'Free design support', 'Fast 7-day turnaround'], materials: ['E-flute cardboard', 'B-flute cardboard', 'SBS paperboard', 'Recycled materials available'] },
  'mailer-boxes': { name: 'Mailer Boxes', desc: 'Custom mailer boxes are the gold standard for eCommerce packaging. Strong, self-locking design — no tape needed. Perfect for subscription boxes, apparel, cosmetics, and more.', features: ['Self-locking design', 'No tape required', 'Interior & exterior printing', 'Custom inserts available', 'Tamper-evident option', 'Eco-friendly materials'], materials: ['Single wall corrugated', 'Double wall corrugated', 'Kraft board', 'White clay-coated'] },
  'kraft-boxes': { name: 'Kraft Boxes', desc: 'Eco-friendly kraft boxes made from natural brown kraft paper. Perfect for organic products, handmade goods, and brands that value sustainability.', features: ['100% recyclable', 'Biodegradable materials', 'Natural brown or white kraft', 'Custom printing available', 'Window cut-out option', 'Food safe certified'], materials: ['Natural kraft paper', 'White kraft paper', 'Recycled kraft board'] },
  'rigid-boxes': { name: 'Rigid Boxes', desc: 'Premium rigid boxes — the pinnacle of luxury packaging. Used by high-end brands for jewelry, electronics, perfumes, and premium gifts.', features: ['4mm thick rigid board', 'Magnetic closure option', 'Velvet interior lining', 'Foil stamping available', 'Embossing & debossing', 'Ribbon pull option'], materials: ['2mm grey board', '3mm chipboard', 'Luxury wrapping paper', 'Fabric & velvet lining'] },
  'corrugated-boxes': { name: 'Corrugated Boxes', desc: 'Heavy-duty corrugated boxes providing maximum protection for fragile, heavy, or industrial products.', features: ['Up to 200lb burst strength', 'Double & triple wall options', 'Custom printing', 'Die-cut inserts', 'Stackable design', 'Moisture resistant coating'], materials: ['Single wall (3-ply)', 'Double wall (5-ply)', 'Triple wall (7-ply)', 'Honeycomb board'] },
  'display-boxes': { name: 'Display Boxes', desc: 'Custom display boxes boost product visibility on retail shelves. Counter display boxes, PDQ trays, and floor displays available in any size.', features: ['Counter display options', 'Floor display units', 'PDQ trays available', 'Bold graphics printing', 'Easy assembly', 'Retail-ready design'], materials: ['SBS paperboard', 'E-flute corrugated', 'Kraft board'] },
  'cosmetic-boxes': { name: 'Cosmetic Boxes', desc: 'Elegant custom cosmetic boxes for skincare, makeup, perfume, and beauty brands. Premium finishes make your products stand out.', features: ['Spot UV coating', 'Holographic foil', 'Soft touch matte', 'Window patching', 'Custom inserts', 'FDA compliant materials'], materials: ['SBS 350gsm board', 'Kraft paper', 'Rigid board', 'Eco-friendly options'] },
  'food-boxes': { name: 'Food Boxes', desc: 'FDA-certified food-safe custom boxes for bakeries, restaurants, meal kits, and food brands. Grease resistant and moisture proof options available.', features: ['FDA food safe certified', 'Grease resistant coating', 'Moisture proof lining', 'Custom printed', 'Ventilation holes available', 'Compostable options'], materials: ['Food-grade kraft', 'SBS food board', 'Compostable materials', 'PE-coated board'] },
  'soap-boxes': { name: 'Soap Boxes', desc: 'Beautiful custom soap boxes for handmade, organic, and commercial soap brands. Window boxes let customers see your product.', features: ['Window cut-out option', 'Kraft or white board', 'Full color printing', 'Sleeve style available', 'Tuck end design', 'Eco-friendly materials'], materials: ['Kraft board', 'White SBS board', 'Recycled paper'] },
  'candle-boxes': { name: 'Candle Boxes', desc: 'Custom candle packaging that protects your candles and enhances their presentation. Perfect for jar candles, pillar candles, and gift sets.', features: ['Protective inserts', 'Window display option', 'Luxury finishes', 'Custom sizing', 'Gift set packaging', 'Eco-friendly options'], materials: ['Rigid board', 'Kraft paper', 'SBS paperboard'] },
  'jewelry-boxes': { name: 'Jewelry Boxes', desc: 'Luxurious custom jewelry boxes with velvet inserts, magnetic closures, and premium finishes. Perfect for rings, necklaces, and watches.', features: ['Velvet interior', 'Magnetic closure', 'Foam inserts', 'Ribbon pull', 'Gold/silver foil', 'Custom logo embossing'], materials: ['Rigid grey board', 'Velvet lining', 'Satin ribbon', 'Luxury wrapping paper'] },
  'shipping-boxes': { name: 'Shipping Boxes', desc: 'Heavy-duty custom shipping boxes that protect your products in transit. Available in standard and custom sizes with full color printing.', features: ['High burst strength', 'Custom sizes', 'Branded printing', 'Double wall option', 'Easy assembly', 'Bulk pricing available'], materials: ['Single wall corrugated', 'Double wall corrugated', 'Kraft corrugated'] },
};

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const product = productData[slug as string];

  if (!product) return (
    <Layout title="Product Not Found">
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }} className="page-section">
        <div style={{ fontSize: '56px', marginBottom: '14px' }}>📦</div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#374151', margin: '0 0 20px 0' }}>Product Not Found</h1>
        <Link href="/products" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '12px 28px', borderRadius: '10px', fontWeight: 900, textDecoration: 'none' }}>Back to Products</Link>
      </div>
    </Layout>
  );

  return (
    <Layout title={`${product.name} — FineCustomBoxes`} description={product.desc}>

      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ width: '80px', height: '80px', background: '#1f2937', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #374151', flexShrink: 0 }}>
              <svg width="32" height="32" fill="none" stroke="#4b5563" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h1 className="page-title">{product.name}</h1>
              <p style={{ fontSize: '16px', color: '#9ca3af', margin: '0 0 20px 0', lineHeight: 1.7 }}>{product.desc}</p>
              <Link href="/quote" style={{ display: 'inline-block', background: '#facc15', color: '#111827', padding: '12px 28px', borderRadius: '10px', fontWeight: 900, textDecoration: 'none', fontSize: '14px' }}>
                Get Free Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'white' }} className="page-section">
        <div className="page-container">
          <div className="grid-2">
            <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '28px', border: '1px solid #f3f4f6' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#111827', margin: '0 0 20px 0' }}>Features</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {product.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#374151', fontSize: '14px' }}>
                    <span style={{ width: '22px', height: '22px', background: '#facc15', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '28px', border: '1px solid #f3f4f6' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#111827', margin: '0 0 20px 0' }}>Available Materials</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {product.materials.map(m => (
                  <li key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#374151', fontSize: '14px' }}>
                    <span style={{ width: '22px', height: '22px', background: '#111827', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, color: 'white', flexShrink: 0 }}>→</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#facc15', textAlign: 'center' }} className="page-section">
        <div className="page-container">
          <h2 className="cta-title">Ready to Order {product.name}?</h2>
          <p style={{ fontSize: '16px', color: '#78350f', margin: '0 0 24px 0' }}>Free quote in minutes. Free design & free shipping included!</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quote" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '14px 36px', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', fontSize: '15px' }}>Get Free Quote →</Link>
            <Link href="/products" style={{ display: 'inline-block', background: 'white', color: '#111827', padding: '14px 36px', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', fontSize: '15px', border: '2px solid #111827' }}>View All Products</Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
