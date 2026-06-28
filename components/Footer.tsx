import Link from 'next/link';
import { useSettings } from '../hooks/useSettings';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer>
      {/* Trust Strip */}
      <div style={{ background: '#111827', borderTop: '3px solid #facc15', padding: '20px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px' }}>
            {['✅ 100% Satisfaction Guarantee', '🎨 Free Design Service', '🚚 Free USA Shipping', '📦 No Die Charges', '⚡ Fast Turnaround'].map(t => (
              <span key={t} style={{ fontSize: '13px', fontWeight: 700, color: '#d1d5db', letterSpacing: '0.02em' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ background: '#0f172a', padding: '64px 0 48px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <div className="grid-footer">

            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="FineCustomBoxes" style={{ height: '36px', width: 'auto' }} />
                ) : (
                  <div style={{ width: '36px', height: '36px', background: '#facc15', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px', color: '#111827', flexShrink: 0 }}>F</div>
                )}
                <span style={{ fontWeight: 900, fontSize: '16px', color: 'white' }}>FineCustomBoxes</span>
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, margin: '0 0 24px 0', maxWidth: '280px' }}>
                Premium custom packaging solutions for businesses across the USA. Quality you can trust, prices you'll love.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <a href={`tel:${settings.phone || '+15550000000'}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#facc15'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}>
                  <span style={{ width: '32px', height: '32px', background: '#1e293b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>📞</span>
                  {settings.phone || '+1 (555) 000-0000'}
                </a>
                <a href={`mailto:${settings.email || 'info@finecustomboxes.com'}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#facc15'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}>
                  <span style={{ width: '32px', height: '32px', background: '#1e293b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>📧</span>
                  {settings.email || 'info@finecustomboxes.com'}
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '14px' }}>
                  <span style={{ width: '32px', height: '32px', background: '#1e293b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>📍</span>
                  {settings.address || 'United States'}
                </div>
              </div>
              <a href={`https://wa.me/${settings.whatsapp || '15550000000'}?text=Hi%2C%20I%27m%20interested%20in%20custom%20packaging.`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#16a34a', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#15803d'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#16a34a'}>
                💬 WhatsApp Us
              </a>
            </div>

            {/* Products */}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 900, color: '#facc15', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 20px 0' }}>Our Products</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Cardboard Boxes', slug: 'cardboard-boxes' },
                  { name: 'Mailer Boxes', slug: 'mailer-boxes' },
                  { name: 'Kraft Boxes', slug: 'kraft-boxes' },
                  { name: 'Rigid Boxes', slug: 'rigid-boxes' },
                  { name: 'Corrugated Boxes', slug: 'corrugated-boxes' },
                  { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes' },
                  { name: 'Food Boxes', slug: 'food-boxes' },
                  { name: 'Display Boxes', slug: 'display-boxes' },
                ].map(p => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#facc15'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 900, color: '#facc15', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 20px 0' }}>Company</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'All Products', href: '/products' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'Get a Quote', href: '/quote' },
                  { name: 'Privacy Policy', href: '/privacy-policy' },
                  { name: 'Terms & Conditions', href: '/terms' },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#facc15'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'}>
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose Us */}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 900, color: '#facc15', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 20px 0' }}>Why Choose Us</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: '🚚', text: 'Free USA Shipping' },
                  { icon: '🎨', text: 'Free Design Service' },
                  { icon: '📦', text: '50 Box Minimum' },
                  { icon: '⚡', text: '7-Day Production' },
                  { icon: '✅', text: '100% Satisfaction' },
                  { icon: '🌿', text: 'Eco-Friendly Options' },
                ].map(i => (
                  <li key={i.text} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '14px' }}>
                    <span>{i.icon}</span>
                    <span>{i.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ background: '#0a0f1a', borderTop: '1px solid #1e293b', padding: '20px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#4b5563' }}>© {new Date().getFullYear()} FineCustomBoxes. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[{ name: 'Privacy Policy', href: '/privacy-policy' }, { name: 'Terms & Conditions', href: '/terms' }, { name: 'Contact', href: '/contact' }].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '13px', color: '#4b5563', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#facc15'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#4b5563'}>
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
