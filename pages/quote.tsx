import Layout from '../components/Layout';
import { useState } from 'react';

const boxTypes = ['Cardboard Boxes','Mailer Boxes','Kraft Boxes','Rigid Boxes','Corrugated Boxes','Display Boxes','Cosmetic Boxes','Food Boxes','Other'];

export default function Quote() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', boxType: '', quantity: '', size: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', company: '', boxType: '', quantity: '', size: '', message: '' }); }
    else setStatus('error');
  };

  return (
    <Layout title="Get a Free Quote — FineCustomBoxes" description="Request a free custom packaging quote. Fast response, no hidden fees.">
      <section className="bg-gray-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black">Get a Free Quote</h1>
          <p className="mt-4 text-gray-400 text-lg">Fill out the form and we'll get back to you within 24 hours</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-10 border border-gray-100">
          {status === 'success' && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6 font-black text-center">
              🎉 Quote request received! We'll contact you within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 font-semibold text-center">
              ❌ Something went wrong. Please try again.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder="Full Name *" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 w-full" />
              <input type="email" placeholder="Email Address *" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 w-full" />
              <input type="text" placeholder="Phone Number" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 w-full" />
              <input type="text" placeholder="Company Name" value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 w-full" />
            </div>
            <select required value={form.boxType} onChange={(e) => setForm({ ...form, boxType: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 w-full text-gray-600">
              <option value="">Select Box Type *</option>
              {boxTypes.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder="Quantity (e.g. 500)" value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 w-full" />
              <input type="text" placeholder='Size (e.g. 10"x8"x4")' value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 w-full" />
            </div>
            <textarea placeholder="Additional Details" rows={4} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 w-full" />
            <button type="submit" disabled={status === 'sending'}
              className="w-full bg-red-600 text-white py-4 rounded-lg font-black text-lg hover:bg-red-700 transition disabled:opacity-50">
              {status === 'sending' ? 'Submitting...' : '🚀 Submit Quote Request'}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
