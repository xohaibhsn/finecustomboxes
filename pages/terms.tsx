import Layout from '../components/Layout';

export default function Terms() {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing and using FineCustomBoxes website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.' },
    { title: '2. Quote & Ordering', content: 'All quotes are valid for 30 days from the date of issue. Orders are confirmed only upon receipt of payment or approved credit terms. We reserve the right to decline any order.' },
    { title: '3. Artwork & Design', content: 'Free design service is included with all orders. Customer is responsible for approving final artwork before production. Once approved, no changes can be made.' },
    { title: '4. Production & Delivery', content: 'Standard production time is 7–10 business days after artwork approval. Delivery times vary by location. We are not responsible for delays caused by shipping carriers.' },
    { title: '5. Quality Guarantee', content: 'We guarantee 100% satisfaction. If products do not meet the approved specifications, we will reprint at no charge. Claims must be made within 7 days of receiving your order.' },
    { title: '6. Payment', content: 'Payment is required before production begins unless credit terms have been approved. We accept all major credit cards, bank transfers, and PayPal.' },
    { title: '7. Intellectual Property', content: 'Customers retain ownership of their artwork and designs. By submitting artwork, you confirm you have the right to use all elements included.' },
    { title: '8. Limitation of Liability', content: 'FineCustomBoxes liability is limited to the value of the order in question. We are not liable for indirect, incidental, or consequential damages.' },
    { title: '9. Changes to Terms', content: 'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.' },
    { title: '10. Contact', content: 'For questions about these Terms, contact us at info@finecustomboxes.com or call +1 (555) 000-0000.' },
  ];

  return (
    <Layout title="Terms & Conditions — FineCustomBoxes" description="Terms and conditions for FineCustomBoxes custom packaging services.">
      <section style={{ background: '#111827', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 900, color: 'white', margin: '0 0 12px 0' }}>Terms & Conditions</h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', margin: 0 }}>Last updated: June 2026</p>
        </div>
      </section>
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {sections.map(s => (
              <div key={s.title} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#111827', margin: '0 0 12px 0' }}>{s.title}</h2>
                <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
