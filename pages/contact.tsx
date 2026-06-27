import Layout from '../components/Layout';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <Layout title="Contact Us — FineCustomBoxes" description="Get in touch with FineCustomBoxes for custom packaging inquiries.">
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-emerald-100 text-lg">We'd love to hear from you. Send us a message!</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <div className="space-y-4">
              {[
                { icon: '📧', label: 'Email', val: 'info@finecustomboxes.com' },
                { icon: '📞', label: 'Phone', val: '+1 (555) 000-0000' },
                { icon: '📍', label: 'Location', val: 'United States' },
                { icon: '🕐', label: 'Hours', val: 'Mon–Fri, 9am–6pm EST' },
              ].map((i) => (
                <div key={i.label} className="flex items-start gap-4">
                  <span className="text-2xl">{i.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-700">{i.label}</div>
                    <div className="text-gray-500">{i.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/15550000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            {status === 'success' && (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg mb-4 font-medium">
                ✅ Message sent! We'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 font-medium">
                ❌ Something went wrong. Please try again.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text" placeholder="Your Name" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="email" placeholder="Email Address" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text" placeholder="Phone Number"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
              <textarea
                placeholder="Your Message" rows={4} required
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit" disabled={status === 'sending'}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
