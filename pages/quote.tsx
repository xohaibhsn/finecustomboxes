import Layout from '../components/Layout';
import { useState } from 'react';

const boxTypes = ['Cardboard Boxes', 'Mailer Boxes', 'Kraft Boxes', 'Rigid Boxes', 'Corrugated Boxes', 'Display Boxes', 'Cosmetic Boxes', 'Food Boxes', 'Other'];

export default function Quote() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', boxType: '', quantity: '', size: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', company: '', boxType: '', quantity: '', size: '', message: '' }); }
    else setStatus('error');
  };

  return (
    <Layout title="Get a Free Quote — FineCustomBoxes" description="Request a free custom packaging quote. Fast response, no hidden fees.">

      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Get a Free Quote</h1>
          <p style={{ fontSize: '17px', color: '#ffffff', margin: 0 }}>Fill out the form and we'll get back to you within 24 hours</p>
        </div>
      </section>

      <section style={{ background: '#f9fafb' }} className="page-section">
        <div className="narrow-container">
          <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
            {status === 'success' && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '14px', borderRadius: '10px', marginBottom: '20px', fontWeight: 700, fontSize: '14px', textAlign: 'center' }}>🎉 Quote request received! We'll contact you within 24 hours.</div>}
            {status === 'error' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '14px', borderRadius: '10px', marginBottom: '20px', fontWeight: 700, fontSize: '14px', textAlign: 'center' }}>❌ Something went wrong. Please try again.</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid-2">
                <input type="text" placeholder="Full Name *" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" />
                <input type="email" placeholder="Email Address *" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" />
                <input type="text" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field" />
                <input type="text" placeholder="Company Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="input-field" />
              </div>
              <select required value={form.boxType} onChange={e => setForm({ ...form, boxType: e.target.value })} className="input-field" style={{ color: form.boxType ? '#111827' : '#9ca3af' }}>
                <option value="">Select Box Type *</option>
                {boxTypes.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <div className="grid-2">
                <input type="text" placeholder="Quantity (e.g. 500)" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="input-field" />
                <input type="text" placeholder='Size (e.g. 10"x8"x4")' value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} className="input-field" />
              </div>
              <textarea placeholder="Additional Details" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="input-field" style={{ resize: 'vertical' }} />
              <button type="submit" disabled={status === 'sending'} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>
                {status === 'sending' ? 'Submitting...' : '🚀 Submit Quote Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

    </Layout>
  );
}
