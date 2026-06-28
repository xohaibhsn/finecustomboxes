import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as your name, email address, phone number, company name, and packaging requirements when you request a quote or contact us.' },
    { title: '2. How We Use Your Information', content: 'We use the information we collect to process your quote requests, communicate with you about your orders, send you marketing communications (with your consent), and improve our services.' },
    { title: '3. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and serving you.' },
    { title: '4. Data Security', content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
    { title: '5. Cookies', content: 'Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some functionality.' },
    { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@finecustomboxes.com.' },
    { title: '7. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at info@finecustomboxes.com or call +1 (555) 000-0000.' },
  ];

  return (
    <Layout title="Privacy Policy — FineCustomBoxes" description="Privacy policy for FineCustomBoxes.">
      <section style={{ background: '#111827' }} className="page-section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Privacy Policy</h1>
          <p style={{ color: '#9ca3af', fontSize: '15px', margin: 0 }}>Last updated: June 2026</p>
        </div>
      </section>
      <section style={{ background: 'white' }} className="page-section">
        <div className="narrow-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {sections.map(s => (
              <div key={s.title} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#111827', margin: '0 0 10px 0' }}>{s.title}</h2>
                <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
