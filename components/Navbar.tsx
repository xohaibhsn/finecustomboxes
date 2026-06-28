import Link from 'next/link';
import { useState } from 'react';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-bold text-gray-800">
            Fine<span className="text-emerald-600">Custom</span>Boxes
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-emerald-600 font-medium transition">Home</Link>

          {/* Mega Menu Trigger */}
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className="text-gray-600 hover:text-emerald-600 font-medium transition flex items-center gap-1">
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega Dropdown */}
            {megaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">By Industry</h3>
                  <ul className="space-y-2">
                    {industryLinks.map((l) => (
                      <li key={l.slug}>
                        <Link href={`/products/${l.slug}`} className="text-gray-600 hover:text-emerald-600 text-sm transition">
                          {l.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">By Material</h3>
                  <ul className="space-y-2">
                    {materialLinks.map((l) => (
                      <li key={l.slug}>
                        <Link href={`/products/${l.slug}`} className="text-gray-600 hover:text-emerald-600 text-sm transition">
                          {l.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">By Style</h3>
                  <ul className="space-y-2">
                    {styleLinks.map((l) => (
                      <li key={l.slug}>
                        <Link href={`/products/${l.slug}`} className="text-gray-600 hover:text-emerald-600 text-sm transition">
                          {l.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/products" className="mt-4 inline-block text-emerald-600 text-sm font-semibold hover:underline">
                    View All →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="text-gray-600 hover:text-emerald-600 font-medium transition">About</Link>
          <Link href="/blog" className="text-gray-600 hover:text-emerald-600 font-medium transition">Blog</Link>
          <Link href="/contact" className="text-gray-600 hover:text-emerald-600 font-medium transition">Contact</Link>
          <Link href="/quote" className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
          <Link href="/" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>

          <button onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            className="text-gray-600 font-medium text-left flex items-center justify-between">
            Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {mobileProductsOpen && (
            <div className="pl-4 space-y-2 border-l-2 border-emerald-200">
              <p className="text-xs font-bold text-gray-400 uppercase">By Industry</p>
              {industryLinks.map((l) => (
                <Link key={l.slug} href={`/products/${l.slug}`} className="block text-gray-600 text-sm hover:text-emerald-600" onClick={() => setMenuOpen(false)}>{l.name}</Link>
              ))}
              <p className="text-xs font-bold text-gray-400 uppercase mt-2">By Material</p>
              {materialLinks.map((l) => (
                <Link key={l.slug} href={`/products/${l.slug}`} className="block text-gray-600 text-sm hover:text-emerald-600" onClick={() => setMenuOpen(false)}>{l.name}</Link>
              ))}
              <Link href="/products" className="block text-emerald-600 text-sm font-semibold" onClick={() => setMenuOpen(false)}>View All Products →</Link>
            </div>
          )}

          <Link href="/about" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/blog" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/contact" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/quote" className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold text-center" onClick={() => setMenuOpen(false)}>Get a Quote</Link>
        </div>
      )}
    </nav>
  );
}
