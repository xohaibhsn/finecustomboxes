import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;
  if (token !== 'fcb-admin-token-2026') return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC') as any;
      return res.status(200).json(rows);
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    try {
      await pool.query('UPDATE quotes SET status = ? WHERE id = ?', [status, id]);
      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await pool.query('DELETE FROM quotes WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).end();
}
