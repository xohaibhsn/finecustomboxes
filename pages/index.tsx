import Layout from '../components/Layout';
import Link from 'next/link';

const categories = [
  { name: 'Cardboard Boxes', icon: '📦', slug: 'cardboard-boxes', desc: 'Lightweight & durable for all products' },
  { name: 'Mailer Boxes', icon: '📬', slug: 'mailer-boxes', desc: 'Perfect for eCommerce shipping' },
  { name: 'Kraft Boxes', icon: '🌿', slug: 'kraft-boxes', desc: 'Eco-friendly natural packaging' },
  { name: 'Rigid Boxes', icon: '🎁', slug: 'rigid-boxes', desc: 'Premium feel for luxury products' },
  { name: 'Corrugated Boxes', icon: '🏭', slug: 'corrugated-boxes', desc: 'Heavy duty industrial packaging' },
  { name: 'Display Boxes', icon: '🛍️', slug: 'display-boxes', desc: 'Retail-ready display solutions' },
  { name: 'Cosmetic Boxes', icon: '💄', slug: 'cosmetic-boxes', desc: 'Elegant beauty packaging' },
  { name: 'Food Boxes', icon: '🍕', slug: 'food-boxes', desc: 'Safe & certified food packaging' },
];

const features = [
  { icon: '🚚', title: 'Free Shipping', desc: 'Free delivery on all orders across the USA' },
  { icon: '🎨', title: 'Free Design', desc: 'Our designers create your artwork for free' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Production in as little as 7 business days' },
  { icon: '📦', title: 'Low Minimums', desc: 'Order as few as 50 boxes' },
  { icon: '✅', title: 'Quality Guarantee', desc: '100% satisfaction or we reprint for free' },
  { icon: '🌿', title: 'Eco Friendly', desc: 'Sustainable materials available' },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="bg-emerald-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
            #1 Custom Packaging in the USA
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Premium Custom Boxes<br />
            <span className="text-emerald-300">For Your Brand</span>
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            High-quality custom packaging with free design, free shipping, and low minimums. 
            Trusted by 5,000+ businesses across the United States.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/quote" className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-emerald-50 transition">
              Get Free Quote
            </Link>
            <Link href="/products" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-emerald-800 transition">
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '5,000+', label: 'Happy Clients' },
            { num: '50+', label: 'Box Styles' },
            { num: '7 Days', label: 'Avg Turnaround' },
            { num: '100%', label: 'Satisfaction Rate' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-emerald-400">{s.num}</div>
              <div className="text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Packaging Solutions</h2>
            <p className="text-gray-500 mt-3 text-lg">Choose from our wide range of custom box styles</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products/${cat.slug}`}
                className="group border border-gray-200 rounded-xl p-6 text-center hover:border-emerald-500 hover:shadow-lg transition">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600">{cat.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Us?</h2>
            <p className="text-gray-500 mt-3 text-lg">We make custom packaging easy, affordable & fast</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg">{f.title}</h3>
                <p className="text-gray-500 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-emerald-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Order Your Custom Boxes?</h2>
          <p className="mt-4 text-emerald-100 text-lg">Get a free quote in minutes. No hidden fees. No minimum hassle.</p>
          <Link href="/quote" className="mt-8 inline-block bg-white text-emerald-700 px-10 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition">
            Get Free Quote Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}
