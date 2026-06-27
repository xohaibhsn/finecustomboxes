import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-emerald-600 font-medium transition">Home</Link>
          <Link href="/products" className="text-gray-600 hover:text-emerald-600 font-medium transition">Products</Link>
          <Link href="/about" className="text-gray-600 hover:text-emerald-600 font-medium transition">About</Link>
          <Link href="/blog" className="text-gray-600 hover:text-emerald-600 font-medium transition">Blog</Link>
          <Link href="/contact" className="text-gray-600 hover:text-emerald-600 font-medium transition">Contact</Link>
          <Link href="/quote" className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/about" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/blog" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/contact" className="text-gray-600 hover:text-emerald-600 font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/quote" className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold text-center" onClick={() => setMenuOpen(false)}>Get a Quote</Link>
        </div>
      )}
    </nav>
  );
}
