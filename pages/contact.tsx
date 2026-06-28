import Layout from '../components/Layout';
import { useState } from 'react';
import { useSettings } from '../hooks/useSettings';

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' }); }
    else setStatus('error');
  };

  const inputStyle = { width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' };

  return (
    <Layout title="Contact Us — FineCustomBoxes" description="Get in touch with FineCustomBoxes for custom packaging inquiries.">
      {/* Hero */}
      <section style={{ background: '#111827', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 900, color: 'white', margin: '0 0 16px 0' }}>Contact Us</h1>
          <p style={{ fontSize: '18px', color: '#9ca3af', margin: 0 }}>We'd love to hear from you. Send us a message!</p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
            {/* Info */}
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', margin: '0 0 32px 0' }}>Get In Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                {[
                  { icon: '📞', label: 'Phone', val: settings.phone || '+1 (555) 000-0000', href: `tel:${settings.phone}` },
                  { icon: '📧', label: 'Email', val: settings.email || 'info@finecustomboxes.com', href: `mailto:${settings.email}` },
                  { icon: '📍', label: 'Location', val: settings.address || 'United States', href: null },
                  { icon: '🕐', label: 'Hours', val: 'Mon–Fri, 9am–6pm EST', href: null },
                ].map(i => (
                  <div key={i.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#facc15', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{i.icon}</div>
                    <div>
                      <div style={{ fontWeight: 900, color: '#111827', fontSize: '14px', marginBottom: '4px' }}>{i.label}</div>
                      {i.href ? (
                        <a href={i.href} style={{ color: '#6b7280', fontSize: '15px', textDecoration: 'none' }}>{i.val}</a>
                      ) : (
                        <div style={{ color: '#6b7280', fontSize: '15px' }}>{i.val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <a href={`https://wa.me/${settings.whatsapp || '15550000000'}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#16a34a', color: 'white', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
                💬 Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div style={{ background: '#f9fafb', borderRadius: '20px', padding: '40px', border: '1px solid #f3f4f6' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#111827', margin: '0 0 24px 0' }}>Send a Message</h2>
              {status === 'success' && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '14px 16px', borderRadius: '10px', marginBottom: '20px', fontWeight: 600, fontSize: '14px' }}>✅ Message sent! We'll get back to you soon.</div>}
              {status === 'error' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '14px 16px', borderRadius: '10px', marginBottom: '20px', fontWeight: 600, fontSize: '14px' }}>❌ Something went wrong. Please try again.</div>}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" placeholder="Your Name *" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Email Address *" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                <textarea placeholder="Your Message *" rows={5} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                <button type="submit" disabled={status === 'sending'} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
