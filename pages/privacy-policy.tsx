import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy — FineCustomBoxes" description="Privacy policy for FineCustomBoxes custom packaging services.">
      <section className="bg-gray-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 text-emerald-100">Last updated: June 2026</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-gray max-w-none">
          {[
            { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as your name, email address, phone number, company name, and packaging requirements when you request a quote or contact us.' },
            { title: '2. How We Use Your Information', content: 'We use the information we collect to process your quote requests, communicate with you about your orders, send you marketing communications (with your consent), and improve our services.' },
            { title: '3. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and serving you.' },
            { title: '4. Data Security', content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
            { title: '5. Cookies', content: 'Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some functionality.' },
            { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@finecustomboxes.com.' },
            { title: '7. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at info@finecustomboxes.com or call +1 (555) 000-0000.' },
          ].map((s) => (
            <div key={s.title} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
