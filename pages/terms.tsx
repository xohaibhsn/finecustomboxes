import Layout from '../components/Layout';

export default function Terms() {
  return (
    <Layout title="Terms & Conditions — FineCustomBoxes" description="Terms and conditions for FineCustomBoxes custom packaging services.">
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
          <p className="mt-3 text-emerald-100">Last updated: June 2026</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing and using FineCustomBoxes website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.' },
            { title: '2. Quote & Ordering', content: 'All quotes are valid for 30 days from the date of issue. Orders are confirmed only upon receipt of payment or approved credit terms. We reserve the right to decline any order.' },
            { title: '3. Artwork & Design', content: 'Free design service is included with all orders. Customer is responsible for approving final artwork before production. Once approved, no changes can be made. FineCustomBoxes is not liable for errors in approved artwork.' },
            { title: '4. Production & Delivery', content: 'Standard production time is 7–10 business days after artwork approval. Delivery times vary by location. We are not responsible for delays caused by shipping carriers or circumstances beyond our control.' },
            { title: '5. Quality Guarantee', content: 'We guarantee 100% satisfaction. If products do not meet the approved specifications, we will reprint at no charge. Claims must be made within 7 days of receiving your order.' },
            { title: '6. Payment', content: 'Payment is required before production begins unless credit terms have been approved. We accept all major credit cards, bank transfers, and PayPal.' },
            { title: '7. Intellectual Property', content: 'Customers retain ownership of their artwork and designs. By submitting artwork, you confirm you have the right to use all elements included.' },
            { title: '8. Limitation of Liability', content: 'FineCustomBoxes liability is limited to the value of the order in question. We are not liable for indirect, incidental, or consequential damages.' },
            { title: '9. Changes to Terms', content: 'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.' },
            { title: '10. Contact', content: 'For questions about these Terms, contact us at info@finecustomboxes.com or call +1 (555) 000-0000.' },
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
