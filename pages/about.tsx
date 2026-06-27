import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout title="About Us — FineCustomBoxes" description="Learn about FineCustomBoxes — premium custom packaging company serving businesses across the USA.">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">About FineCustomBoxes</h1>
          <p className="mt-4 text-emerald-100 text-lg">Your trusted partner for premium custom packaging in the USA</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              FineCustomBoxes was founded with one mission — to help businesses of all sizes get access to high-quality, affordable custom packaging. We believe your packaging is the first impression your customer has of your brand.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              From small startups to large enterprises, we have helped over 5,000 businesses across the United States create packaging that stands out on shelves and delivers products safely.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With free design support, free shipping, and a 100% satisfaction guarantee, we make custom packaging simple and stress-free.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-10 text-center">
            <div className="text-6xl mb-4">📦</div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              {[
                { num: '5,000+', label: 'Happy Clients' },
                { num: '10+', label: 'Years Experience' },
                { num: '50+', label: 'Box Styles' },
                { num: '100%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{s.num}</div>
                  <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Quality First', desc: 'Every box goes through strict quality control before shipping to you.' },
              { icon: '💚', title: 'Sustainability', desc: 'We use eco-friendly materials and sustainable manufacturing processes.' },
              { icon: '🤝', title: 'Customer Focus', desc: 'Your success is our success. We go above and beyond for every client.' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg">{v.title}</h3>
                <p className="text-gray-500 mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
