import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Quote { id: number; name: string; email: string; phone: string; company: string; box_type: string; quantity: string; size: string; message: string; status: string; created_at: string; }
interface Contact { id: number; name: string; email: string; phone: string; message: string; created_at: string; }
interface BlogPost { id: number; title: string; slug: string; excerpt: string; content: string; meta_title: string; meta_description: string; status: string; created_at: string; }
interface Product { id: number; name: string; slug: string; description: string; image: string; created_at: string; }
interface Settings { logo_url: string; hero_image_url: string; about_image_url: string; favicon_url: string; hero_title: string; hero_subtitle: string; phone: string; email: string; whatsapp: string; address: string; }

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'quotes', label: 'Quote Requests', icon: '💬' },
  { key: 'contacts', label: 'Messages', icon: '📩' },
  { key: 'products', label: 'Products', icon: '📦' },
  { key: 'blog', label: 'Blog Posts', icon: '✍️' },
  { key: 'settings', label: 'Site Settings', icon: '⚙️' },
];

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<Settings>({ logo_url: '', hero_image_url: '', about_image_url: '', favicon_url: '', hero_title: '', hero_subtitle: '', phone: '', email: '', whatsapp: '', address: '' });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [uploadingKey, setUploadingKey] = useState('');
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' });
  const [blogImageUrl, setBlogImageUrl] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', slug: '', description: '', image: '' });

  useEffect(() => {
    const t = localStorage.getItem('fcb-admin-token');
    if (!t) { router.push('/admin-login'); return; }
    setToken(t);
    fetchAll(t);
    fetchSettings();
  }, []);

  const fetchAll = async (t: string) => {
    const [q, c, b, p] = await Promise.all([
      fetch('/api/admin-quotes', { headers: { authorization: t } }).then(r => r.json()),
      fetch('/api/admin-contacts', { headers: { authorization: t } }).then(r => r.json()),
      fetch('/api/admin-blog', { headers: { authorization: t } }).then(r => r.json()),
      fetch('/api/admin-products', { headers: { authorization: t } }).then(r => r.json()),
    ]);
    setQuotes(Array.isArray(q) ? q : []);
    setContacts(Array.isArray(c) ? c : []);
    setPosts(Array.isArray(b) ? b : []);
    setProducts(Array.isArray(p) ? p : []);
  };

  const fetchSettings = async () => {
    const res = await fetch('/api/site-settings');
    const data = await res.json();
    setSettings(prev => ({ ...prev, ...data }));
  };

  const saveSettings = async () => {
    await fetch('/api/site-settings', { method: 'POST', headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify(settings) });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const uploadImage = async (file: File, key: string) => {
    setUploadingKey(key);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify({ data: reader.result }) });
        const data = await res.json();
        if (key === 'blog_image') setBlogImageUrl(data.url);
        else if (key === 'product_image') setProductForm(f => ({ ...f, image: data.url }));
        else setSettings(prev => ({ ...prev, [key]: data.url }));
        setUploadingKey('');
      } catch { setUploadingKey(''); }
    };
  };

  const logout = () => { localStorage.removeItem('fcb-admin-token'); router.push('/admin-login'); };
  const updateQuoteStatus = async (id: number, status: string) => { await fetch('/api/admin-quotes', { method: 'PATCH', headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify({ id, status }) }); fetchAll(token); };
  const deleteQuote = async (id: number) => { if (!confirm('Delete?')) return; await fetch(`/api/admin-quotes?id=${id}`, { method: 'DELETE', headers: { authorization: token } }); fetchAll(token); };
  const saveProduct = async () => { if (!productForm.name || !productForm.slug) { alert('Name and slug required!'); return; } await fetch('/api/admin-products', { method: 'POST', headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify(productForm) }); setShowProductForm(false); setProductForm({ name: '', slug: '', description: '', image: '' }); fetchAll(token); };
  const deleteProduct = async (id: number) => { if (!confirm('Delete?')) return; await fetch(`/api/admin-products?id=${id}`, { method: 'DELETE', headers: { authorization: token } }); fetchAll(token); };
  const saveBlogPost = async () => { if (!blogForm.title || !blogForm.slug || !blogForm.content) { alert('Title, slug, content required!'); return; } const method = editPost ? 'PATCH' : 'POST'; const body = editPost ? { ...blogForm, id: editPost.id } : blogForm; await fetch('/api/admin-blog', { method, headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify(body) }); setShowBlogForm(false); setEditPost(null); setBlogForm({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' }); fetchAll(token); };
  const deletePost = async (id: number) => { if (!confirm('Delete?')) return; await fetch(`/api/admin-blog?id=${id}`, { method: 'DELETE', headers: { authorization: token } }); fetchAll(token); };
  const startEdit = (post: BlogPost) => { setEditPost(post); setBlogForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, meta_title: post.meta_title, meta_description: post.meta_description, status: post.status }); setShowBlogForm(true); };

  const statusBadge = (s: string) => ({ new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700', converted: 'bg-green-100 text-green-700', closed: 'bg-gray-100 text-gray-500' }[s] || 'bg-gray-100 text-gray-500');

  const imageFields = [
    { key: 'logo_url', label: 'Site Logo', desc: 'Navbar & footer logo — PNG or SVG recommended', hint: 'Best size: 200×60px' },
    { key: 'hero_image_url', label: 'Hero Background Image', desc: 'Homepage hero section background', hint: 'Best size: 1920×1080px' },
    { key: 'about_image_url', label: 'About Page Image', desc: 'Team photo or factory image', hint: 'Best size: 800×600px' },
    { key: 'favicon_url', label: 'Favicon', desc: 'Browser tab icon', hint: 'Best size: 64×64px PNG' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px', background: '#111827', color: 'white', display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: sidebarOpen ? 0 : '-260px', height: '100vh', zIndex: 50,
        transition: 'left 0.3s ease', boxShadow: '4px 0 20px rgba(0,0,0,0.15)'
      }}
        className="lg:!left-0 lg:!static lg:!h-auto"
      >
        {/* Brand */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: '#facc15', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: '#111827', flexShrink: 0 }}>F</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '14px', color: 'white' }}>FineCustomBoxes</div>
            <div style={{ fontSize: '11px', color: '#ffffff', marginTop: '2px' }}>Admin Dashboard</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => (
            <button key={item.key} onClick={() => { setTab(item.key); setSidebarOpen(false); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                background: tab === item.key ? '#facc15' : 'transparent',
                color: tab === item.key ? '#111827' : '#ffffff',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (tab !== item.key) { (e.currentTarget as HTMLButtonElement).style.background = '#1f2937'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; } }}
              onMouseLeave={e => { if (tab !== item.key) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#ffffff'; } }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.key === 'quotes' && quotes.length > 0 && <span style={{ background: '#ef4444', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '20px', fontWeight: 700 }}>{quotes.length}</span>}
              {item.key === 'contacts' && contacts.length > 0 && <span style={{ background: '#ef4444', color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '20px', fontWeight: 700 }}>{contacts.length}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px', borderTop: '1px solid #1f2937' }}>
          <button onClick={logout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, background: 'transparent', color: '#ffffff' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1f2937'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#ffffff'; }}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '0', minWidth: 0 }} className="lg:!ml-0">
        {/* Top Header */}
        <header style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setSidebarOpen(true)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }} className="lg:!hidden mobile-menu-btn">
              <svg width="20" height="20" fill="none" stroke="#374151" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
              <h1 style={{ fontWeight: 900, fontSize: '18px', color: '#111827', margin: 0 }}>
                {navItems.find(n => n.key === tab)?.icon} {navItems.find(n => n.key === tab)?.label}
              </h1>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>FineCustomBoxes Admin</p>
            </div>
          </div>
          <a href="/" target="_blank" style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: '1.5px solid #e5e7eb', borderRadius: '8px', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#facc15'; (e.currentTarget as HTMLAnchorElement).style.color = '#111827'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLAnchorElement).style.color = '#6b7280'; }}
          >
            🌐 View Site →
          </a>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {[
                  { label: 'Quote Requests', value: quotes.length, icon: '💬', color: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
                  { label: 'Messages', value: contacts.length, icon: '📩', color: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
                  { label: 'Products', value: products.length, icon: '📦', color: '#fefce8', border: '#fde68a', text: '#b45309' },
                  { label: 'Blog Posts', value: posts.length, icon: '✍️', color: '#faf5ff', border: '#e9d5ff', text: '#7c3aed' },
                ].map((s) => (
                  <div key={s.label} style={{ background: s.color, border: `1px solid ${s.border}`, borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontSize: '36px', fontWeight: 900, color: s.text }}>{s.value}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontWeight: 900, fontSize: '16px', color: '#111827', marginBottom: '20px' }}>Recent Quote Requests</h2>
                {quotes.length === 0 ? <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No quotes yet</div> : (
                  <div>
                    {quotes.slice(0, 5).map((q) => (
                      <div key={q.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div>
                          <div style={{ fontWeight: 700, color: '#111827', fontSize: '14px' }}>{q.name}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{q.box_type} {q.quantity && `· ${q.quantity} units`} · {q.email}</div>
                        </div>
                        <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', fontWeight: 700 }} className={statusBadge(q.status)}>{q.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quotes */}
          {tab === 'quotes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {quotes.length === 0 ? <div style={{ background: 'white', borderRadius: '16px', padding: '80px', textAlign: 'center', color: '#9ca3af' }}>No quote requests yet</div> : quotes.map((q) => (
                <div key={q.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        <span style={{ fontWeight: 900, fontSize: '16px', color: '#111827' }}>{q.name}</span>
                        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }} className={statusBadge(q.status)}>{q.status}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.8' }}>
                        <div>📧 {q.email} {q.phone && `· 📞 ${q.phone}`} {q.company && `· 🏢 ${q.company}`}</div>
                        <div>📦 {q.box_type} {q.quantity && `· Qty: ${q.quantity}`} {q.size && `· Size: ${q.size}`}</div>
                        {q.message && <div>💬 {q.message}</div>}
                        <div style={{ color: '#d1d5db', fontSize: '12px' }}>🕐 {new Date(q.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <select value={q.status} onChange={(e) => updateQuoteStatus(q.id, e.target.value)} style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', outline: 'none', cursor: 'pointer' }}>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button onClick={() => deleteQuote(q.id)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contacts */}
          {tab === 'contacts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contacts.length === 0 ? <div style={{ background: 'white', borderRadius: '16px', padding: '80px', textAlign: 'center', color: '#9ca3af' }}>No messages yet</div> : contacts.map((c) => (
                <div key={c.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontWeight: 900, fontSize: '16px', color: '#111827', marginBottom: '10px' }}>{c.name}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.8' }}>
                    <div>📧 {c.email} {c.phone && `· 📞 ${c.phone}`}</div>
                    <div>💬 {c.message}</div>
                    <div style={{ color: '#d1d5db', fontSize: '12px' }}>🕐 {new Date(c.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {tab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>{products.length} products total</p>
                <button onClick={() => setShowProductForm(true)} style={{ background: '#111827', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}>+ Add Product</button>
              </div>
              {showProductForm && (
                <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontWeight: 900, fontSize: '16px', marginBottom: '20px' }}>New Product</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input placeholder="Product Name *" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="input-field" />
                    <input placeholder="Slug *" value={productForm.slug} onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })} className="input-field" />
                    <textarea placeholder="Description" rows={3} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="input-field" style={{ gridColumn: '1 / -1', resize: 'vertical' }} />
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: '#374151' }}>Product Image</label>
                      <div className="upload-box" onClick={() => document.getElementById('product-upload')?.click()}>
                        {productForm.image ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                            <img src={productForm.image} alt="Product preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', border: '1.5px solid #e5e7eb' }} />
                            <div><div style={{ color: '#16a34a', fontWeight: 700, fontSize: '14px' }}>✅ Image Uploaded!</div><div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>Click to change</div></div>
                          </div>
                        ) : uploadingKey === 'product_image' ? (
                          <div style={{ color: '#d97706', fontWeight: 600 }}>⏳ Uploading...</div>
                        ) : (
                          <div><div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div><div style={{ fontWeight: 600, color: '#6b7280' }}>Click to upload image</div><div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>PNG, JPG, WEBP supported</div></div>
                        )}
                      </div>
                      <input id="product-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'product_image')} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <button onClick={saveProduct} style={{ background: '#111827', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Save Product</button>
                    <button onClick={() => { setShowProductForm(false); setProductForm({ name: '', slug: '', description: '', image: '' }); }} style={{ background: '#f3f4f6', color: '#6b7280', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
              )}
              {products.length === 0 ? (
                <div style={{ background: 'white', borderRadius: '16px', padding: '80px', textAlign: 'center', color: '#9ca3af' }}>No products yet</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {products.map((p) => (
                    <div key={p.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                      {p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '200px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', fontSize: '14px' }}>No Image</div>}
                      <div style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 900, color: '#111827' }}>{p.name}</div>
                        <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>{p.description}</div>
                        <button onClick={() => deleteProduct(p.id)} style={{ marginTop: '12px', width: '100%', background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Blog */}
          {tab === 'blog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>{posts.length} posts total</p>
                <button onClick={() => { setShowBlogForm(true); setEditPost(null); setBlogForm({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' }); }} style={{ background: '#111827', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}>+ New Post</button>
              </div>
              {showBlogForm && (
                <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
                  <h3 style={{ fontWeight: 900, fontSize: '16px', marginBottom: '20px' }}>{editPost ? 'Edit Post' : 'New Blog Post'}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <input placeholder="Post Title *" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, slug: editPost ? blogForm.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="input-field" />
                      <input placeholder="Slug *" value={blogForm.slug} onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })} className="input-field" />
                    </div>
                    <textarea placeholder="Excerpt" rows={2} value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} className="input-field" style={{ resize: 'vertical' }} />
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: '#374151' }}>Featured Image</label>
                      <div className="upload-box" onClick={() => document.getElementById('blog-upload')?.click()}>
                        {blogImageUrl ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                            <img src={blogImageUrl} alt="Blog preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
                            <div><div style={{ color: '#16a34a', fontWeight: 700 }}>✅ Image Uploaded!</div><div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>Click to change</div></div>
                          </div>
                        ) : uploadingKey === 'blog_image' ? (
                          <div style={{ color: '#d97706', fontWeight: 600 }}>⏳ Uploading...</div>
                        ) : (
                          <div><div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div><div style={{ fontWeight: 600, color: '#6b7280' }}>Click to upload featured image</div></div>
                        )}
                      </div>
                      <input id="blog-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'blog_image')} />
                    </div>
                    <textarea placeholder="Content (HTML allowed) *" rows={12} value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} className="input-field" style={{ fontFamily: 'monospace', fontSize: '13px', resize: 'vertical' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <input placeholder="SEO Meta Title" value={blogForm.meta_title} onChange={(e) => setBlogForm({ ...blogForm, meta_title: e.target.value })} className="input-field" />
                      <select value={blogForm.status} onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })} className="input-field">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <textarea placeholder="SEO Meta Description" rows={2} value={blogForm.meta_description} onChange={(e) => setBlogForm({ ...blogForm, meta_description: e.target.value })} className="input-field" style={{ resize: 'vertical' }} />
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={saveBlogPost} style={{ background: '#111827', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>{editPost ? 'Update Post' : 'Publish Post'}</button>
                      <button onClick={() => { setShowBlogForm(false); setEditPost(null); }} style={{ background: '#f3f4f6', color: '#6b7280', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
              {posts.length === 0 ? <div style={{ background: 'white', borderRadius: '16px', padding: '80px', textAlign: 'center', color: '#9ca3af' }}>No posts yet</div> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {posts.map((p) => (
                    <div key={p.id} style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 900, color: '#111827', fontSize: '15px' }}>{p.title}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                          <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }} className={p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>{p.status}</span>
                          <span style={{ fontSize: '12px', color: '#d1d5db' }}>{new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => startEdit(p)} style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                        <button onClick={() => deletePost(p.id)} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {tab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Images */}
              <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="section-title">🖼️ Site Images</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {imageFields.map((field) => (
                    <div key={field.key} style={{ border: '1px solid #f3f4f6', borderRadius: '12px', padding: '20px', background: '#fafafa' }}>
                      <div style={{ fontWeight: 800, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>{field.label}</div>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>{field.desc}</div>
                      <div style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '16px' }}>{field.hint}</div>

                      {settings[field.key as keyof Settings] ? (
                        <div style={{ marginBottom: '16px', padding: '12px', background: 'white', borderRadius: '10px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={settings[field.key as keyof Settings]} alt={field.label} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '8px', background: '#f9fafb' }} />
                          <div>
                            <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '13px' }}>✅ Image uploaded</div>
                            <div style={{ color: '#9ca3af', fontSize: '11px', marginTop: '2px' }}>Click below to replace</div>
                          </div>
                        </div>
                      ) : null}

                      <div className="upload-box" onClick={() => document.getElementById(`upload-${field.key}`)?.click()}>
                        {uploadingKey === field.key ? (
                          <div style={{ color: '#d97706', fontWeight: 700, fontSize: '14px' }}>⏳ Uploading to Cloudinary...</div>
                        ) : (
                          <div>
                            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📁</div>
                            <div style={{ fontWeight: 700, color: '#374151', fontSize: '14px' }}>{settings[field.key as keyof Settings] ? 'Click to replace' : 'Click to upload'}</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>PNG, JPG, SVG, WEBP</div>
                          </div>
                        )}
                      </div>
                      <input id={`upload-${field.key}`} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], field.key)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Homepage Content */}
              <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="section-title">📝 Homepage Content</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '8px' }}>Hero Title</label>
                    <input type="text" value={settings.hero_title} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} className="input-field" placeholder="Custom Packaging Your Customers Will Love" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '8px' }}>Hero Subtitle</label>
                    <textarea rows={3} value={settings.hero_subtitle} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} className="input-field" style={{ resize: 'vertical' }} />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div className="section-title">📞 Contact Information</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  {[
                    { key: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000', icon: '📞' },
                    { key: 'email', label: 'Email Address', placeholder: 'info@finecustomboxes.com', icon: '📧' },
                    { key: 'whatsapp', label: 'WhatsApp (numbers only)', placeholder: '15550000000', icon: '💬' },
                    { key: 'address', label: 'Address / Location', placeholder: 'United States', icon: '📍' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '8px' }}>{f.icon} {f.label}</label>
                      <input type="text" value={settings[f.key as keyof Settings]} placeholder={f.placeholder} onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })} className="input-field" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Save */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={saveSettings} style={{ background: settingsSaved ? '#16a34a' : '#111827', color: 'white', border: 'none', padding: '14px 40px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', fontSize: '16px', transition: 'background 0.2s', minWidth: '200px' }}>
                  {settingsSaved ? '✅ Saved Successfully!' : 'Save All Settings'}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
