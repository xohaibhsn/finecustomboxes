import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="About Us — FineCustomBoxes" description="Learn about FineCustomBox'es — premium custom packaging company serving businesses across the USA.">
      {/* Hero */}
      <section style={{ background: '#111827', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 900, color: 'white', margin: '0 0 16px 0' }}>About FineCustomBoxes</h1>
          <p style={{ fontSize: '18px', color: '#9ca3af', margin: 0 }}>Your trusted partner for premium custom packaging in the USA</p>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#111827', margin: '0 0 24px 0' }}>Our Story</h2>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.8, margin: '0 0 16px 0' }}>FineCustomBoxes was founded with one mission — to help businesses of all sizes get access to high-quality, affordable custom packaging. We believe your packaging is the first impression your customer has of your brand.</p>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.8, margin: '0 0 16px 0' }}>From small startups to large enterprises, we have helped over 5,000 businesses across the United States create packaging that stands out on shelves and delivers products safely.</p>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.8, margin: 0 }}>With free design support, free shipping, and a 100% satisfaction guarantee, we make custom packaging simple and stress-free.</p>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: '20px', padding: '48px', textAlign: 'center', border: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: '64px', marginBottom: '32px' }}>📦</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { num: '5,000+', label: 'Happy Clients' },
                  { num: '10+', label: 'Years Experience' },
                  { num: '50+', label: 'Box Styles' },
                  { num: '100%', label: 'Satisfaction' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#facc15' }}>{s.num}</div>
                    <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#f9fafb', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#111827', margin: '0 0 12px 0' }}>Our Values</h2>
            <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>What drives us every day</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: '🎯', title: 'Quality First', desc: 'Every box goes through strict quality control before shipping to you.' },
              { icon: '💚', title: 'Sustainability', desc: 'We use eco-friendly materials and sustainable manufacturing processes.' },
              { icon: '🤝', title: 'Customer Focus', desc: 'Your success is our success. We go above and beyond for every client.' },
            ].map(v => (
              <div key={v.title} style={{ background: 'white', borderRadius: '16px', padding: '32px', textAlign: 'center', border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '56px', height: '56px', background: '#facc15', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 16px auto' }}>{v.icon}</div>
                <h3 style={{ fontWeight: 900, color: '#111827', fontSize: '18px', margin: '0 0 10px 0' }}>{v.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '15px', margin: 0, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#facc15', padding: '80px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#111827', margin: '0 0 12px 0' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '18px', color: '#78350f', margin: '0 0 32px 0' }}>Get a free quote and free design — no minimum order stress.</p>
          <Link href="/quote" style={{ display: 'inline-block', background: '#111827', color: 'white', padding: '16px 48px', borderRadius: '14px', fontWeight: 900, textDecoration: 'none', fontSize: '18px' }}>
            Get Free Quote →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
