import Layout from '../components/Layout';
import Link from 'next/link';

const products = [
  { name: 'Cardboard Boxes', slug: 'cardboard-boxes', desc: 'Lightweight & durable for all products.', bg: 'bg-gray-100' },
  { name: 'Mailer Boxes', slug: 'mailer-boxes', desc: 'Perfect for eCommerce shipping.', bg: 'bg-gray-100' },
  { name: 'Kraft Boxes', slug: 'kraft-boxes', desc: 'Eco-friendly natural packaging.', bg: 'bg-amber-50' },
  { name: 'Rigid Boxes', slug: 'rigid-boxes', desc: 'Premium feel for luxury products.', bg: 'bg-gray-100' },
  { name: 'Corrugated Boxes', slug: 'corrugated-boxes', desc: 'Heavy duty industrial packaging.', bg: 'bg-gray-100' },
  { name: 'Display Boxes', slug: 'display-boxes', desc: 'Retail-ready display solutions.', bg: 'bg-gray-100' },
  { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes', desc: 'Elegant beauty packaging.', bg: 'bg-pink-50' },
  { name: 'Food Boxes', slug: 'food-boxes', desc: 'Safe & certified food packaging.', bg: 'bg-orange-50' },
  { name: 'Soap Boxes', slug: 'soap-boxes', desc: 'Custom printed soap packaging.', bg: 'bg-amber-50' },
  { name: 'Candle Boxes', slug: 'candle-boxes', desc: 'Stylish candle packaging.', bg: 'bg-yellow-50' },
  { name: 'Jewelry Boxes', slug: 'jewelry-boxes', desc: 'Luxurious jewelry packaging.', bg: 'bg-gray-100' },
  { name: 'Shipping Boxes', slug: 'shipping-boxes', desc: 'Strong shipping boxes.', bg: 'bg-gray-100' },
];

export default function Products() {
  return (
    <Layout title="Custom Packaging Products — FineCustomBoxes" description="Browse our wide range of custom packaging boxes.">
      <section className="bg-gray-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black">Our Products</h1>
          <p className="mt-4 text-gray-400 text-lg">Custom packaging solutions for every industry & need</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`}
                className="group rounded-xl overflow-hidden border border-gray-200 hover:border-yellow-400 hover:shadow-xl transition">
                <div className={`h-48 ${p.bg} flex items-center justify-center border-b border-gray-100`}>
                  <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-gray-900 group-hover:text-yellow-600">{p.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
                  <span className="mt-3 inline-block text-yellow-600 text-sm font-black group-hover:underline">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-yellow-400 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900">Don't See What You Need?</h2>
          <p className="mt-3 text-gray-800">We can manufacture any custom box style!</p>
          <Link href="/quote" className="mt-6 inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-black hover:bg-gray-800 transition">
            Get Custom Quote →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
