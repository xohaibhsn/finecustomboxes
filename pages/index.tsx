import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useSettings } from '../hooks/useSettings';

const categories = [
  { name: 'Cardboard Boxes', slug: 'cardboard-boxes', desc: 'Lightweight & durable for all products', bg: '#f3f4f6' },
  { name: 'Mailer Boxes', slug: 'mailer-boxes', desc: 'Perfect for eCommerce shipping', bg: '#f3f4f6' },
  { name: 'Kraft Boxes', slug: 'kraft-boxes', desc: 'Eco-friendly natural packaging', bg: '#fefce8' },
  { name: 'Rigid Boxes', slug: 'rigid-boxes', desc: 'Premium feel for luxury products', bg: '#f3f4f6' },
  { name: 'Corrugated Boxes', slug: 'corrugated-boxes', desc: 'Heavy duty industrial packaging', bg: '#f3f4f6' },
  { name: 'Display Boxes', slug: 'display-boxes', desc: 'Retail-ready display solutions', bg: '#f3f4f6' },
  { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes', desc: 'Elegant beauty packaging', bg: '#fdf2f8' },
  { name: 'Food Boxes', slug: 'food-boxes', desc: 'Safe & certified food packaging', bg: '#fff7ed' },
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
  { name: 'Mike Rodriguez', company: 'FreshBite Foods', text: 'Ordering custom food boxes for 2 years. Consistent quality, great pricing, amazing customer service every time.', rating: 5 },
  { name: 'Emily Chen', company: 'LuxeJewels', text: 'Our jewelry packaging looks absolutely stunning. Customers always comment on how premium our boxes feel!', rating: 5 },
  { name: 'David Park', company: 'TechShip Co', text: 'The corrugated shipping boxes are incredibly durable. Zero damage reports since we switched to FineCustomBoxes.', rating: 5 },
];

const faqs = [
  { q: 'What is the minimum order quantity?', a: 'Our minimum order is just 50 boxes, making us perfect for small businesses and startups.' },
  { q: 'Do you offer free design services?', a: 'Yes! Our in-house design team will create your artwork for free. Just share your logo and brand colors.' },
  { q: 'How long does production take?', a: 'Standard production is 7–10 business days. Rush orders available in 3–5 business days.' },
  { q: 'Do you ship across the USA?', a: 'Yes, we offer free shipping on all orders to any location across the United States.' },
  { q: 'Can I get a sample before ordering?', a: 'Absolutely! We offer free digital mockups and physical samples are available for a small fee.' },
];

export default function Home() {
  const { settings } = useSettings();
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', boxType: '', quantity: '' });
  const [quoteStatus, setQuoteStatus] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteStatus('sending');
    const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...quoteForm, message: '' }) });
    if (res.ok) { setQuoteStatus('success'); setQuoteForm({ name: '', email: '', phone: '', boxType: '', quantity: '' }); }
    else setQuoteStatus('error');
  };

  return (
    <Layout title="Custom Packaging Boxes USA — Free Design & Shipping | FineCustomBoxes" description="Order custom packaging boxes with logo at wholesale prices. Free design, free shipping, 50 box minimum. Trusted by 5,000+ USA businesses.">

      {/* Hero */}
      <section style={{ background: 'white', borderBottom: '1px solid #f3f4f6' }} className="page-section">
        <div className="page-container">
          <div className="grid-2-wide" style={{ alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: '#facc15', color: '#111827', fontSize: '11px', fontWeight: 900, padding: '6px 16px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>
                #1 Custom Packaging USA
              </div>
              <h1 className="hero-title" style={{ color: '#111827' }}>
                {settings.hero_title || 'Custom Packaging Your Customers Will Love'}
              </h1>
              <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: 1.7, margin: '0 0 28px 0' }}>
                {settings.hero_subtitle || 'High-quality custom boxes with free design, free shipping, and low minimums. Trusted by 5,000+ businesses.'}
              </p>
              <div className="grid-2" style={{ marginBottom: '20px' }}>
                {['✅ Free Design Included', '🚚 Free USA Shipping', '📦 50 Box Minimum', '⚡ 7-Day Production'].map(b => (
                  <div key={b} style={{ background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', fontWeight: 700, color: '#374151' }}>{b}</div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px 14px' }}>
                  <span style={{ color: '#facc15' }}>★★★★★</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>5.0 Google Reviews</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px 14px' }}>
                  <span style={{ color: '#16a34a', fontWeight: 900 }}>✓</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>BBB Accredited</span>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div style={{ background: '#111827', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <h2 style={{ color: 'white', fontWeight: 900, fontSize: '20px', margin: '0 0 6px 0' }}>Get a Free Quote</h2>
              <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 20px 0' }}>Response within 24 hours — no hidden fees!</p>
              {quoteStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
                  <h3 style={{ color: '#facc15', fontWeight: 900, fontSize: '18px', margin: '0 0 8px 0' }}>Quote Received!</h3>
                  <p style={{ color: '#9ca3af', margin: 0, fontSize: '14px' }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input type="text" placeholder="Your Name *" required value={quoteForm.name} onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })} className="input-field" style={{ background: '#1f2937', border: '1.5px solid #374151', color: 'white' }} />
                  <input type="email" placeholder="Email Address *" required value={quoteForm.email} onChange={e => setQuoteForm({ ...quoteForm, email: e.target.value })} className="input-field" style={{ background: '#1f2937', border: '1.5px solid #374151', color: 'white' }} />
                  <input type="text" placeholder="Phone Number" value={quoteForm.phone} onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })} className="input-field" style={{ background: '#1f2937', border: '1.5px solid #374151', color: 'white' }} />
                  <select required value={quoteForm.boxType} onChange={e => setQuoteForm({ ...quoteForm, boxType: e.target.value })} className="input-field" style={{ background: '#1f2937', border: '1.5px solid #374151', color: quoteForm.boxType ? 'white' : '#9ca3af' }}>
                    <option value="">Select Box Type *</option>
                    {['Cardboard Boxes', 'Mailer Boxes', 'Kraft Boxes', 'Rigid Boxes', 'Corrugated Boxes', 'Display Boxes', 'Cosmetic Boxes', 'Food Boxes', 'Other'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <input type="text" placeholder="Quantity (e.g. 500)" value={quoteForm.quantity} onChange={e => setQuoteForm({ ...quoteForm, quantity: e.target.value })} className="input-field" style={{ background: '#1f2937', border: '1.5px solid #374151', color: 'white' }} />
                  {quoteStatus === 'error' && <p style={{ color: '#f87171', fontSize: '13px', margin: 0 }}>Something went wrong. Try again!</p>}
                  <button type="submit" disabled={quoteStatus === 'sending'} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 900, fontSize: '15px', cursor: 'pointer', marginTop: '4px' }}>
                    {quoteStatus === 'sending' ? 'Sending...' : '🚀 Get Free Quote Now'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section style={{ background: '#facc15', padding: '14px 0' }}>
        <div className="page-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {['🚚 Free USA Shipping', '🎨 Free Design Service', '📦 50 Box Minimum', '⚡ 7-Day Turnaround', '✅ 100% Satisfaction'].map(t => (
              <span key={t} style={{ fontSize: '13px', fontWeight: 900, color: '#111827' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#111827', padding: '48px 0' }}>
        <div className="page-container">
          <div className="grid-4">
            {[{ num: '5,000+', label: 'Happy Clients' }, { num: '50+', label: 'Box Styles' }, { num: '7 Days', label: 'Avg Turnaround' }, { num: '100%', label: 'Satisfaction Rate' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#facc15' }}>{s.num}</div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ background: 'white' }} className="page-section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Our Packaging Solutions</h2>
            <p style={{ fontSize: '17px', color: '#6b7280', margin: 0 }}>Choose from our wide range of custom box styles</p>
          </div>
          <div className="grid-4">
            {categories.map(cat => (
              <Link key={cat.slug} href={`/products/${cat.slug}`} style={{ textDecoration: 'none', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #e5e7eb', display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#facc15'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}>
                <div style={{ height: '140px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ width: '56px', height: '56px', border: '2px dashed #d1d5db', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" fill="none" stroke="#d1d5db" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 900, color: '#111827', fontSize: '14px', margin: '0 0 4px 0' }}>{cat.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href="/products" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '14px 32px', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', fontSize: '15px' }}>
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Finishes */}
      <section style={{ background: '#f9fafb' }} className="page-section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Premium Finishes</h2>
            <p style={{ fontSize: '17px', color: '#6b7280', margin: 0 }}>Elevate your packaging with our luxury finishing options</p>
          </div>
          <div className="grid-3">
            {finishes.map(f => (
              <div key={f.name} style={{ background: 'white', borderRadius: '14px', padding: '24px', border: '1.5px solid #e5e7eb', textAlign: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#facc15'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb'; }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 900, color: '#111827', fontSize: '16px', margin: '0 0 6px 0' }}>{f.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: 'white' }} className="page-section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Why Choose FineCustomBoxes?</h2>
            <p style={{ fontSize: '17px', color: '#6b7280', margin: 0 }}>We make custom packaging easy, affordable & fast</p>
          </div>
          <div className="grid-3">
            {features.map(f => (
              <div key={f.title} style={{ background: '#f9fafb', borderRadius: '14px', padding: '24px', border: '1.5px solid #f3f4f6', transition: 'border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#facc15'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#f3f4f6'; }}>
                <div style={{ width: '44px', height: '44px', background: '#facc15', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 900, color: '#111827', fontSize: '16px', margin: '0 0 6px 0' }}>{f.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2nd Quote Form */}
      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container">
          <div className="grid-2-wide" style={{ alignItems: 'center' }}>
            <div style={{ color: 'white' }}>
              <h2 className="cta-title" style={{ color: 'white' }}>Ready to Order <span style={{ color: '#facc15' }}>Custom Boxes?</span></h2>
              <p style={{ color: '#9ca3af', fontSize: '16px', margin: '0 0 24px 0', lineHeight: 1.7 }}>Get a free quote in minutes. No hidden fees. Free design & free shipping included.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Free design consultation', 'No die or plate charges', 'Ships anywhere in the USA', '100% satisfaction guarantee'].map(i => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d1d5db', fontSize: '14px' }}>
                    <span style={{ color: '#facc15', fontWeight: 900 }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '32px' }}>
              <h3 style={{ fontWeight: 900, fontSize: '18px', margin: '0 0 16px 0', color: '#111827' }}>Get Your Free Quote</h3>
              <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Your Name *" required value={quoteForm.name} onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })} className="input-field" />
                <input type="email" placeholder="Email Address *" required value={quoteForm.email} onChange={e => setQuoteForm({ ...quoteForm, email: e.target.value })} className="input-field" />
                <select required value={quoteForm.boxType} onChange={e => setQuoteForm({ ...quoteForm, boxType: e.target.value })} className="input-field" style={{ color: quoteForm.boxType ? '#111827' : '#9ca3af' }}>
                  <option value="">Select Box Type *</option>
                  {['Cardboard Boxes', 'Mailer Boxes', 'Kraft Boxes', 'Rigid Boxes', 'Corrugated Boxes', 'Display Boxes', 'Cosmetic Boxes', 'Food Boxes', 'Other'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <button type="submit" disabled={quoteStatus === 'sending'} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>
                  {quoteStatus === 'sending' ? 'Sending...' : '🚀 Get Free Quote Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#f9fafb' }} className="page-section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">What Our Clients Say</h2>
            <p style={{ fontSize: '17px', color: '#6b7280', margin: 0 }}>Trusted by 5,000+ businesses across the USA</p>
          </div>
          <div className="grid-4">
            {testimonials.map(t => (
              <div key={t.name} style={{ background: 'white', borderRadius: '14px', padding: '20px', border: '1.5px solid #e5e7eb' }}>
                <div style={{ color: '#facc15', fontSize: '16px', marginBottom: '10px' }}>{'★'.repeat(t.rating)}</div>
                <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.7, margin: '0 0 14px 0' }}>"{t.text}"</p>
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                  <div style={{ fontWeight: 900, color: '#111827', fontSize: '13px' }}>{t.name}</div>
                  <div style={{ color: '#d97706', fontSize: '12px', marginTop: '2px' }}>{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'white' }} className="page-section">
        <div className="narrow-container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p style={{ fontSize: '17px', color: '#6b7280', margin: 0 }}>Got questions? We have answers.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ border: '1.5px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '14px', color: '#111827', textAlign: 'left', gap: '12px' }}>
                  <span>{faq.q}</span>
                  <span style={{ color: '#facc15', fontSize: '20px', fontWeight: 900, flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 16px 20px', color: '#6b7280', fontSize: '14px', lineHeight: 1.7, borderTop: '1px solid #f3f4f6', paddingTop: '14px' }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: '#facc15', textAlign: 'center' }} className="page-section">
        <div className="page-container">
          <h2 className="cta-title">Start Your Custom Box Order Today</h2>
          <p style={{ fontSize: '17px', color: '#78350f', margin: '0 0 28px 0' }}>Free design · Free shipping · 50 minimum · 7-day turnaround</p>
          <Link href="/quote" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '16px 44px', borderRadius: '14px', fontWeight: 900, textDecoration: 'none', fontSize: '17px' }}>
            Get Free Quote Now →
          </Link>
        </div>
      </section>

    </Layout>
  );
}
