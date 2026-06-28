import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const productData: Record<string, { name: string; icon: string; desc: string; features: string[]; materials: string[] }> = {
  'cardboard-boxes': {
    name: 'Cardboard Boxes', icon: '📦',
    desc: 'Our custom cardboard boxes are perfect for retail packaging, product boxes, and subscription boxes. Lightweight yet durable, these boxes can be fully customized with your brand colors, logo, and design.',
    features: ['Full color CMYK printing', 'Gloss or matte finish', 'Custom sizes available', 'Low minimum order (50 units)', 'Free design support', 'Fast 7-day turnaround'],
    materials: ['E-flute cardboard', 'B-flute cardboard', 'SBS paperboard', 'Recycled materials available'],
  },
  'mailer-boxes': {
    name: 'Mailer Boxes', icon: '📬',
    desc: 'Custom mailer boxes are the gold standard for eCommerce packaging. Strong, self-locking design means no tape needed. Perfect for subscription boxes, apparel, cosmetics, and more.',
    features: ['Self-locking design', 'No tape required', 'Interior & exterior printing', 'Custom inserts available', 'Tamper-evident option', 'Eco-friendly materials'],
    materials: ['Single wall corrugated', 'Double wall corrugated', 'Kraft board', 'White clay-coated'],
  },
  'kraft-boxes': {
    name: 'Kraft Boxes', icon: '🌿',
    desc: 'Our eco-friendly kraft boxes are made from natural brown kraft paper. Perfect for organic products, handmade goods, and brands that value sustainability.',
    features: ['100% recyclable', 'Biodegradable materials', 'Natural brown or white kraft', 'Custom printing available', 'Window cut-out option', 'Food safe certified'],
    materials: ['Natural kraft paper', 'White kraft paper', 'Recycled kraft board'],
  },
  'rigid-boxes': {
    name: 'Rigid Boxes', icon: '🎁',
    desc: 'Premium rigid boxes are the pinnacle of luxury packaging. Used by high-end brands for jewelry, electronics, perfumes, and premium gifts. Thick walls give an upscale feel.',
    features: ['4mm thick rigid board', 'Magnetic closure option', 'Velvet interior lining', 'Foil stamping available', 'Embossing & debossing', 'Ribbon pull option'],
    materials: ['2mm grey board', '3mm chipboard', 'Luxury wrapping paper', 'Fabric & velvet lining'],
  },
  'corrugated-boxes': {
    name: 'Corrugated Boxes', icon: '🏭',
    desc: 'Heavy-duty corrugated boxes provide maximum protection for fragile, heavy, or industrial products. Ideal for shipping, warehousing, and large item packaging.',
    features: ['Up to 200lb burst strength', 'Double & triple wall options', 'Custom printing', 'Die-cut inserts', 'Stackable design', 'Moisture resistant coating'],
    materials: ['Single wall (3-ply)', 'Double wall (5-ply)', 'Triple wall (7-ply)', 'Honeycomb board'],
  },
  'display-boxes': {
    name: 'Display Boxes', icon: '🛍️',
    desc: 'Custom display boxes boost your product visibility on retail shelves. Counter display boxes, PDQ trays, and floor displays available in any size and print.',
    features: ['Counter display options', 'Floor display units', 'PDQ trays available', 'Bold graphics printing', 'Easy assembly', 'Retail-ready design'],
    materials: ['SBS paperboard', 'E-flute corrugated', 'Kraft board'],
  },
  'cosmetic-boxes': {
    name: 'Cosmetic Boxes', icon: '💄',
    desc: 'Elegant custom cosmetic boxes for skincare, makeup, perfume, and beauty brands. Premium finishes make your products stand out on shelves and online.',
    features: ['Spot UV coating', 'Holographic foil', 'Soft touch matte', 'Window patching', 'Custom inserts', 'FDA compliant materials'],
    materials: ['SBS 350gsm board', 'Kraft paper', 'Rigid board', 'Eco-friendly options'],
  },
  'food-boxes': {
    name: 'Food Boxes', icon: '🍕',
    desc: 'FDA-certified food-safe custom boxes for bakeries, restaurants, meal kits, and food brands. Grease resistant and moisture proof options available.',
    features: ['FDA food safe certified', 'Grease resistant coating', 'Moisture proof lining', 'Custom printed', 'Ventilation holes available', 'Compostable options'],
    materials: ['Food-grade kraft', 'SBS food board', 'Compostable materials', 'PE-coated board'],
  },
  'soap-boxes': {
    name: 'Soap Boxes', icon: '🧼',
    desc: 'Beautiful custom soap boxes for handmade, organic, and commercial soap brands. Window boxes let customers see and smell your product.',
    features: ['Window cut-out option', 'Kraft or white board', 'Full color printing', 'Sleeve style available', 'Tuck end design', 'Eco-friendly materials'],
    materials: ['Kraft board', 'White SBS board', 'Recycled paper'],
  },
  'candle-boxes': {
    name: 'Candle Boxes', icon: '🕯️',
    desc: 'Custom candle packaging that protects your candles and enhances their presentation. Perfect for jar candles, pillar candles, and gift sets.',
    features: ['Protective inserts', 'Window display option', 'Luxury finishes', 'Custom sizing', 'Gift set packaging', 'Eco-friendly options'],
    materials: ['Rigid board', 'Kraft paper', 'SBS paperboard'],
  },
  'jewelry-boxes': {
    name: 'Jewelry Boxes', icon: '💍',
    desc: 'Luxurious custom jewelry boxes with velvet inserts, magnetic closures, and premium finishes. Perfect for rings, necklaces, bracelets, and watches.',
    features: ['Velvet interior', 'Magnetic closure', 'Foam inserts', 'Ribbon pull', 'Gold/silver foil', 'Custom logo embossing'],
    materials: ['Rigid grey board', 'Velvet lining', 'Satin ribbon', 'Luxury wrapping paper'],
  },
  'shipping-boxes': {
    name: 'Shipping Boxes', icon: '🚚',
    desc: 'Heavy-duty custom shipping boxes that protect your products in transit. Available in standard and custom sizes with full color printing.',
    features: ['High burst strength', 'Custom sizes', 'Branded printing', 'Double wall option', 'Easy assembly', 'Bulk pricing available'],
    materials: ['Single wall corrugated', 'Double wall corrugated', 'Kraft corrugated'],
  },
};

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const product = productData[slug as string];

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="text-center py-40">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-3xl font-bold text-gray-700">Product Not Found</h1>
          <Link href="/products" className="mt-6 inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold">
            Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${product.name} — FineCustomBoxes`} description={product.desc}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.desc,
            "brand": {
              "@type": "Brand",
              "name": "FineCustomBoxes"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "FineCustomBoxes"
              }
            }
          })
        }}
      />
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="text-8xl">{product.icon}</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>
            <p className="mt-4 text-emerald-100 text-lg max-w-2xl">{product.desc}</p>
            <Link href="/quote" className="mt-6 inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-black hover:bg-yellow-500 transition">
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Features & Materials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Features</h2>
            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-gray-600">
                  <span className="w-5 h-5 bg-yellow-400 text-black rounded-full flex items-center justify-center text-xs font-black">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Materials</h2>
            <ul className="space-y-3">
              {product.materials.map((m) => (
                <li key={m} className="flex items-center gap-3 text-gray-600">
                  <span className="w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-black">→</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-yellow-400 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Ready to Order {product.name}?</h2>
          <p className="mt-3 text-emerald-100">Get a free quote in minutes. Free design & free shipping included!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link href="/quote" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-black hover:bg-gray-800 transition">
              Get Free Quote
            </Link>
            <Link href="/products" className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-black hover:bg-gray-100 transition">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
