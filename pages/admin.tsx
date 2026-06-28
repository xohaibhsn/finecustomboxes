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
  const [settings, setSettings] = useState<Settings>({
    logo_url: '', hero_image_url: '', about_image_url: '', favicon_url: '',
    hero_title: '', hero_subtitle: '', phone: '', email: '', whatsapp: '', address: ''
  });
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
    await fetch('/api/site-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify(settings),
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const uploadImage = async (file: File, key: string) => {
    setUploadingKey(key);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', authorization: token },
          body: JSON.stringify({ data: reader.result }),
        });
        const data = await res.json();
        if (key === 'blog_image') setBlogImageUrl(data.url);
        else if (key === 'product_image') setProductForm(f => ({ ...f, image: data.url }));
        else setSettings(prev => ({ ...prev, [key]: data.url }));
        setUploadingKey('');
      } catch { setUploadingKey(''); }
    };
  };

  const logout = () => { localStorage.removeItem('fcb-admin-token'); router.push('/admin-login'); };
  const updateQuoteStatus = async (id: number, status: string) => {
    await fetch('/api/admin-quotes', { method: 'PATCH', headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify({ id, status }) });
    fetchAll(token);
  };
  const deleteQuote = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin-quotes?id=${id}`, { method: 'DELETE', headers: { authorization: token } });
    fetchAll(token);
  };
  const saveProduct = async () => {
    if (!productForm.name || !productForm.slug) { alert('Name and slug required!'); return; }
    await fetch('/api/admin-products', { method: 'POST', headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify(productForm) });
    setShowProductForm(false);
    setProductForm({ name: '', slug: '', description: '', image: '' });
    fetchAll(token);
  };
  const deleteProduct = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin-products?id=${id}`, { method: 'DELETE', headers: { authorization: token } });
    fetchAll(token);
  };
  const saveBlogPost = async () => {
    if (!blogForm.title || !blogForm.slug || !blogForm.content) { alert('Title, slug, content required!'); return; }
    const method = editPost ? 'PATCH' : 'POST';
    const body = editPost ? { ...blogForm, id: editPost.id } : blogForm;
    await fetch('/api/admin-blog', { method, headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify(body) });
    setShowBlogForm(false); setEditPost(null);
    setBlogForm({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' });
    fetchAll(token);
  };
  const deletePost = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin-blog?id=${id}`, { method: 'DELETE', headers: { authorization: token } });
    fetchAll(token);
  };
  const startEdit = (post: BlogPost) => {
    setEditPost(post);
    setBlogForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, meta_title: post.meta_title, meta_description: post.meta_description, status: post.status });
    setShowBlogForm(true);
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700', converted: 'bg-green-100 text-green-700', closed: 'bg-gray-100 text-gray-500' };
    return map[s] || 'bg-gray-100 text-gray-500';
  };

  const imageFields = [
    { key: 'logo_url', label: 'Site Logo', desc: 'Navbar & footer logo (PNG/SVG)', aspect: 'w-32 h-12' },
    { key: 'hero_image_url', label: 'Hero Background Image', desc: 'Homepage hero background', aspect: 'w-32 h-20' },
    { key: 'about_image_url', label: 'About Page Image', desc: 'Team or factory photo', aspect: 'w-32 h-20' },
    { key: 'favicon_url', label: 'Favicon', desc: '32×32 or 64×64 PNG', aspect: 'w-12 h-12' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black text-lg">F</div>
          <div>
            <div className="font-black text-white text-sm">FineCustomBoxes</div>
            <div className="text-gray-400 text-xs">Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => { setTab(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${tab === item.key ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <span className="text-base">{item.icon}</span>
              {item.label}
              {item.key === 'quotes' && quotes.length > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{quotes.length}</span>}
              {item.key === 'contacts' && contacts.length > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{contacts.length}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-800">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white transition">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="font-black text-gray-900 text-lg capitalize">
                {navItems.find(n => n.key === tab)?.icon} {navItems.find(n => n.key === tab)?.label}
              </h1>
              <p className="text-gray-400 text-xs">FineCustomBoxes Admin Panel</p>
            </div>
          </div>
          <a href="/" target="_blank" className="text-sm text-gray-500 hover:text-yellow-600 font-semibold flex items-center gap-1 transition">
            🌐 View Site →
          </a>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Quote Requests', value: quotes.length, icon: '💬', color: 'bg-blue-50 border-blue-200', text: 'text-blue-600' },
                  { label: 'Messages', value: contacts.length, icon: '📩', color: 'bg-green-50 border-green-200', text: 'text-green-600' },
                  { label: 'Products', value: products.length, icon: '📦', color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-600' },
                  { label: 'Blog Posts', value: posts.length, icon: '✍️', color: 'bg-purple-50 border-purple-200', text: 'text-purple-600' },
                ].map((s) => (
                  <div key={s.label} className={`bg-white rounded-xl p-6 border ${s.color} shadow-sm`}>
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className={`text-3xl font-black ${s.text}`}>{s.value}</div>
                    <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Quotes */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-black text-gray-900 mb-4">Recent Quote Requests</h2>
                {quotes.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">No quotes yet</div>
                ) : (
                  <div className="space-y-3">
                    {quotes.slice(0, 5).map((q) => (
                      <div key={q.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <div>
                          <div className="font-semibold text-gray-800">{q.name}</div>
                          <div className="text-sm text-gray-500">{q.box_type} {q.quantity && `· ${q.quantity} units`}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusBadge(q.status)}`}>{q.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quotes */}
          {tab === 'quotes' && (
            <div className="space-y-4">
              {quotes.length === 0 ? (
                <div className="bg-white rounded-xl p-20 text-center text-gray-400 shadow-sm">No quote requests yet</div>
              ) : quotes.map((q) => (
                <div key={q.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-black text-gray-900">{q.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusBadge(q.status)}`}>{q.status}</span>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div>📧 {q.email} {q.phone && `· 📞 ${q.phone}`} {q.company && `· 🏢 ${q.company}`}</div>
                        <div>📦 {q.box_type} {q.quantity && `· Qty: ${q.quantity}`} {q.size && `· Size: ${q.size}`}</div>
                        {q.message && <div>💬 {q.message}</div>}
                        <div className="text-gray-400">🕐 {new Date(q.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select value={q.status} onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button onClick={() => deleteQuote(q.id)} className="bg-red-50 text-red-500 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contacts */}
          {tab === 'contacts' && (
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <div className="bg-white rounded-xl p-20 text-center text-gray-400 shadow-sm">No messages yet</div>
              ) : contacts.map((c) => (
                <div key={c.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-black text-gray-900 mb-1">{c.name}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>📧 {c.email} {c.phone && `· 📞 ${c.phone}`}</div>
                    <div>💬 {c.message}</div>
                    <div className="text-gray-400">🕐 {new Date(c.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">{products.length} products total</p>
                <button onClick={() => setShowProductForm(true)}
                  className="bg-gray-900 text-white px-5 py-2 rounded-lg font-black hover:bg-gray-800 transition">
                  + Add Product
                </button>
              </div>
              {showProductForm && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                  <h3 className="font-black text-gray-900 text-lg mb-4">New Product</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Product Name *" value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                      className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                    <input placeholder="Slug *" value={productForm.slug}
                      onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                      className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                    <textarea placeholder="Description" rows={3} value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 md:col-span-2" />
                    <div className="md:col-span-2">
                      <label className="block font-black text-gray-800 mb-2 text-sm">Product Image</label>
                      <input type="file" accept="image/*"
                        onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'product_image')}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                      {uploadingKey === 'product_image' && <p className="text-yellow-600 text-sm mt-2">⏳ Uploading...</p>}
                      {productForm.image && <div className="mt-3 flex items-center gap-3"><img src={productForm.image} className="w-20 h-20 object-cover rounded-lg border" alt="" /><span className="text-green-600 text-sm font-semibold">✅ Uploaded!</span></div>}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={saveProduct} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-black hover:bg-gray-800 transition">Save Product</button>
                    <button onClick={() => { setShowProductForm(false); setProductForm({ name: '', slug: '', description: '', image: '' }); }}
                      className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-black hover:bg-gray-200 transition">Cancel</button>
                  </div>
                </div>
              )}
              {products.length === 0 ? (
                <div className="bg-white rounded-xl p-20 text-center text-gray-400 shadow-sm">No products yet — add your first!</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      {p.image ? <img src={p.image} alt={p.name} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-300 text-sm">No Image</div>}
                      <div className="p-4">
                        <h3 className="font-black text-gray-900">{p.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">{p.description}</p>
                        <button onClick={() => deleteProduct(p.id)} className="mt-3 w-full bg-red-50 text-red-500 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition">Delete</button>
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
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">{posts.length} posts total</p>
                <button onClick={() => { setShowBlogForm(true); setEditPost(null); setBlogForm({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' }); }}
                  className="bg-gray-900 text-white px-5 py-2 rounded-lg font-black hover:bg-gray-800 transition">+ New Post</button>
              </div>
              {showBlogForm && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                  <h3 className="font-black text-gray-900 text-lg mb-4">{editPost ? 'Edit Post' : 'New Blog Post'}</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="Post Title *" value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, slug: editPost ? blogForm.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                        className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                      <input placeholder="Slug *" value={blogForm.slug}
                        onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                        className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                    </div>
                    <textarea placeholder="Excerpt (short description)" rows={2} value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                    <div>
                      <label className="block font-black text-gray-800 mb-2 text-sm">Featured Image</label>
                      <input type="file" accept="image/*"
                        onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'blog_image')}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                      {blogImageUrl && <div className="mt-2 flex items-center gap-3"><img src={blogImageUrl} className="w-20 h-20 object-cover rounded-lg border" alt="" /><span className="text-green-600 text-sm">✅ Uploaded!</span></div>}
                    </div>
                    <textarea placeholder="Content (HTML allowed) *" rows={10} value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 font-mono text-sm" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="SEO Meta Title" value={blogForm.meta_title}
                        onChange={(e) => setBlogForm({ ...blogForm, meta_title: e.target.value })}
                        className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                      <select value={blogForm.status} onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                        className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <textarea placeholder="SEO Meta Description" rows={2} value={blogForm.meta_description}
                      onChange={(e) => setBlogForm({ ...blogForm, meta_description: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                    <div className="flex gap-3">
                      <button onClick={saveBlogPost} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-black hover:bg-gray-800 transition">{editPost ? 'Update Post' : 'Publish Post'}</button>
                      <button onClick={() => { setShowBlogForm(false); setEditPost(null); }} className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-black hover:bg-gray-200 transition">Cancel</button>
                    </div>
                  </div>
                </div>
              )}
              {posts.length === 0 ? (
                <div className="bg-white rounded-xl p-20 text-center text-gray-400 shadow-sm">No posts yet</div>
              ) : (
                <div className="space-y-3">
                  {posts.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <h3 className="font-black text-gray-900">{p.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span>
                          <span className="text-gray-400 text-xs">{new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(p)} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition font-semibold">Edit</button>
                        <button onClick={() => deletePost(p.id)} className="bg-red-50 text-red-500 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition font-semibold">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {tab === 'settings' && (
            <div className="space-y-6">
              {/* Images */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-black text-gray-900 text-lg mb-6 flex items-center gap-2">🖼️ Site Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {imageFields.map((field) => (
                    <div key={field.key} className="border border-gray-100 rounded-xl p-4">
                      <label className="block font-black text-gray-800 mb-1">{field.label}</label>
                      <p className="text-gray-400 text-xs mb-3">{field.desc}</p>
                      {settings[field.key as keyof Settings] && (
                        <div className="mb-3">
                          <img src={settings[field.key as keyof Settings]} alt={field.label}
                            className={`${field.aspect} object-contain rounded-lg border border-gray-200 bg-gray-50`} />
                        </div>
                      )}
                      <input type="file" accept="image/*"
                        onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], field.key)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                      {uploadingKey === field.key && <p className="text-yellow-600 text-xs mt-2">⏳ Uploading to Cloudinary...</p>}
                      {uploadingKey !== field.key && settings[field.key as keyof Settings] && <p className="text-green-600 text-xs mt-2">✅ Image set</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Homepage Content */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-black text-gray-900 text-lg mb-6 flex items-center gap-2">📝 Homepage Content</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-black text-gray-800 mb-1 text-sm">Hero Title</label>
                    <input type="text" value={settings.hero_title}
                      onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  </div>
                  <div>
                    <label className="block font-black text-gray-800 mb-1 text-sm">Hero Subtitle</label>
                    <textarea rows={3} value={settings.hero_subtitle}
                      onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-black text-gray-900 text-lg mb-6 flex items-center gap-2">📞 Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000' },
                    { key: 'email', label: 'Email Address', placeholder: 'info@finecustomboxes.com' },
                    { key: 'whatsapp', label: 'WhatsApp (numbers only)', placeholder: '15550000000' },
                    { key: 'address', label: 'Address', placeholder: 'United States' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block font-black text-gray-800 mb-1 text-sm">{f.label}</label>
                      <input type="text" value={settings[f.key as keyof Settings]} placeholder={f.placeholder}
                        onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button onClick={saveSettings}
                  className={`px-8 py-3 rounded-lg font-black transition text-lg ${settingsSaved ? 'bg-green-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
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
