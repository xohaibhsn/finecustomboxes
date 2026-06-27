import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;
  if (token !== 'fcb-admin-token-2026') return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC') as any;
      return res.status(200).json(rows);
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'POST') {
    const { title, slug, excerpt, content, meta_title, meta_description, status } = req.body;
    try {
      await pool.query(
        'INSERT INTO blog_posts (title, slug, excerpt, content, meta_title, meta_description, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, slug, excerpt || '', content, meta_title || '', meta_description || '', status || 'draft']
      );
      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, title, slug, excerpt, content, meta_title, meta_description, status } = req.body;
    try {
      await pool.query(
        'UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, meta_title=?, meta_description=?, status=? WHERE id=?',
        [title, slug, excerpt || '', content, meta_title || '', meta_description || '', status, id]
      );
      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await pool.query('DELETE FROM blog_posts WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).end();
}
