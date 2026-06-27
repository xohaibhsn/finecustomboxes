import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-white font-bold text-lg">FineCustomBoxes</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Premium custom packaging solutions for businesses across the USA. Quality you can trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-emerald-400 transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-emerald-400 transition">Products</Link></li>
            <li><Link href="/quote" className="hover:text-emerald-400 transition">Get a Quote</Link></li>
            <li><Link href="/blog" className="hover:text-emerald-400 transition">Blog</Link></li>
            <li><Link href="/about" className="hover:text-emerald-400 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Products</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products/cardboard-boxes" className="hover:text-emerald-400 transition">Cardboard Boxes</Link></li>
            <li><Link href="/products/mailer-boxes" className="hover:text-emerald-400 transition">Mailer Boxes</Link></li>
            <li><Link href="/products/kraft-boxes" className="hover:text-emerald-400 transition">Kraft Boxes</Link></li>
            <li><Link href="/products/rigid-boxes" className="hover:text-emerald-400 transition">Rigid Boxes</Link></li>
            <li><Link href="/products/corrugated-boxes" className="hover:text-emerald-400 transition">Corrugated Boxes</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span>📧</span>
              <span>info@finecustomboxes.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <span>+1 (555) 000-0000</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📍</span>
              <span>United States</span>
            </li>
          </ul>
          <a
            href="https://wa.me/15550000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
            <span>💬</span> WhatsApp Us
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FineCustomBoxes. All rights reserved.
      </div>
    </footer>
  );
}
