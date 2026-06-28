import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Quote { id: number; name: string; email: string; phone: string; company: string; box_type: string; quantity: string; size: string; message: string; status: string; created_at: string; }
interface Contact { id: number; name: string; email: string; phone: string; message: string; created_at: string; }
interface BlogPost { id: number; title: string; slug: string; excerpt: string; content: string; meta_title: string; meta_description: string; status: string; created_at: string; }
interface Product { id: number; name: string; slug: string; description: string; image: string; created_at: string; }

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [tab, setTab] = useState<'quotes' | 'contacts' | 'blog' | 'products'>('quotes');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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

  const logout = () => { localStorage.removeItem('fcb-admin-token'); router.push('/admin-login'); };

  const uploadImage = async (file: File, type: 'blog' | 'product') => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      if (type === 'blog') setBlogUploading(true);
      else setProductUploading(true);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', authorization: token },
          body: JSON.stringify({ data: reader.result }),
        });
        const data = await res.json();
        if (type === 'blog') { setBlogImageUrl(data.url); setBlogUploading(false); }
        else { setProductForm(f => ({ ...f, image: data.url })); setProductUploading(false); }
      } catch {
        if (type === 'blog') setBlogUploading(false);
        else setProductUploading(false);
      }
    };
  };

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

  const statusColor = (s: string) => s === 'new' ? 'bg-blue-100 text-blue-700' : s === 'contacted' ? 'bg-yellow-100 text-yellow-700' : s === 'converted' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold">F</div>
          <span className="font-bold text-lg">FineCustomBoxes Admin</span>
        </div>
        <button onClick={logout} className="bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition">Logout</button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-6 flex gap-6 overflow-x-auto">
        {(['quotes', 'contacts', 'products', 'blog'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`py-4 px-2 font-semibold capitalize border-b-2 transition whitespace-nowrap ${tab === t ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t} {t === 'quotes' ? `(${quotes.length})` : t === 'contacts' ? `(${contacts.length})` : t === 'blog' ? `(${posts.length})` : `(${products.length})`}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Quotes Tab */}
        {tab === 'quotes' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quote Requests</h2>
            {quotes.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No quote requests yet</div>
            ) : (
              <div className="space-y-4">
                {quotes.map((q) => (
                  <div key={q.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-800">{q.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(q.status)}`}>{q.status}</span>
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
                          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500">
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Messages</h2>
            {contacts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No messages yet</div>
            ) : (
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-1">{c.name}</h3>
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
              <h2 className="text-2xl font-bold text-gray-800">Products</h2>
              <button onClick={() => setShowProductForm(true)}
                className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
                + Add Product
              </button>
            </div>

            {showProductForm && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="font-bold text-gray-800 text-lg mb-4">New Product</h3>
                <div className="space-y-4">
                  <input placeholder="Product Name *" value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
                  <input placeholder="Slug *" value={productForm.slug}
                    onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
                  <textarea placeholder="Description" rows={3} value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    <input type="file" accept="image/*"
                      onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'product')}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3" />
                    {productUploading && <p className="text-emerald-600 text-sm mt-2">⏳ Uploading...</p>}
                    {productForm.image && (
                      <div className="mt-3">
                        <img src={productForm.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                        <p className="text-green-600 text-sm mt-1">✅ Image uploaded!</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={saveProduct} className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
                      Save Product
                    </button>
                    <button onClick={() => { setShowProductForm(false); setProductForm({ name: '', slug: '', description: '', image: '' }); }}
                      className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                      Cancel
                    </button>
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
                    {p.image && <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800">{p.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{p.description}</p>
                      <button onClick={() => deleteProduct(p.id)} className="mt-3 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition w-full">
                        Delete
                      </button>
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
              <h2 className="text-2xl font-bold text-gray-800">Blog Posts</h2>
              <button onClick={() => { setShowBlogForm(true); setEditPost(null); setBlogForm({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' }); }}
                className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
                + New Post
              </button>
            </div>

            {showBlogForm && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="font-bold text-gray-800 text-lg mb-4">{editPost ? 'Edit Post' : 'New Blog Post'}</h3>
                <div className="space-y-4">
                  <input placeholder="Post Title *" value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value, slug: editPost ? blogForm.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
                  <input placeholder="Slug *" value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
                  <textarea placeholder="Excerpt" rows={2} value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                    <input type="file" accept="image/*"
                      onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'blog')}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3" />
                    {blogUploading && <p className="text-emerald-600 text-sm mt-2">⏳ Uploading...</p>}
                    {blogImageUrl && (
                      <div className="mt-3">
                        <img src={blogImageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                        <p className="text-green-600 text-sm mt-1">✅ Image uploaded! URL: {blogImageUrl}</p>
                      </div>
                    )}
                  </div>
                  <textarea placeholder="Content (HTML allowed) *" rows={8} value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 font-mono text-sm" />
                  <input placeholder="SEO Meta Title" value={blogForm.meta_title}
                    onChange={(e) => setBlogForm({ ...blogForm, meta_title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
                  <textarea placeholder="SEO Meta Description" rows={2} value={blogForm.meta_description}
                    onChange={(e) => setBlogForm({ ...blogForm, meta_description: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
                  <select value={blogForm.status} onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  <div className="flex gap-3">
                    <button onClick={saveBlogPost} className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
                      {editPost ? 'Update Post' : 'Save Post'}
                    </button>
                    <button onClick={() => { setShowBlogForm(false); setEditPost(null); }} className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                      Cancel
                    </button>
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
                      <h3 className="font-bold text-gray-800">{p.title}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
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
