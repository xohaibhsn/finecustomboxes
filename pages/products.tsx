import Layout from '../components/Layout';
import Link from 'next/link';

const products = [
  { name: 'Cardboard Boxes', slug: 'cardboard-boxes', desc: 'Lightweight & durable for all products.', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80' },
  { name: 'Mailer Boxes', slug: 'mailer-boxes', desc: 'Perfect for eCommerce shipping.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { name: 'Kraft Boxes', slug: 'kraft-boxes', desc: 'Eco-friendly natural packaging.', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80' },
  { name: 'Rigid Boxes', slug: 'rigid-boxes', desc: 'Premium feel for luxury products.', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { name: 'Corrugated Boxes', slug: 'corrugated-boxes', desc: 'Heavy duty industrial packaging.', img: 'https://images.unsplash.com/photo-1595079837922-4f5e6f95b76a?w=400&q=80' },
  { name: 'Display Boxes', slug: 'display-boxes', desc: 'Retail-ready display solutions.', img: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80' },
  { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes', desc: 'Elegant beauty packaging.', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80' },
  { name: 'Food Boxes', slug: 'food-boxes', desc: 'Safe & certified food packaging.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
  { name: 'Soap Boxes', slug: 'soap-boxes', desc: 'Custom printed soap packaging.', img: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80' },
  { name: 'Candle Boxes', slug: 'candle-boxes', desc: 'Stylish candle packaging.', img: 'https://images.unsplash.com/photo-1608181831718-c9fdc0e47b71?w=400&q=80' },
  { name: 'Jewelry Boxes', slug: 'jewelry-boxes', desc: 'Luxurious jewelry packaging.', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  { name: 'Shipping Boxes', slug: 'shipping-boxes', desc: 'Strong shipping boxes.', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80' },
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
                className="group rounded-xl overflow-hidden border border-gray-100 hover:border-yellow-400 hover:shadow-xl transition">
                <div className="h-48 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
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
