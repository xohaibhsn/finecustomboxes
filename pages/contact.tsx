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

  return (
    <Layout title="Contact Us — FineCustomBoxes" description="Get in touch with FineCustomBoxes for custom packaging inquiries.">

      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Contact Us</h1>
          <p style={{ fontSize: '17px', color: '#ffffff', margin: 0 }}>We'd love to hear from you!</p>
        </div>
      </section>

      <section style={{ background: 'white' }} className="page-section">
        <div className="page-container">
          <div className="grid-2-wide">
            <div>
              <h2 className="section-title">Get In Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px' }}>
                {[
                  { icon: '📞', label: 'Phone', val: settings.phone || '+1 (555) 000-0000', href: `tel:${settings.phone}` },
                  { icon: '📧', label: 'Email', val: settings.email || 'info@finecustomboxes.com', href: `mailto:${settings.email}` },
                  { icon: '📍', label: 'Location', val: settings.address || 'United States', href: null },
                  { icon: '🕐', label: 'Hours', val: 'Mon–Fri, 9am–6pm EST', href: null },
                ].map(i => (
                  <div key={i.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#facc15', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{i.icon}</div>
                    <div>
                      <div style={{ fontWeight: 900, color: '#111827', fontSize: '13px', marginBottom: '2px' }}>{i.label}</div>
                      {i.href ? <a href={i.href} style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>{i.val}</a> : <div style={{ color: '#6b7280', fontSize: '14px' }}>{i.val}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <a href={`https://wa.me/${settings.whatsapp || '15550000000'}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#16a34a', color: 'white', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
                💬 Chat on WhatsApp
              </a>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: '18px', padding: '32px', border: '1px solid #f3f4f6' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#111827', margin: '0 0 20px 0' }}>Send a Message</h2>
              {status === 'success' && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontWeight: 600, fontSize: '14px' }}>✅ Message sent! We'll get back to you soon.</div>}
              {status === 'error' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', fontWeight: 600, fontSize: '14px' }}>❌ Something went wrong. Please try again.</div>}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Your Name *" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" />
                <input type="email" placeholder="Email Address *" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" />
                <input type="text" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field" />
                <textarea placeholder="Your Message *" rows={5} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="input-field" style={{ resize: 'vertical' }} />
                <button type="submit" disabled={status === 'sending'} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>
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
