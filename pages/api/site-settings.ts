import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT setting_key, setting_value FROM site_settings') as any;
      const settings: Record<string, string> = {};
      rows.forEach((row: any) => { settings[row.setting_key] = row.setting_value; });
      return res.status(200).json(settings);
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'POST') {
    const token = req.headers.authorization;
    if (token !== 'fcb-admin-token-2026') return res.status(401).json({ error: 'Unauthorized' });
    try {
      const updates = req.body;
      for (const [key, value] of Object.entries(updates)) {
        await pool.query(
          'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
          [key, value, value]
        );
      }
      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).end();
}
