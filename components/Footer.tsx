import Link from 'next/link';
import { useSettings } from '../hooks/useSettings';

export default function Footer() {
  const { settings } = useSettings();
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust Strip */}
      <div className="bg-yellow-400 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 text-black text-sm font-black">
          {['✅ 100% Satisfaction Guarantee', '🎨 Free Design Service', '🚚 Free USA Shipping', '📦 No Die Charges', '⚡ Fast Turnaround'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-sm">F</span>
            </div>
            <span className="text-white font-black text-lg">FineCustomBoxes</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Premium custom packaging solutions for businesses across the USA. Quality you can trust, prices you'll love.
          </p>
          <div className="space-y-2 text-sm">
            <div><a href={`tel:${settings.phone}`} className="hover:text-yellow-400 transition">📞 {settings.phone}</a></div>
            <div><a href={`mailto:${settings.email}`} className="hover:text-yellow-400 transition">📧 {settings.email}</a></div>
            <div><span>📍 {settings.address}</span></div>
          </div>
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-black hover:bg-green-600 transition">
            💬 WhatsApp Us
          </a>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-white font-black mb-4 uppercase text-xs tracking-wider">Our Products</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: 'Cardboard Boxes', slug: 'cardboard-boxes' },
              { name: 'Mailer Boxes', slug: 'mailer-boxes' },
              { name: 'Kraft Boxes', slug: 'kraft-boxes' },
              { name: 'Rigid Boxes', slug: 'rigid-boxes' },
              { name: 'Corrugated Boxes', slug: 'corrugated-boxes' },
              { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes' },
              { name: 'Food Boxes', slug: 'food-boxes' },
              { name: 'Display Boxes', slug: 'display-boxes' },
            ].map((p) => (
              <li key={p.slug}><Link href={`/products/${p.slug}`} className="hover:text-yellow-400 transition">{p.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-black mb-4 uppercase text-xs tracking-wider">Company</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about' },
              { name: 'All Products', href: '/products' },
              { name: 'Blog', href: '/blog' },
              { name: 'Contact Us', href: '/contact' },
              { name: 'Get a Quote', href: '/quote' },
              { name: 'Privacy Policy', href: '/privacy-policy' },
              { name: 'Terms & Conditions', href: '/terms' },
            ].map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-yellow-400 transition">{l.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Why Us */}
        <div>
          <h3 className="text-white font-black mb-4 uppercase text-xs tracking-wider">Why Choose Us</h3>
          <ul className="space-y-3 text-sm">
            {[
              { icon: '🚚', text: 'Free USA Shipping' },
              { icon: '🎨', text: 'Free Design Service' },
              { icon: '📦', text: '50 Box Minimum' },
              { icon: '⚡', text: '7-Day Production' },
              { icon: '✅', text: '100% Satisfaction' },
              { icon: '🌿', text: 'Eco-Friendly Options' },
            ].map((i) => (
              <li key={i.text} className="flex items-center gap-2 hover:text-yellow-400 transition">
                <span>{i.icon}</span><span>{i.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} FineCustomBoxes. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-yellow-400 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-400 transition">Terms & Conditions</Link>
            <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
