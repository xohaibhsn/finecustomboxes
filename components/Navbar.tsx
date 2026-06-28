import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

type ProductLink = { name: string; slug: string; icon: string; bg: string };

const industryLinks: ProductLink[] = [
  { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes', icon: '💄', bg: '#fdf2f8' },
  { name: 'Food Boxes', slug: 'food-boxes', icon: '🍱', bg: '#fff7ed' },
  { name: 'Jewelry Boxes', slug: 'jewelry-boxes', icon: '💎', bg: '#f0f9ff' },
  { name: 'Candle Boxes', slug: 'candle-boxes', icon: '🕯️', bg: '#fefce8' },
  { name: 'Soap Boxes', slug: 'soap-boxes', icon: '🧼', bg: '#ecfdf5' },
  { name: 'Shipping Boxes', slug: 'shipping-boxes', icon: '📦', bg: '#f3f4f6' },
];

const materialLinks: ProductLink[] = [
  { name: 'Cardboard Boxes', slug: 'cardboard-boxes', icon: '📋', bg: '#f3f4f6' },
  { name: 'Kraft Boxes', slug: 'kraft-boxes', icon: '🌿', bg: '#fefce8' },
  { name: 'Corrugated Boxes', slug: 'corrugated-boxes', icon: '🏗️', bg: '#f3f4f6' },
  { name: 'Rigid Boxes', slug: 'rigid-boxes', icon: '👑', bg: '#faf5ff' },
];

const styleLinks: ProductLink[] = [
  { name: 'Mailer Boxes', slug: 'mailer-boxes', icon: '✉️', bg: '#eff6ff' },
  { name: 'Display Boxes', slug: 'display-boxes', icon: '🛍️', bg: '#fdf2f8' },
  { name: 'Gift Boxes', slug: 'rigid-boxes', icon: '🎁', bg: '#fef2f2' },
  { name: 'Window Boxes', slug: 'display-boxes', icon: '🪟', bg: '#f0fdf4' },
];

function MegaColumn({ title, titleBg, titleColor, links }: { title: string; titleBg: string; titleColor: string; links: ProductLink[] }) {
  return (
    <div>
      <div className="nav-mega-col-title" style={{ background: titleBg, color: titleColor }}>{title}</div>
      <div className="nav-mega-items">
        {links.map(l => (
          <Link key={l.slug + l.name} href={`/products/${l.slug}`} className="nav-mega-item">
            <span className="nav-mega-icon" style={{ background: l.bg }}>{l.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>{l.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const { settings } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMobile = () => {
    setMenuOpen(false);
    setMobileProductsOpen(false);
  };

  const allMobileProducts = [
    { label: 'By Industry', links: industryLinks },
    { label: 'By Material', links: materialLinks },
    { label: 'By Style', links: styleLinks },
  ];

  return (
    <header className="nav-header">
      {/* Top Bar */}
      <div className="nav-top">
        <div className="nav-top-inner">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="FineCustomBoxes" style={{ height: '38px', width: 'auto' }} />
            ) : (
              <div style={{ width: '38px', height: '38px', background: '#facc15', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '17px', color: '#111827' }}>F</div>
            )}
            <span className="nav-logo-text" style={{ fontSize: '18px', fontWeight: 900, color: '#111827' }}>
              Fine<span style={{ color: '#eab308' }}>Custom</span>Boxes
            </span>
          </Link>

          <div className="nav-contact-row">
            <a href={`tel:${settings.phone}`} className="nav-contact-chip">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              {settings.phone || '+1 (555) 000-0000'}
            </a>
            <a href={`mailto:${settings.email}`} className="nav-contact-chip">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              {settings.email || 'info@finecustomboxes.com'}
            </a>
            <a href={`https://wa.me/${settings.whatsapp || '15550000000'}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#16a34a', color: 'white', padding: '8px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#15803d'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#16a34a'}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
            <Link href="/quote" className="nav-cta-btn">Get Free Quote</Link>
          </div>

          <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="nav-main">
        <div className="nav-main-inner">
          <Link href="/" className="nav-link">Home</Link>

          <div
            className={`nav-mega-wrap${megaOpen ? ' open' : ''}`}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button className={`nav-link${megaOpen ? ' active' : ''}`} aria-expanded={megaOpen}>
              Products
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transition: 'transform 0.25s', transform: megaOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="nav-mega">
              <div className="nav-mega-grid">
                <MegaColumn title="By Industry" titleBg="#fdf2f8" titleColor="#9d174d" links={industryLinks} />
                <MegaColumn title="By Material" titleBg="#fefce8" titleColor="#854d0e" links={materialLinks} />
                <MegaColumn title="By Style" titleBg="#eff6ff" titleColor="#1d4ed8" links={styleLinks} />
              </div>
              <div className="nav-mega-footer">
                <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                  <strong style={{ color: '#111827' }}>50+ box styles</strong> · Free design · Free USA shipping
                </p>
                <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#111827', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 800, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#facc15'; (e.currentTarget as HTMLAnchorElement).style.color = '#111827'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#111827'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}>
                  Browse All Products →
                </Link>
              </div>
            </div>
          </div>

          <Link href="/about" className="nav-link">About</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <Link href="/quote" className="nav-link nav-link-all">Get Quote</Link>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`nav-drawer-overlay${menuOpen ? ' open' : ''}`} onClick={closeMobile} />

      {/* Mobile Drawer */}
      <div className={`nav-drawer${menuOpen ? ' open' : ''}`}>
        <div className="nav-drawer-header">
          <span style={{ color: 'white', fontWeight: 900, fontSize: '16px' }}>Menu</span>
          <button onClick={closeMobile} aria-label="Close menu" style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1.5px solid #374151', background: '#1f2937', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="nav-drawer-body">
          <Link href="/" className="nav-drawer-link" onClick={closeMobile}>Home</Link>

          <button
            className="nav-drawer-link"
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            Products
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transition: 'transform 0.3s', transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0)', color: '#9ca3af' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className={`nav-drawer-accordion${mobileProductsOpen ? ' open' : ''}`}>
            <div style={{ padding: '8px 0 16px' }}>
              {allMobileProducts.map(group => (
                <div key={group.label} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', marginBottom: '8px', paddingLeft: '4px' }}>{group.label}</div>
                  {group.links.map(l => (
                    <Link key={l.slug + l.name} href={`/products/${l.slug}`} className="nav-drawer-sub" onClick={closeMobile}>
                      <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: l.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{l.icon}</span>
                      {l.name}
                    </Link>
                  ))}
                </div>
              ))}
              <Link href="/products" onClick={closeMobile} style={{ display: 'block', textAlign: 'center', background: '#111827', color: 'white', padding: '12px', borderRadius: '10px', fontWeight: 800, fontSize: '14px', textDecoration: 'none' }}>
                View All Products →
              </Link>
            </div>
          </div>

          <Link href="/about" className="nav-drawer-link" onClick={closeMobile}>About</Link>
          <Link href="/blog" className="nav-drawer-link" onClick={closeMobile}>Blog</Link>
          <Link href="/contact" className="nav-drawer-link" onClick={closeMobile}>Contact</Link>
        </div>

        <div className="nav-drawer-footer">
          <a href={`tel:${settings.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '10px' }}>
            <span style={{ width: '32px', height: '32px', background: '#fefce8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</span>
            {settings.phone || '+1 (555) 000-0000'}
          </a>
          <a href={`https://wa.me/${settings.whatsapp || '15550000000'}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '14px' }}>
            <span style={{ width: '32px', height: '32px', background: '#ecfdf5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💬</span>
            WhatsApp Us
          </a>
          <Link href="/quote" onClick={closeMobile} style={{ display: 'block', textAlign: 'center', background: '#dc2626', color: 'white', padding: '14px', borderRadius: '12px', fontWeight: 900, fontSize: '15px', textDecoration: 'none' }}>
            Get Free Quote →
          </Link>
        </div>
      </div>
    </header>
  );
}
