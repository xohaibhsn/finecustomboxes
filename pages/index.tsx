import Layout from '../components/Layout';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { name: 'Cardboard Boxes', slug: 'cardboard-boxes', desc: 'Lightweight & durable for all products', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80' },
  { name: 'Mailer Boxes', slug: 'mailer-boxes', desc: 'Perfect for eCommerce shipping', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { name: 'Kraft Boxes', slug: 'kraft-boxes', desc: 'Eco-friendly natural packaging', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80' },
  { name: 'Rigid Boxes', slug: 'rigid-boxes', desc: 'Premium feel for luxury products', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { name: 'Corrugated Boxes', slug: 'corrugated-boxes', desc: 'Heavy duty industrial packaging', img: 'https://images.unsplash.com/photo-1595079837922-4f5e6f95b76a?w=400&q=80' },
  { name: 'Display Boxes', slug: 'display-boxes', desc: 'Retail-ready display solutions', img: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80' },
  { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes', desc: 'Elegant beauty packaging', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80' },
  { name: 'Food Boxes', slug: 'food-boxes', desc: 'Safe & certified food packaging', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
];

const features = [
  { icon: '🚚', title: 'Free Shipping', desc: 'Free delivery on all orders across the USA' },
  { icon: '🎨', title: 'Free Design', desc: 'Our designers create your artwork for free' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Production in as little as 7 business days' },
  { icon: '📦', title: 'Low Minimums', desc: 'Order as few as 50 boxes' },
  { icon: '✅', title: 'Quality Guarantee', desc: '100% satisfaction or we reprint for free' },
  { icon: '🌿', title: 'Eco Friendly', desc: 'Sustainable materials available' },
];

const finishes = [
  { name: 'Spot UV', icon: '✨', desc: 'High-gloss coating on selected areas' },
  { name: 'Gold Foil', icon: '🥇', desc: 'Metallic gold stamping for luxury feel' },
  { name: 'Embossing', icon: '🔲', desc: 'Raised design for tactile premium feel' },
  { name: 'Soft Touch', icon: '🤍', desc: 'Velvet-like matte lamination' },
  { name: 'Gloss Lamination', icon: '💎', desc: 'Shiny protective coating' },
  { name: 'Matte Finish', icon: '🖤', desc: 'Elegant flat finish for modern brands' },
];

const testimonials = [
  { name: 'Sarah Johnson', company: 'Bloom Cosmetics', text: 'FineCustomBoxes delivered exactly what we needed. Quality exceeded expectations and turnaround was incredibly fast!', rating: 5 },
  { name: 'Mike Rodriguez', company: 'FreshBite Foods', text: 'We have been ordering custom food boxes for 2 years. Consistent quality, great pricing, amazing customer service every time.', rating: 5 },
  { name: 'Emily Chen', company: 'LuxeJewels', text: 'Our jewelry packaging looks absolutely stunning. Customers always comment on how premium our boxes feel. Highly recommended!', rating: 5 },
  { name: 'David Park', company: 'TechShip Co', text: 'The corrugated shipping boxes are incredibly durable. Zero damage reports since we switched to FineCustomBoxes.', rating: 5 },
];

const faqs = [
  { q: 'What is the minimum order quantity?', a: 'Our minimum order is just 50 boxes, making us perfect for small businesses and startups.' },
  { q: 'Do you offer free design services?', a: 'Yes! Our in-house design team will create your artwork for free. Just share your logo and brand colors.' },
  { q: 'How long does production take?', a: 'Standard production is 7–10 business days. Rush orders available in 3–5 business days.' },
  { q: 'Do you ship across the USA?', a: 'Yes, we offer free shipping on all orders to any location across the United States.' },
  { q: 'Can I get a sample before ordering?', a: 'Absolutely! We offer free digital mockups and physical samples are available for a small fee.' },
];

const clientLogos = ['Amazon', 'Walmart', 'Target', 'Shopify', 'Etsy', 'eBay'];

export default function Home() {
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', boxType: '', quantity: '' });
  const [quoteStatus, setQuoteStatus] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteStatus('sending');
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...quoteForm, boxType: quoteForm.boxType, message: '' }),
    });
    if (res.ok) { setQuoteStatus('success'); setQuoteForm({ name: '', email: '', phone: '', boxType: '', quantity: '' }); }
    else setQuoteStatus('error');
  };

  return (
    <Layout
      title="Custom Packaging Boxes USA — Free Design & Shipping | FineCustomBoxes"
      description="Order custom packaging boxes with logo at wholesale prices. Free design, free shipping, 50 box minimum. Trusted by 5,000+ USA businesses. Get a free quote today!"
    >
      {/* Hero — White BG, Text Left, Form Right */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-block bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              #1 Custom Packaging USA
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Custom Packaging<br />
              <span className="text-yellow-500">Your Customers</span><br />
              Will Love
            </h1>
            <p className="text-gray-600 text-lg mt-4 leading-relaxed">
              High-quality custom boxes with free design, free shipping, and low minimums.
              Trusted by 5,000+ businesses across the United States.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                '✅ Free Design Included',
                '🚚 Free USA Shipping',
                '📦 50 Box Minimum',
                '⚡ 7-Day Production',
              ].map((b) => (
                <div key={b} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700">{b}</div>
              ))}
            </div>

            {/* Review Badges */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="text-xs font-bold text-gray-700">5.0 Google Reviews</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-green-600 text-sm font-black">✓</span>
                <span className="text-xs font-bold text-gray-700">BBB Accredited</span>
              </div>
            </div>
          </div>

          {/* Right — Quote Form */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-2xl">
            <h2 className="text-xl font-black mb-1">Get a Free Quote</h2>
            <p className="text-gray-400 text-sm mb-4">Response within 24 hours — no hidden fees!</p>
            {quoteStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-xl font-black text-yellow-400">Quote Received!</h3>
                <p className="text-gray-400 mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3">
                <input type="text" placeholder="Your Name *" required
                  value={quoteForm.name} onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400" />
                <input type="email" placeholder="Email Address *" required
                  value={quoteForm.email} onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400" />
                <input type="text" placeholder="Phone Number"
                  value={quoteForm.phone} onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400" />
                <select required value={quoteForm.boxType} onChange={(e) => setQuoteForm({ ...quoteForm, boxType: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-yellow-400">
                  <option value="">Select Box Type *</option>
                  {['Cardboard Boxes','Mailer Boxes','Kraft Boxes','Rigid Boxes','Corrugated Boxes','Display Boxes','Cosmetic Boxes','Food Boxes','Other'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <input type="text" placeholder="Quantity (e.g. 500)"
                  value={quoteForm.quantity} onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400" />
                {quoteStatus === 'error' && <p className="text-red-400 text-sm">Something went wrong. Try again!</p>}
                <button type="submit" disabled={quoteStatus === 'sending'}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-black hover:bg-red-700 transition disabled:opacity-50">
                  {quoteStatus === 'sending' ? 'Sending...' : '🚀 Get Free Quote Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-yellow-400 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 text-black text-sm font-black">
          {['🚚 Free USA Shipping', '🎨 Free Design Service', '📦 50 Box Minimum', '⚡ 7-Day Turnaround', '✅ 100% Satisfaction', '🌿 Eco-Friendly Options'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section className="bg-gray-50 py-8 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-6">Trusted By Leading Brands</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {clientLogos.map((logo) => (
              <div key={logo} className="text-gray-300 font-black text-xl tracking-tight">{logo}</div>
            ))}
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
              <div className="text-3xl font-black text-yellow-400">{s.num}</div>
              <div className="text-gray-400 mt-1 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories — Photo Cards */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Our Packaging Solutions</h2>
            <p className="text-gray-500 mt-3 text-lg">Choose from our wide range of custom box styles</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products/${cat.slug}`}
                className="group rounded-xl overflow-hidden border border-gray-100 hover:border-yellow-400 hover:shadow-xl transition">
                <div className="h-40 overflow-hidden">
                  <img src={cat.img} alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-black text-gray-900 group-hover:text-yellow-600 text-sm">{cat.name}</h3>
                  <p className="text-gray-500 text-xs mt-1">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="bg-gray-900 text-white px-8 py-3 rounded-lg font-black hover:bg-gray-800 transition">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Finishes */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Premium Finishes</h2>
            <p className="text-gray-500 mt-3 text-lg">Elevate your packaging with our luxury finishing options</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {finishes.map((f) => (
              <div key={f.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:border-yellow-400 hover:shadow-md transition">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-black text-gray-900">{f.name}</h3>
                <p className="text-gray-500 text-sm mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Choose FineCustomBoxes?</h2>
            <p className="text-gray-500 mt-3 text-lg">We make custom packaging easy, affordable & fast</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-yellow-400 transition">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-2xl mb-4">{f.icon}</div>
                <h3 className="font-black text-gray-900 text-lg">{f.title}</h3>
                <p className="text-gray-500 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2nd Quote Form */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-black">Ready to Order<br /><span className="text-yellow-400">Custom Boxes?</span></h2>
            <p className="mt-4 text-gray-400 text-lg">Get a free quote in minutes. No hidden fees. Free design & free shipping included.</p>
            <ul className="mt-6 space-y-2 text-gray-300">
              {['Free design consultation', 'No die or plate charges', 'Ships anywhere in the USA', '100% satisfaction guarantee'].map(i => (
                <li key={i} className="flex items-center gap-2"><span className="text-yellow-400 font-black">✓</span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <h3 className="text-xl font-black text-gray-900 mb-4">Get Your Free Quote</h3>
            <form onSubmit={handleQuoteSubmit} className="space-y-3">
              <input type="text" placeholder="Your Name *" required
                value={quoteForm.name} onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400" />
              <input type="email" placeholder="Email Address *" required
                value={quoteForm.email} onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400" />
              <select required value={quoteForm.boxType} onChange={(e) => setQuoteForm({ ...quoteForm, boxType: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 text-gray-600">
                <option value="">Select Box Type *</option>
                {['Cardboard Boxes','Mailer Boxes','Kraft Boxes','Rigid Boxes','Corrugated Boxes','Display Boxes','Cosmetic Boxes','Food Boxes','Other'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <button type="submit" disabled={quoteStatus === 'sending'}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-black hover:bg-red-700 transition disabled:opacity-50">
                {quoteStatus === 'sending' ? 'Sending...' : '🚀 Get Free Quote Now'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-500 mt-3 text-lg">Trusted by 5,000+ businesses across the USA</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-yellow-400 transition">
                <div className="flex text-yellow-400 mb-3 text-lg">{'★'.repeat(t.rating)}</div>
                <p className="text-gray-600 text-sm leading-relaxed">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="font-black text-gray-900">{t.name}</div>
                  <div className="text-yellow-600 text-sm font-semibold">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-3">Got questions? We have answers.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-black text-gray-900 flex items-center justify-between hover:bg-gray-50 transition">
                  {faq.q}
                  <span className="text-yellow-500 text-xl font-black">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 text-gray-600 border-t border-gray-100 bg-gray-50">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-yellow-400 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Start Your Custom Box Order Today</h2>
          <p className="mt-4 text-gray-800 text-lg">Free design · Free shipping · 50 minimum · 7-day turnaround</p>
          <Link href="/quote" className="mt-8 inline-block bg-gray-900 text-white px-10 py-4 rounded-lg font-black text-lg hover:bg-gray-800 transition">
            Get Free Quote Now →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
