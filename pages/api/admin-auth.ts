import type { NextApiRequest, NextApiResponse } from 'next';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'FineBoxAdmin@2026';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({ success: true, token: 'fcb-admin-token-2026' });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
}
