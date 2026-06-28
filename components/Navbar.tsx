import Link from 'next/link';
import { useState } from 'react';
import { useSettings } from '../hooks/useSettings';

const industryLinks = [
  { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes' },
  { name: 'Food Boxes', slug: 'food-boxes' },
  { name: 'Jewelry Boxes', slug: 'jewelry-boxes' },
  { name: 'Candle Boxes', slug: 'candle-boxes' },
  { name: 'Soap Boxes', slug: 'soap-boxes' },
  { name: 'Shipping Boxes', slug: 'shipping-boxes' },
];

const materialLinks = [
  { name: 'Cardboard Boxes', slug: 'cardboard-boxes' },
  { name: 'Kraft Boxes', slug: 'kraft-boxes' },
  { name: 'Corrugated Boxes', slug: 'corrugated-boxes' },
  { name: 'Rigid Boxes', slug: 'rigid-boxes' },
];

const styleLinks = [
  { name: 'Mailer Boxes', slug: 'mailer-boxes' },
  { name: 'Display Boxes', slug: 'display-boxes' },
  { name: 'Gift Boxes', slug: 'rigid-boxes' },
  { name: 'Window Boxes', slug: 'display-boxes' },
];

export default function Navbar() {
  const { settings } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Bar — Logo + Contact + CTA */}
      <div className="bg-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="FineCustomBoxes" className="h-9 w-auto" />
            ) : (
              <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-lg">F</span>
              </div>
            )}
            <span className="text-xl font-black text-gray-900">
              Fine<span className="text-yellow-500">Custom</span>Boxes
            </span>
          </Link>

          {/* Contact Info — Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 font-medium transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 font-medium transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {settings.email}
            </a>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link href="/quote" className="bg-red-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-700 transition">
              Get Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Nav Bar — Dark */}
      <div className="hidden md:block bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-yellow-400 font-medium py-3 text-sm transition">Home</Link>

          {/* Mega Menu */}
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className="text-gray-300 hover:text-yellow-400 font-medium py-3 text-sm transition flex items-center gap-1">
              Products
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {megaOpen && (
              <div className="absolute top-full left-0 mt-0 w-[580px] bg-white rounded-b-xl shadow-2xl p-6 grid grid-cols-3 gap-6 border-t-2 border-yellow-400">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">By Industry</h3>
                  <ul className="space-y-2">
                    {industryLinks.map((l) => (
                      <li key={l.slug}>
                        <Link href={`/products/${l.slug}`} className="text-gray-700 hover:text-yellow-600 text-sm font-medium transition block py-0.5">{l.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">By Material</h3>
                  <ul className="space-y-2">
                    {materialLinks.map((l) => (
                      <li key={l.slug}>
                        <Link href={`/products/${l.slug}`} className="text-gray-700 hover:text-yellow-600 text-sm font-medium transition block py-0.5">{l.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">By Style</h3>
                  <ul className="space-y-2">
                    {styleLinks.map((l) => (
                      <li key={l.slug}>
                        <Link href={`/products/${l.slug}`} className="text-gray-700 hover:text-yellow-600 text-sm font-medium transition block py-0.5">{l.name}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/products" className="mt-4 inline-block bg-yellow-400 text-black px-4 py-2 rounded-lg text-xs font-black hover:bg-yellow-500 transition">
                    View All →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="text-gray-300 hover:text-yellow-400 font-medium py-3 text-sm transition">About</Link>
          <Link href="/blog" className="text-gray-300 hover:text-yellow-400 font-medium py-3 text-sm transition">Blog</Link>
          <Link href="/contact" className="text-gray-300 hover:text-yellow-400 font-medium py-3 text-sm transition">Contact</Link>
          <div className="ml-auto">
            <Link href="/products" className="bg-yellow-400 text-black px-5 py-2 my-1.5 inline-block rounded-lg font-black text-sm hover:bg-yellow-500 transition">
              Portfolio →
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
          <Link href="/" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <button onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            className="text-gray-700 font-medium text-left flex items-center justify-between">
            Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileProductsOpen && (
            <div className="pl-4 space-y-2 border-l-2 border-yellow-400">
              <p className="text-xs font-bold text-gray-400 uppercase">By Industry</p>
              {industryLinks.map((l) => (
                <Link key={l.slug} href={`/products/${l.slug}`} className="block text-gray-600 text-sm hover:text-yellow-600" onClick={() => setMenuOpen(false)}>{l.name}</Link>
              ))}
              <p className="text-xs font-bold text-gray-400 uppercase mt-2">By Material</p>
              {materialLinks.map((l) => (
                <Link key={l.slug} href={`/products/${l.slug}`} className="block text-gray-600 text-sm hover:text-yellow-600" onClick={() => setMenuOpen(false)}>{l.name}</Link>
              ))}
              <Link href="/products" className="block text-yellow-600 text-sm font-bold" onClick={() => setMenuOpen(false)}>View All →</Link>
            </div>
          )}
          <Link href="/about" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/blog" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/contact" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>
          <a href="tel:+15550000000" className="text-gray-700 font-medium">📞 +1 (555) 000-0000</a>
          <Link href="/quote" className="bg-red-600 text-white px-5 py-2 rounded-lg font-bold text-center" onClick={() => setMenuOpen(false)}>Get Quote</Link>
        </div>
      )}
    </header>
  );
}
