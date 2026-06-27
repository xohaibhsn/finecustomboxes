import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Quote { id: number; name: string; email: string; phone: string; company: string; box_type: string; quantity: string; size: string; message: string; status: string; created_at: string; }
interface Contact { id: number; name: string; email: string; phone: string; message: string; created_at: string; }
interface BlogPost { id: number; title: string; slug: string; excerpt: string; content: string; meta_title: string; meta_description: string; status: string; created_at: string; }

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [tab, setTab] = useState<'quotes' | 'contacts' | 'blog'>('quotes');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' });

  useEffect(() => {
    const t = localStorage.getItem('fcb-admin-token');
    if (!t) { router.push('/admin-login'); return; }
    setToken(t);
    fetchAll(t);
  }, []);

  const fetchAll = async (t: string) => {
    const [q, c, b] = await Promise.all([
      fetch('/api/admin-quotes', { headers: { authorization: t } }).then(r => r.json()),
      fetch('/api/admin-contacts', { headers: { authorization: t } }).then(r => r.json()),
      fetch('/api/admin-blog', { headers: { authorization: t } }).then(r => r.json()),
    ]);
    setQuotes(Array.isArray(q) ? q : []);
    setContacts(Array.isArray(c) ? c : []);
    setPosts(Array.isArray(b) ? b : []);
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

  const saveBlogPost = async () => {
    if (!blogForm.title || !blogForm.slug || !blogForm.content) { alert('Title, slug, and content are required!'); return; }
    const method = editPost ? 'PATCH' : 'POST';
    const body = editPost ? { ...blogForm, id: editPost.id } : blogForm;
    await fetch('/api/admin-blog', { method, headers: { 'Content-Type': 'application/json', authorization: token }, body: JSON.stringify(body) });
    setShowBlogForm(false);
    setEditPost(null);
    setBlogForm({ title: '', slug: '', excerpt: '', content: '', meta_title: '', meta_description: '', status: 'draft' });
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
      <div className="bg-white border-b px-6 flex gap-6">
        {(['quotes', 'contacts', 'blog'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`py-4 px-2 font-semibold capitalize border-b-2 transition ${tab === t ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t} {t === 'quotes' ? `(${quotes.length})` : t === 'contacts' ? `(${contacts.length})` : `(${posts.length})`}
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
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">{c.name}</h3>
                        <div className="text-sm text-gray-500 space-y-1">
                          <div>📧 {c.email} {c.phone && `| 📞 ${c.phone}`}</div>
                          <div>💬 {c.message}</div>
                          <div>🕐 {new Date(c.created_at).toLocaleDateString('en-US')}</div>
                        </div>
                      </div>
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
                  <textarea placeholder="Excerpt (short description)" rows={2} value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500" />
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
                      {editPost ? 'Update Post' : 'Publish Post'}
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
