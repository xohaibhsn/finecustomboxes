import Layout from '../components/Layout';
import Link from 'next/link';

const products = [
  { name: 'Cardboard Boxes', icon: '📦', slug: 'cardboard-boxes', desc: 'Lightweight & durable for all products. Perfect for retail packaging.' },
  { name: 'Mailer Boxes', icon: '📬', slug: 'mailer-boxes', desc: 'Perfect for eCommerce shipping. Strong & tamper-proof.' },
  { name: 'Kraft Boxes', icon: '🌿', slug: 'kraft-boxes', desc: 'Eco-friendly natural packaging. Biodegradable & recyclable.' },
  { name: 'Rigid Boxes', icon: '🎁', slug: 'rigid-boxes', desc: 'Premium feel for luxury products. Ideal for gifts & high-end brands.' },
  { name: 'Corrugated Boxes', icon: '🏭', slug: 'corrugated-boxes', desc: 'Heavy duty industrial packaging. Maximum protection for fragile items.' },
  { name: 'Display Boxes', icon: '🛍️', slug: 'display-boxes', desc: 'Retail-ready display solutions. Boost your product visibility.' },
  { name: 'Cosmetic Boxes', icon: '💄', slug: 'cosmetic-boxes', desc: 'Elegant beauty packaging. Perfect for skincare & makeup brands.' },
  { name: 'Food Boxes', icon: '🍕', slug: 'food-boxes', desc: 'Safe & certified food packaging. FDA compliant materials.' },
  { name: 'Soap Boxes', icon: '🧼', slug: 'soap-boxes', desc: 'Custom printed soap packaging. Great for handmade & organic brands.' },
  { name: 'Candle Boxes', icon: '🕯️', slug: 'candle-boxes', desc: 'Stylish candle packaging. Protect & present your candles beautifully.' },
  { name: 'Jewelry Boxes', icon: '💍', slug: 'jewelry-boxes', desc: 'Elegant jewelry packaging. Velvet inserts & premium finishes available.' },
  { name: 'Shipping Boxes', icon: '🚚', slug: 'shipping-boxes', desc: 'Strong shipping boxes. Safe delivery guaranteed every time.' },
];

export default function Products() {
  return (
    <Layout title="Custom Packaging Products — FineCustomBoxes" description="Browse our wide range of custom packaging boxes. Cardboard, mailer, kraft, rigid, corrugated & more.">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">Our Products</h1>
          <p className="mt-4 text-emerald-100 text-lg">Custom packaging solutions for every industry & need</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`}
                className="group border border-gray-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition">
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-emerald-600">{p.name}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{p.desc}</p>
                <span className="mt-4 inline-block text-emerald-600 text-sm font-semibold group-hover:underline">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-emerald-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Don't See What You Need?</h2>
          <p className="mt-3 text-emerald-100">We can manufacture any custom box style. Contact us with your requirements!</p>
          <Link href="/quote" className="mt-6 inline-block bg-white text-emerald-700 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition">
            Get Custom Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
