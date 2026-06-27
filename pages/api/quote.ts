import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, phone, company, boxType, quantity, size, message } = req.body;
  if (!name || !email || !boxType) return res.status(400).json({ error: 'Missing fields' });
  try {
    await pool.query(
      'INSERT INTO quotes (name, email, phone, company, box_type, quantity, size, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone || '', company || '', boxType, quantity || '', size || '', message || '']
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
}
