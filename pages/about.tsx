import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="About Us — FineCustomBoxes" description="Learn about FineCustomBoxes — premium custom packaging company serving businesses across the USA.">

      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h1 className="page-title">About FineCustomBoxes</h1>
          <p style={{ fontSize: '17px', color: '#9ca3af', margin: 0 }}>Your trusted partner for premium custom packaging in the USA</p>
        </div>
      </section>

      <section style={{ background: 'white' }} className="page-section">
        <div className="page-container">
          <div className="grid-2-wide" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="section-title">Our Story</h2>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.8, margin: '0 0 16px 0' }}>FineCustomBoxes was founded with one mission — to help businesses of all sizes get access to high-quality, affordable custom packaging. We believe your packaging is the first impression your customer has of your brand.</p>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.8, margin: '0 0 16px 0' }}>From small startups to large enterprises, we have helped over 5,000 businesses across the United States create packaging that stands out on shelves and delivers products safely.</p>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.8, margin: 0 }}>With free design support, free shipping, and a 100% satisfaction guarantee, we make custom packaging simple and stress-free.</p>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: '20px', padding: '36px', textAlign: 'center', border: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: '56px', marginBottom: '24px' }}>📦</div>
              <div className="grid-2">
                {[{ num: '5,000+', label: 'Happy Clients' }, { num: '10+', label: 'Years Experience' }, { num: '50+', label: 'Box Styles' }, { num: '100%', label: 'Satisfaction' }].map(s => (
                  <div key={s.label} style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: '#facc15' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#f9fafb' }} className="page-section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🎯', title: 'Quality First', desc: 'Every box goes through strict quality control before shipping to you.' },
              { icon: '💚', title: 'Sustainability', desc: 'We use eco-friendly materials and sustainable manufacturing processes.' },
              { icon: '🤝', title: 'Customer Focus', desc: 'Your success is our success. We go above and beyond for every client.' },
            ].map(v => (
              <div key={v.title} style={{ background: 'white', borderRadius: '16px', padding: '28px', textAlign: 'center', border: '1.5px solid #e5e7eb' }}>
                <div style={{ width: '52px', height: '52px', background: '#facc15', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 14px auto' }}>{v.icon}</div>
                <h3 style={{ fontWeight: 900, color: '#111827', fontSize: '17px', margin: '0 0 8px 0' }}>{v.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#facc15', textAlign: 'center' }} className="page-section">
        <div className="page-container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p style={{ fontSize: '17px', color: '#78350f', margin: '0 0 28px 0' }}>Get a free quote and free design — no minimum order stress.</p>
          <Link href="/quote" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '16px 44px', borderRadius: '14px', fontWeight: 900, textDecoration: 'none', fontSize: '17px' }}>Get Free Quote →</Link>
        </div>
      </section>

    </Layout>
  );
}
