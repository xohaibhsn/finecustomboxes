import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Quote { id: number; name: string; email: string; phone: string; company: string; box_type: string; quantity: string; size: string; message: string; status: string; created_at: string; }
interface Contact { id: number; name: string; email: string; phone: string; message: string; created_at: string; }
interface BlogPost { id: number; title: string; slug: string; excerpt: string; content: string; meta_title: string; meta_description: string; status: string; created_at: string; }
interface Product { id: number; name: string; slug: string; description: string; image: string; created_at: string; }
interface Settings { logo_url: string; hero_image_url: string; about_image_url: string; favicon_url: string; hero_title: string; hero_subtitle: string; phone: string; email: string; whatsapp: string; address: string; }

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [tab, setTab] = useState<'quotes' | 'contacts' | 'blog' | 'products' | 'settings'>('quotes');
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

  // Blog form
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' });
  const [blogImageUrl, setBlogImageUrl] = useState('');
  const [blogUploading, setBlogUploading] = useState(false);

  // Product form
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', slug: '', description: '', image: '' });
  const [productUploading, setProductUploading] = useState(false);

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
        if (key === 'blog_image') { setBlogImageUrl(data.url); setBlogUploading(false); }
        else if (key === 'product_image') { setProductForm(f => ({ ...f, image: data.url })); setProductUploading(false); }
        else { setSettings(prev => ({ ...prev, [key]: data.url })); }
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
    if (!confirm('Delete this quote?')) return;
    await fetch(`/api/admin-quotes?id=${id}`, { method: 'DELETE', headers: { authorization: token } });
    fetchAll(token);
  };

  const saveProduct = async () => {
    if (!productForm.name || !productForm.slug) { alert('Name and slug required!'); return; }
    await fetch('/api/admin-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify(productForm),
    });
    setShowProductForm(false);
    setProductForm({ name: '', slug: '', description: '', image: '' });
    fetchAll(token);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin-products?id=${id}`, { method: 'DELETE', headers: { authorization: token } });
    fetchAll(token);
  };

  const saveBlogPost = async () => {
    if (!blogForm.title || !blogForm.slug || !blogForm.content) { alert('Title, slug, and content required!'); return; }
    const method = editPost ? 'PATCH' : 'POST';
    const body = editPost ? { ...blogForm, id: editPost.id } : blogForm;
    await fetch('/api/admin-blog', { method, headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify(body) });
    setShowBlogForm(false);
    setEditPost(null);
    setBlogForm({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' });
    setBlogImageUrl('');
    fetchAll(token);
  };

  const deletePost = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/admin-blog?id=${id}`, { method: 'DELETE', headers: { authorization: token } });
    fetchAll(token);
  };

  const startEdit = (post: BlogPost) => {
    setEditPost(post);
    setBlogForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, meta_title: post.meta_title, meta_description: post.meta_description, status: post.status });
    setShowBlogForm(true);
  };

  const statusColor = (s: string) => s === 'new' ? 'bg-blue-100 text-blue-700' : s === 'contacted' ? 'bg-yellow-100 text-yellow-700' : s === 'converted' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600';

  const imageFields = [
    { key: 'logo_url', label: 'Site Logo', desc: 'Main logo shown in navbar & footer (PNG/SVG recommended)' },
    { key: 'hero_image_url', label: 'Hero Background Image', desc: 'Homepage hero section background or product mockup' },
    { key: 'about_image_url', label: 'About Page Image', desc: 'Team photo or factory image for About page' },
    { key: 'favicon_url', label: 'Favicon', desc: 'Browser tab icon (32x32 or 64x64 PNG)' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black">F</div>
          <span className="font-black text-lg">FineCustomBoxes Admin</span>
        </div>
        <button onClick={logout} className="bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition">Logout</button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-6 flex gap-6 overflow-x-auto">
        {(['quotes', 'contacts', 'products', 'blog', 'settings'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`py-4 px-2 font-black capitalize border-b-2 transition whitespace-nowrap ${tab === t ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t === 'settings' ? '⚙️ Settings' : t} {t === 'quotes' ? `(${quotes.length})` : t === 'contacts' ? `(${contacts.length})` : t === 'blog' ? `(${posts.length})` : t === 'products' ? `(${products.length})` : ''}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Settings Tab */}
        {tab === 'settings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Site Settings</h2>
              <button onClick={saveSettings} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-black hover:bg-gray-800 transition">
                {settingsSaved ? '✅ Saved!' : 'Save All Settings'}
              </button>
            </div>

            {/* Image Uploads */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-black text-gray-900 text-lg mb-6 pb-3 border-b border-gray-100">🖼️ Site Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {imageFields.map((field) => (
                  <div key={field.key}>
                    <label className="block font-black text-gray-800 mb-1">{field.label}</label>
                    <p className="text-gray-500 text-sm mb-3">{field.desc}</p>
                    <input type="file" accept="image/*"
                      onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], field.key)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-2" />
                    {uploadingKey === field.key && <p className="text-yellow-600 text-sm">⏳ Uploading...</p>}
                    {settings[field.key as keyof Settings] && (
                      <div className="mt-2 flex items-center gap-3">
                        <img src={settings[field.key as keyof Settings]} alt={field.label}
                          className="w-16 h-16 object-contain rounded-lg border border-gray-200 bg-gray-50" />
                        <div>
                          <p className="text-green-600 text-xs font-black">✅ Uploaded</p>
                          <p className="text-gray-400 text-xs mt-1 break-all max-w-xs">{settings[field.key as keyof Settings].substring(0, 50)}...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Text Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-black text-gray-900 text-lg mb-6 pb-3 border-b border-gray-100">📝 Homepage Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-black text-gray-800 mb-1">Hero Title</label>
                  <input type="text" value={settings.hero_title}
                    onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                </div>
                <div>
                  <label className="block font-black text-gray-800 mb-1">Hero Subtitle</label>
                  <textarea rows={2} value={settings.hero_subtitle}
                    onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                </div>
              </div>
            </div>

            {/* Contact Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-black text-gray-900 text-lg mb-6 pb-3 border-b border-gray-100">📞 Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-gray-800 mb-1">Phone Number</label>
                  <input type="text" value={settings.phone} placeholder="+1 (555) 000-0000"
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                </div>
                <div>
                  <label className="block font-black text-gray-800 mb-1">Email Address</label>
                  <input type="email" value={settings.email} placeholder="info@finecustomboxes.com"
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                </div>
                <div>
                  <label className="block font-black text-gray-800 mb-1">WhatsApp Number</label>
                  <p className="text-gray-400 text-xs mb-1">Sirf numbers (e.g. 15550000000)</p>
                  <input type="text" value={settings.whatsapp} placeholder="15550000000"
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                </div>
                <div>
                  <label className="block font-black text-gray-800 mb-1">Address</label>
                  <input type="text" value={settings.address} placeholder="United States"
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quotes Tab */}
        {tab === 'quotes' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Quote Requests</h2>
            {quotes.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No quote requests yet</div>
            ) : (
              <div className="space-y-4">
                {quotes.map((q) => (
                  <div key={q.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-black text-gray-900">{q.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-black ${statusColor(q.status)}`}>{q.status}</span>
                        </div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <div>📧 {q.email} {q.phone && `| 📞 ${q.phone}`} {q.company && `| 🏢 ${q.company}`}</div>
                          <div>📦 {q.box_type} {q.quantity && `| Qty: ${q.quantity}`} {q.size && `| Size: ${q.size}`}</div>
                          {q.message && <div>💬 {q.message}</div>}
                          <div>🕐 {new Date(q.created_at).toLocaleDateString('en-US')}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <select value={q.status} onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400">
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                        <button onClick={() => deleteQuote(q.id)} className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {tab === 'contacts' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Contact Messages</h2>
            {contacts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No messages yet</div>
            ) : (
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-black text-gray-900 mb-1">{c.name}</h3>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>📧 {c.email} {c.phone && `| 📞 ${c.phone}`}</div>
                      <div>💬 {c.message}</div>
                      <div>🕐 {new Date(c.created_at).toLocaleDateString('en-US')}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Products</h2>
              <button onClick={() => setShowProductForm(true)}
                className="bg-gray-900 text-white px-5 py-2 rounded-lg font-black hover:bg-gray-800 transition">
                + Add Product
              </button>
            </div>
            {showProductForm && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="font-black text-gray-900 text-lg mb-4">New Product</h3>
                <div className="space-y-4">
                  <input placeholder="Product Name *" value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  <input placeholder="Slug *" value={productForm.slug}
                    onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  <textarea placeholder="Description" rows={3} value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  <div>
                    <label className="block font-black text-gray-800 mb-2">Product Image</label>
                    <input type="file" accept="image/*"
                      onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'product_image')}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3" />
                    {uploadingKey === 'product_image' && <p className="text-yellow-600 text-sm mt-2">⏳ Uploading...</p>}
                    {productForm.image && (
                      <div className="mt-3">
                        <img src={productForm.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                        <p className="text-green-600 text-sm mt-1">✅ Image uploaded!</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={saveProduct} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-black hover:bg-gray-800 transition">Save Product</button>
                    <button onClick={() => { setShowProductForm(false); setProductForm({ name: '', slug: '', description: '', image: '' }); }}
                      className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-black hover:bg-gray-200 transition">Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {products.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No products added yet</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {p.image ? <img src={p.image} alt={p.name} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-300">No Image</div>}
                    <div className="p-4">
                      <h3 className="font-black text-gray-900">{p.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{p.description}</p>
                      <button onClick={() => deleteProduct(p.id)} className="mt-3 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition w-full">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blog Tab */}
        {tab === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Blog Posts</h2>
              <button onClick={() => { setShowBlogForm(true); setEditPost(null); setBlogForm({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' }); }}
                className="bg-gray-900 text-white px-5 py-2 rounded-lg font-black hover:bg-gray-800 transition">+ New Post</button>
            </div>
            {showBlogForm && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="font-black text-gray-900 text-lg mb-4">{editPost ? 'Edit Post' : 'New Blog Post'}</h3>
                <div className="space-y-4">
                  <input placeholder="Post Title *" value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, slug: editPost ? blogForm.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  <input placeholder="Slug *" value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  <textarea placeholder="Excerpt" rows={2} value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  <div>
                    <label className="block font-black text-gray-800 mb-2">Featured Image</label>
                    <input type="file" accept="image/*"
                      onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'blog_image')}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3" />
                    {blogUploading && <p className="text-yellow-600 text-sm mt-2">⏳ Uploading...</p>}
                    {blogImageUrl && <div className="mt-3"><img src={blogImageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" /><p className="text-green-600 text-sm mt-1">✅ Uploaded!</p></div>}
                  </div>
                  <textarea placeholder="Content (HTML allowed) *" rows={8} value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 font-mono text-sm" />
                  <input placeholder="SEO Meta Title" value={blogForm.meta_title}
                    onChange={(e) => setBlogForm({ ...blogForm, meta_title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  <textarea placeholder="SEO Meta Description" rows={2} value={blogForm.meta_description}
                    onChange={(e) => setBlogForm({ ...blogForm, meta_description: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400" />
                  <select value={blogForm.status} onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  <div className="flex gap-3">
                    <button onClick={saveBlogPost} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-black hover:bg-gray-800 transition">{editPost ? 'Update Post' : 'Save Post'}</button>
                    <button onClick={() => { setShowBlogForm(false); setEditPost(null); }} className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-black hover:bg-gray-200 transition">Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {posts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No blog posts yet</div>
            ) : (
              <div className="space-y-4">
                {posts.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-gray-900">{p.title}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-black ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                        <span className="ml-2">🕐 {new Date(p.created_at).toLocaleDateString('en-US')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(p)} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition">Edit</button>
                      <button onClick={() => deletePost(p.id)} className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
